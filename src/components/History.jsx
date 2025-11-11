import React from "react";
import '../styles/History.css';

/**
 * Thành phần History - hiển thị danh sách các nước đi và cho phép nhảy lại
 * @param {Array} history - Mảng lịch sử các bước đi
 * @param {Function} jumpTo - Hàm callback để nhảy đến một bước cụ thể
 * @param {Boolean} ascending - Sắp xếp theo thứ tự tăng hay giảm
 */
export default function History({ history, jumpTo, ascending }) {
    // Tạo danh sách các nút cho mỗi bước trong lịch sử
    const moves = history.map((step, move) => {
        // Tạo mô tả cho mỗi bước (ví dụ: "Go to move #1 (1, 2)")
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

    // Sắp xếp danh sách dựa trên tham số ascending
    const sortedMoves = ascending ? moves : [...moves].reverse();

    return <ol className="moves-list">{sortedMoves}</ol>;
}
