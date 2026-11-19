# Intent — #11 [bug] Thêm được công việc chỉ có khoảng trắng

> **Nguồn sự thật:** [issue #11](https://github.com/phoenixit99/wata-ai-demo/issues/11). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:qa-failed`, `type:bug`, `risk:standard`, `priority:p1`, `app:web`  
> **Trạng thái artifact:** Đã qua G1 (PO gắn `status:backlog`).

## Description

Có thể thêm một công việc mà tên chỉ toàn khoảng trắng. Danh sách hiện một dòng trống, đếm thêm 1, và dòng trống đó vẫn còn sau khi tải lại.

## Steps to reproduce

1. Mở app.
2. Gõ 3 dấu cách vào ô "Công việc mới".
3. Bấm "Thêm".

## Expected result

Không thêm gì, dòng đếm giữ "0 công việc".

## Actual result

Danh sách có một dòng không có tên, dòng đếm là "1 công việc".

## Environment

web, mọi trình duyệt; `main` 647b1d1.

## Affected apps

- [x] web
