// Import hook useState để quản lý trạng thái trong React component
import { useState } from "react";
// Import file CSS để định dạng giao diện
import "./App.css";


// ==========================
// COMPONENT: Square (Ô vuông đơn)
// ==========================
// Đại diện cho mỗi ô trong bàn cờ, hiển thị "X", "O" hoặc trống.
function Square({ value, onClick, highlight }) {
  return (
    <button
      // Nếu ô nằm trong đường thắng, thêm class "highlight" để tô sáng
      className={`square ${highlight ? "highlight" : ""}`}
      onClick={onClick} // Khi click thì gọi hàm từ cha
    >
      {value} {/* Hiển thị giá trị trong ô */}
    </button>
  );
}


// ==========================
// COMPONENT: Board (Bàn cờ)
// ==========================
// Tạo bàn cờ NxN, render các ô vuông (Square)
function Board({ squares, onClick, winnerLine, size = 9 }) {
  // Hàm render từng ô vuông
  const renderSquare = (i) => {
    // Nếu i nằm trong danh sách đường thắng thì đánh dấu highlight
    const highlight = winnerLine && winnerLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}     // Giá trị ô hiện tại ("X", "O" hoặc null)
        onClick={() => onClick(i)} // Gọi hàm xử lý khi click ô
        highlight={highlight}  // Có highlight hay không
      />
    );
  };

  // Tạo ma trận bàn cờ
  const board = [];
  for (let row = 0; row < size; row++) {
    const cols = [];
    for (let col = 0; col < size; col++) {
      // Gọi renderSquare cho từng ô
      cols.push(renderSquare(row * size + col));
    }
    // Thêm hàng vào bàn cờ
    board.push(
      <div key={row} className="board-row">
        {cols}
      </div>
    );
  }

  // Trả về toàn bộ bàn cờ
  return <div>{board}</div>;
}


// ==========================
// COMPONENT: Game (Trò chơi chính)
// ==========================
// Quản lý toàn bộ trạng thái trò chơi, lịch sử, lượt đi, v.v.
export default function Game() {
  const size = 9;       // Kích thước bàn cờ 9x9
  const winLength = 3;  // Số ô liên tiếp cần để thắng (3)

  // Lịch sử các bước đi — mỗi phần tử chứa mảng squares và vị trí đánh
  const [history, setHistory] = useState([
    { squares: Array(size * size).fill(null), position: null },
  ]);

  const [stepNumber, setStepNumber] = useState(0); // Bước hiện tại
  const [xIsNext, setXIsNext] = useState(true);    // Lượt đi: X hay O
  const [ascending, setAscending] = useState(true); // Thứ tự sắp xếp lịch sử

  // Lấy trạng thái hiện tại từ lịch sử
  const current = history[stepNumber];

  // Kiểm tra có người thắng hay chưa
  const { winner, line } = calculateWinner(current.squares, size, winLength);

  // Kiểm tra hòa — tất cả ô đều đầy mà chưa có người thắng
  const isDraw = !winner && current.squares.every((s) => s !== null);


  // ==================
  // Xử lý khi người chơi click vào một ô
  // ==================
  const handleClick = (i) => {
    // Cắt bỏ các bước sau bước hiện tại (khi người chơi quay lại quá khứ)
    const sliced = history.slice(0, stepNumber + 1);
    const current = sliced[sliced.length - 1];
    const squares = current.squares.slice(); // Sao chép mảng ô

    // Nếu đã có người thắng hoặc ô đó đã được đánh thì bỏ qua
    if (winner || squares[i]) return;

    // Gán X hoặc O vào ô được chọn
    squares[i] = xIsNext ? "X" : "O";

    // Cập nhật lịch sử: thêm trạng thái mới + vị trí vừa đánh
    setHistory(
      sliced.concat([{ squares, position: [Math.floor(i / size), i % size] }])
    );

    // Cập nhật bước hiện tại
    setStepNumber(sliced.length);

    // Đổi lượt người chơi
    setXIsNext(!xIsNext);
  };


  // ==================
  // Quay lại bước trước (Time Travel)
  // ==================
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0); // Nếu bước chẵn → X đi tiếp
  };


  // ==================
  // Danh sách các nước đi (hiển thị bên phải)
  // ==================
  const moves = history.map((step, move) => {
    const desc = move
      ? `Go to move #${move} (${step.position ? step.position.join(", ") : ""})`
      : "Go to game start";

    return (
      <li key={move}>
        <button className="description" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  // Cho phép sắp xếp tăng hoặc giảm dần danh sách nước đi
  const sortedMoves = ascending ? moves : [...moves].reverse();


  // ==================
  // Trạng thái hiển thị trên màn hình
  // ==================
  let status;
  if (winner) {
    status = `Winner: ${winner}`;  // Có người thắng
  } else if (isDraw) {
    status = "Draw! No more moves left.";  // Hòa
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`; // Lượt kế tiếp
  }


  // ==================
  // Render toàn bộ giao diện trò chơi
  // ==================
  return (
    <div className="game">
      {/* Khu vực bàn cờ */}
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={handleClick}
          winnerLine={line}
          size={size}
        />
      </div>

      {/* Khu vực thông tin */}
      <div className="game-info">
        <div>{status}</div>

        {/* Hiển thị bước hiện tại */}
        <div className="current-move">
          You are at move #{stepNumber}
        </div>

        {/* Nút đảo thứ tự danh sách bước đi */}
        <button onClick={() => setAscending(!ascending)}>
          Sort {ascending ? "Descending" : "Ascending"}
        </button>

        {/* Danh sách các bước đi */}
        <ol>{sortedMoves}</ol>
      </div>
    </div>
  );
}



// ==========================
// 4️⃣ HÀM TÍNH NGƯỜI THẮNG
// ==========================
// Kiểm tra xem có ai đạt đủ số ô liên tiếp để thắng không
function calculateWinner(squares, size, winLength) {
  // 4 hướng có thể thắng: ngang, dọc, chéo xuống, chéo lên
  const directions = [
    [0, 1],   // ngang
    [1, 0],   // dọc
    [1, 1],   // chéo xuống (↘)
    [1, -1],  // chéo lên (↗)
  ];

  // Duyệt qua toàn bộ ô trên bàn cờ
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const player = squares[row * size + col];
      if (!player) continue; // Nếu ô trống thì bỏ qua

      // Kiểm tra theo 4 hướng
      for (const [dr, dc] of directions) {
        const line = [];
        for (let k = 0; k < winLength; k++) {
          const r = row + dr * k;
          const c = col + dc * k;

          // Nếu ra ngoài biên thì dừng
          if (r < 0 || r >= size || c < 0 || c >= size) break;

          // Nếu ô đó cùng ký hiệu người chơi → thêm vào chuỗi thắng
          if (squares[r * size + c] === player) {
            line.push(r * size + c);
          } else break;
        }

        // Nếu có đủ số ô liên tiếp (winLength) → trả về người thắng
        if (line.length === winLength) {
          return { winner: player, line };
        }
      }
    }
  }

  // Không ai thắng
  return { winner: null, line: null };
}
