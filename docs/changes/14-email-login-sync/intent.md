# Intent — #14 [epic] Đăng nhập bằng email và mật khẩu, đồng bộ công việc giữa các máy

> **Nguồn sự thật:** [issue #14](https://github.com/phoenixit99/wata-ai-demo/issues/14). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `type:epic`, `app:web`  
> **Trạng thái artifact:** Epic — đang ở Bước 0 (`refine`), chờ PO/BA/Tech Lead chốt các câu hỏi mở trong Feature analysis.

## Description

Là người dùng WATA Tasks, tôi muốn đăng ký và đăng nhập bằng email và mật khẩu, để thấy cùng một danh sách công việc trên mọi máy/trình duyệt mình dùng.

Hiện tại app chạy hoàn toàn trên trình duyệt, công việc chỉ lưu ở `localStorage` (khoá `wata-tasks:v1`), nên mỗi máy có một danh sách riêng và chưa có backend. Muốn đồng bộ thì cần thêm nơi lưu tài khoản và công việc phía server. Đó là quyết định kiến trúc, nên issue này là **epic**: chạy `/refine` để chọn hướng backend, chốt API contract và tách story con trước khi code.

## Affected apps

web, và một backend mới (chưa có; chọn ở bước `refine`)

## Assumptions

- [Giả định] Không làm "Quên mật khẩu" trong epic này (cần dịch vụ gửi email); tách thành story sau nếu cần.
- [Giả định] "Đăng xuất" và "Giữ đăng nhập sau khi đóng trình duyệt" không có trong phạm vi lần này. Nghĩa là tải lại trang vẫn giữ đăng nhập trong cùng phiên trình duyệt, còn đóng trình duyệt mở lại thì phải đăng nhập lại. PO xác nhận.
- [Giả định] Không yêu cầu xác minh email khi đăng ký.
- [Giả định] Mật khẩu chỉ yêu cầu tối thiểu 8 ký tự, không bắt buộc chữ hoa, số hay ký tự đặc biệt.
- [Giả định] Hai máy cùng sửa một công việc thì bản lưu sau thắng; không cần báo xung đột.
- [Giả định] Chưa đăng nhập vẫn dùng app như hiện tại (chỉ lưu trên máy), hay bắt buộc đăng nhập mới dùng được? Tạm giả định: **vẫn dùng được khi chưa đăng nhập**. PO xác nhận.
