import React from "react";
import '../styles/History.css';

export default function History({ history, jumpTo, ascending }) {
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

    const sortedMoves = ascending ? moves : [...moves].reverse();

    return <ol className="moves-list">{sortedMoves}</ol>;
}
