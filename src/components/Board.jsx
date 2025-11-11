import React from "react";
import Square from "./Square";
import "../styles/Board.css";

/**
 * Thành phần Board - hiển thị bàn cờ 3x3
 * @param {Array} squares - Mảng 9 phần tử đại diện cho các ô trên bàn cờ
 * @param {Function} onClick - Hàm callback khi người chơi nhấp vào ô
 * @param {Array} winnerLine - Mảng chứa các chỉ số ô thắng (để highlight)
 * @param {Number} size - Kích thước bàn cờ (mặc định 3)
 */
export default function Board({ squares, onClick, winnerLine, size = 3 }) {
    // Hàm để render từng ô vuông
    const renderSquare = (i) => {
        // Kiểm tra xem ô này có là một phần của dòng thắng không
        const highlight = winnerLine && winnerLine.includes(i);
        return <Square key={i} value={squares[i]} onClick={() => onClick(i)} highlight={highlight} />;
    };

    // Xây dựng mảng các hàng
    const rows = [];
    for (let r = 0; r < size; r++) {
        // Xây dựng mảng các cột trong mỗi hàng
        const cols = [];
        for (let c = 0; c < size; c++) {
            cols.push(renderSquare(r * size + c));
        }
        // Thêm hàng vào mảng rows
        rows.push(
            <div key={r} className="board-row">
                {cols}
            </div>
        );
    }

    return <div className="board">{rows}</div>;
}
