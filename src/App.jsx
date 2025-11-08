import { useState } from "react";
import "./App.css";

function Square({ value, onClick, highlight }) {
  return (
    <button
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function Board({ squares, onClick, winnerLine, size = 9 }) {
  const renderSquare = (i) => {
    const highlight = winnerLine && winnerLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onClick(i)}
        highlight={highlight}
      />
    );
  };

  const board = [];
  for (let row = 0; row < size; row++) {
    const cols = [];
    for (let col = 0; col < size; col++) {
      cols.push(renderSquare(row * size + col));
    }
    board.push(
      <div key={row} className="board-row">
        {cols}
      </div>
    );
  }
  return <div>{board}</div>;
}

export default function Game() {
  const size = 9;
  const winLength = 5;
  const [history, setHistory] = useState([
    { squares: Array(size * size).fill(null), position: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const current = history[stepNumber];
  const { winner, line } = calculateWinner(current.squares, size, winLength);
  const isDraw = !winner && current.squares.every((s) => s !== null);

  const handleClick = (i) => {
    const sliced = history.slice(0, stepNumber + 1);
    const current = sliced[sliced.length - 1];
    const squares = current.squares.slice();

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    setHistory(
      sliced.concat([{ squares, position: [Math.floor(i / size), i % size] }])
    );
    setStepNumber(sliced.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.position ? step.position.join(", ") : ""})`
      : "Go to game start";

    return (
      <li key={move}>
        <button className="description" onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const sortedMoves = ascending ? moves : [...moves].reverse();

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw! No more moves left.";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winnerLine={line}
          size={size}
        />
      </div>

      <div className="game-info">
        <div>{status}</div>

        {/* Thêm dòng này — hiển thị vị trí hiện tại */}
        <div className="current-move">
          You are at move #{stepNumber}
        </div>

        <button onClick={() => setAscending(!ascending)}>
          Sort {ascending ? "Descending" : "Ascending"}
        </button>

        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );

}

// --- Hàm kiểm tra thắng: 5 liên tiếp ---
function calculateWinner(squares, size, winLength) {
  const directions = [
    [0, 1], // ngang
    [1, 0], // dọc
    [1, 1], // chéo xuống
    [1, -1], // chéo lên
  ];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const player = squares[row * size + col];
      if (!player) continue;

      for (const [dr, dc] of directions) {
        const line = [];
        for (let k = 0; k < winLength; k++) {
          const r = row + dr * k;
          const c = col + dc * k;
          if (r < 0 || r >= size || c < 0 || c >= size) break;
          if (squares[r * size + c] === player) {
            line.push(r * size + c);
          } else break;
        }
        if (line.length === winLength) {
          return { winner: player, line };
        }
      }
    }
  }
  return { winner: null, line: null };
}
