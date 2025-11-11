import React from "react";
import "../styles/Square.css";

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
