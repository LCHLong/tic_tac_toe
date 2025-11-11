import React from "react";
import "../styles/Square.css";

/**
 * Thành phần Square - biểu diễn một ô vuông trên bàn cờ
 * @param {String} value - Giá trị hiển thị ("X", "O", hoặc null)
 * @param {Function} onClick - Hàm callback khi người chơi nhấp vào ô
 * @param {Boolean} highlight - Có highlight ô này không (nếu là phần dòng thắng)
 */
export default function Square({ value, onClick, highlight }) {
    return (
        <button
            className={`square ${highlight ? "highlight" : ""}`}
            onClick={onClick}
            aria-label={`square-${value ?? "empty"}`}
        >
            {value}
        </button>
    );
}
