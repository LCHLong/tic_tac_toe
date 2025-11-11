import React, { useState } from "react";
import Board from "./components/Board";
import History from "./components/History";
import { calculateWinner } from "./helpers/helpers";
import "./styles/App.css";

/**
 * Thành phần App chính
 * Quản lý trạng thái chung của trò chơi Cờ Caro 3x3
 */
export default function App() {
  // Kích thước bàn cờ (3x3)
  const size = 3;
  // Số lượng ký hiệu liên tiếp để thắng (3 hàng)
  const winLength = 3;

  // Lịch sử nước đi: mỗi bước chứa mảng squares (trạng thái bàn cờ) và vị trí nước đi
  const [history, setHistory] = useState([{ squares: Array(size * size).fill(null), position: null }]);
  // Bước hiện tại trong lịch sử
  const [stepNumber, setStepNumber] = useState(0);
  // Xác định lượt của X hay O (X đi trước)
  const [xIsNext, setXIsNext] = useState(true);
  // Sắp xếp lịch sử theo thứ tự tăng hoặc giảm
  const [ascending, setAscending] = useState(true);

  // Trạng thái bàn cờ hiện tại
  const current = history[stepNumber];
  // Kiểm tra xem có người thắng không và vị trí ký tự thắng
  const { winner, line } = calculateWinner(current.squares, size, winLength);
  // Kiểm tra trò chơi có kết thúc hoà không (không có người thắng và đầy ô)
  const isDraw = !winner && current.squares.every((s) => s !== null);

  // Xử lý khi người chơi nhấp vào một ô
  const handleClick = (i) => {
    // Cắt lịch sử nước đi đến bước hiện tại (nếu người chơi quay lại lịch sử)
    const sliced = history.slice(0, stepNumber + 1);
    // Lấy trạng thái bàn cờ hiện tại
    const currentState = sliced[sliced.length - 1];
    // Sao chép mảng squares để tránh thay đổi trực tiếp
    const squares = currentState.squares.slice();

    // Nếu đã có người thắng hoặc ô đã được đánh dấu, không làm gì cả
    if (winner || squares[i]) return;

    // Đánh dấu ô với ký hiệu của người chơi hiện tại
    squares[i] = xIsNext ? "X" : "O";

    // Cập nhật lịch sử với nước đi mới
    setHistory(sliced.concat([{ squares, position: [Math.floor(i / size), i % size] }]));
    // Cập nhật bước hiện tại
    setStepNumber(sliced.length);
    // Chuyển lượt cho người chơi kế tiếp
    setXIsNext(!xIsNext);
  };

  // Nhảy đến một bước cụ thể trong lịch sử
  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  // Khởi động lại trò chơi
  const restart = () => {
    setHistory([{ squares: Array(size * size).fill(null), position: null }]);
    setStepNumber(0);
    setXIsNext(true);
    setAscending(true);
  };

  // Xác định thông báo trạng thái của trò chơi
  // Xác định thông báo trạng thái của trò chơi
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
        {/* Khu vực hiển thị bàn cờ */}
        <div className="game-board">
          {/* Hiển thị banner kết quả khi có người thắng hoặc hoà */}
          {(winner || isDraw) && (
            <div className={`result-banner ${winner ? "win" : "draw"}`} role="status">
              <div className="result-text">{winner ? `🎉 ${winner} wins!` : "🤝 It's a draw!"}</div>
              <div className="result-actions">
                <button onClick={restart}>Restart</button>
              </div>
            </div>
          )}

          {/* Bàn cờ 3x3 */}
          <Board squares={current.squares} onClick={handleClick} winnerLine={line} size={size} />
        </div>

        {/* Khu vực thông tin trò chơi */}
        <div className="game-info">
          {/* Hiển thị trạng thái hiện tại của trò chơi */}
          <div className="status-box">{status}</div>
          {/* Hiển thị số bước hiện tại */}
          <div className="current-move">You are at move #{stepNumber}</div>

          {/* Nút điều khiển */}
          <div className="controls">
            {/* Nút sắp xếp lịch sử */}
            <button onClick={() => setAscending(!ascending)}>
              Sort {ascending ? "Descending" : "Ascending"}
            </button>
            {/* Nút khởi động lại trò chơi */}
            <button onClick={restart} style={{ marginLeft: 8 }}>
              Restart
            </button>
          </div>

          {/* Lịch sử các nước đi */}
          <History history={history} jumpTo={jumpTo} ascending={ascending} />
        </div>
      </div>
    </div>
  );
}
