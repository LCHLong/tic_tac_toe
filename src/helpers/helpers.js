export function calculateWinner(squares, size, winLength) {
    const directions = [
        [0, 1], // horizontal
        [1, 0], // vertical
        [1, 1], // diag down-right
        [1, -1], // diag down-left
    ];

    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            const player = squares[r * size + c];
            if (!player) continue;

            for (const [dr, dc] of directions) {
                const line = [];
                for (let k = 0; k < winLength; k++) {
                    const rr = r + dr * k;
                    const cc = c + dc * k;

                    if (rr < 0 || rr >= size || cc < 0 || cc >= size) break;
                    if (squares[rr * size + cc] === player) {
                        line.push(rr * size + cc);
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
