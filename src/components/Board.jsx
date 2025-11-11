import React from "react";
import Square from "./Square";
import "../styles/Board.css";

export default function Board({ squares, onClick, winnerLine, size = 3 }) {
    const renderSquare = (i) => {
        const highlight = winnerLine && winnerLine.includes(i);
        return <Square key={i} value={squares[i]} onClick={() => onClick(i)} highlight={highlight} />;
    };

    const rows = [];
    for (let r = 0; r < size; r++) {
        const cols = [];
        for (let c = 0; c < size; c++) {
            cols.push(renderSquare(r * size + c));
        }
        rows.push(
            <div key={r} className="board-row">
                {cols}
            </div>
        );
    }

    return <div className="board">{rows}</div>;
}
