# Tic tac toe — Hướng dẫn (Tiếng Việt)

Một project React nhỏ khởi tạo bằng Vite. README này hướng dẫn cách cài đặt, chạy môi trường phát triển, build sản phẩm.

Deployed site: https://tic-tac-toe-orpin-pi.vercel.app  

## Yêu cầu trước

Kiểm tra Node/npm:

```bash
node -v
npm -v
```

## Cài đặt (chỉ làm 1 lần)

Trong thư mục gốc dự án, chạy:

```bash
npm install
# hoặc
# yarn
```

## Chạy môi trường phát triển (dev)

Chạy dev server với Vite:

```bash
npm run dev
```

Sau khi chạy, Vite sẽ in địa chỉ (mặc định thường là http://localhost:5173). Mở trình duyệt và kiểm tra giao diện. 


## Lỗi thường gặp & gỡ lỗi nhanh

- Nếu dev server không chạy: kiểm tra Node/npm, cổng (port) có bị chiếm không.
- Nếu build bị lỗi do dependency: thử chạy `npm ci` để cài sạch.
