/**
 * Kiểm tra xem có người chơi nào thắng không
 * @param {Array} squares - Mảng trạng thái bàn cờ
 * @param {Number} size - Kích thước bàn cờ (3 cho 3x3)
 * @param {Number} winLength - Số ký hiệu liên tiếp cần để thắng (3 cho 3 hàng)
 * @returns {Object} {winner: "X"|"O"|null, line: Array|null} - Người thắng và vị trí thắng
 */
export function calculateWinner(squares, size, winLength) {
    // Các hướng để kiểm tra: ngang, dọc, chéo xuống phải, chéo xuống trái
    const directions = [
        [0, 1], // ngang (horizontal)
        [1, 0], // dọc (vertical)
        [1, 1], // chéo xuống phải (diagonal down-right)
        [1, -1], // chéo xuống trái (diagonal down-left)
    ];

    // Duyệt qua từng ô trên bàn cờ
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            // Lấy giá trị ô hiện tại
            const player = squares[r * size + c];
            // Bỏ qua nếu ô trống
            if (!player) continue;

            // Kiểm tra từng hướng
            for (const [dr, dc] of directions) {
                // Mảng lưu các chỉ số ô có cùng ký hiệu liên tiếp
                const line = [];
                // Kiểm tra winLength ô liên tiếp theo hướng (dr, dc)
                for (let k = 0; k < winLength; k++) {
                    const rr = r + dr * k;
                    const cc = c + dc * k;

                    // Kiểm tra nếu vị trí nằm ngoài bàn cờ
                    if (rr < 0 || rr >= size || cc < 0 || cc >= size) break;
                    // Kiểm tra nếu ô có cùng ký hiệu
                    if (squares[rr * size + cc] === player) {
                        line.push(rr * size + cc);
                    } else break;
                }

                // Nếu tìm thấy dòng thắng, trả về người chiến thắng
                if (line.length === winLength) {
                    return { winner: player, line };
                }
            }
        }
    }

    // Không có người thắng
    return { winner: null, line: null };
}
