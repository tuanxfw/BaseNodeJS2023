## Environment
-Yêu cầu về môi trường:
+NodeJS version 16x

## Run
-Cần mang các tài nguyên sau lên môi trường linux:
+Thư mục node_modules (folder sẽ thay đổi khi thay đổi thư viện)
+File server.js (file sẽ thay đổi khi sửa code)
+File package.json (folder sẽ thay đổi khi thay đổi thư viện)
+File startup.sh
+File shutdown.sh (file sẽ thay đổi khi đổi port)

-Giải nén thư mục node_modules.zip cùng cấp với file server.js (nếu có zip thư mục node_modules)

-Khởi động: ./startup.sh

-Dừng: ./shutdown.sh

## Build
-Chạy lệnh build tương ứng với môi trường
-Trong trường hợp muốn đóng gói tất cả các file liên quan tới môi trường chạy thì sau khi build chạy lệnh "pack"

-Sau khi chạy xong build/pack thì cần đưa toàn bộ các file + folder có bên trong thư mục dist lên server