import React, { useState } from "react";
import Board from "./components/Board";
import History from "./components/History";
import { calculateWinner } from "./helpers/helpers";
import "./styles/App.css";

export default function App() {
  const size = 3;
  const winLength = 3;

  const [history, setHistory] = useState([{ squares: Array(size * size).fill(null), position: null }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const current = history[stepNumber];
  const { winner, line } = calculateWinner(current.squares, size, winLength);
  const isDraw = !winner && current.squares.every((s) => s !== null);

  const handleClick = (i) => {
    const sliced = history.slice(0, stepNumber + 1);
    const currentState = sliced[sliced.length - 1];
    const squares = currentState.squares.slice();

    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";

    setHistory(sliced.concat([{ squares, position: [Math.floor(i / size), i % size] }]));
    setStepNumber(sliced.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const restart = () => {
    setHistory([{ squares: Array(size * size).fill(null), position: null }]);
    setStepNumber(0);
    setXIsNext(true);
    setAscending(true);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw — no more moves.";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="app-root">
      <div className="game">
        <div className="game-board">
          {(winner || isDraw) && (
            <div className={`result-banner ${winner ? "win" : "draw"}`} role="status">
              <div className="result-text">{winner ? `🎉 ${winner} wins!` : "🤝 It's a draw!"}</div>
              <div className="result-actions">
                <button onClick={restart}>Restart</button>
              </div>
            </div>
          )}

          <Board squares={current.squares} onClick={handleClick} winnerLine={line} size={size} />
        </div>

        <div className="game-info">
          <div className="status-box">{status}</div>
          <div className="current-move">You are at move #{stepNumber}</div>

          <div className="controls">
            <button onClick={() => setAscending(!ascending)}>
              Sort {ascending ? "Descending" : "Ascending"}
            </button>
            <button onClick={restart} style={{ marginLeft: 8 }}>
              Restart
            </button>
          </div>

          <History history={history} jumpTo={jumpTo} ascending={ascending} />
        </div>
      </div>
    </div>
  );
}
