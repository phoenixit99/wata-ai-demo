# Spec — #10 [feature] Sửa tên công việc

> **Nguồn sự thật:** [issue #10](https://github.com/phoenixit99/wata-ai-demo/issues/10). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:in-review`, `type:feature`, `risk:standard`, `priority:p2`, `app:web`  
> **Trạng thái artifact:** Đạt Definition of Ready (`## Triage: PASS`).

## Acceptance Criteria

- [ ] AC1: Mỗi dòng công việc có nút "Sửa" (nhãn truy cập `Sửa "<tên việc>"`). Bấm vào thì tên chuyển thành ô nhập (nhãn `Sửa tên: <tên việc>`) có sẵn tên hiện tại, cùng nút "Lưu" và "Huỷ".
- [ ] AC2: Nhấn Enter hoặc bấm "Lưu": tên mới được lưu (bỏ khoảng trắng hai đầu) và vẫn giữ sau khi tải lại trang.
- [ ] AC3: Nhấn Esc hoặc bấm "Huỷ": thoát chế độ sửa, giữ tên cũ.
- [ ] AC4: Lưu khi ô trống hoặc chỉ có khoảng trắng: giữ tên cũ, không tạo công việc tên rỗng.

## Design

Dùng nút `ghost` và ô nhập giống ô "Công việc mới" (design system mục 4). Không có frame Figma riêng.

## Technical notes

Không đổi kiểu `Task`, chỉ đổi giá trị `title`.

## Phân tích và duyệt

### Từ comment 2026-11-16 · [issuecomment-6909762558](https://github.com/phoenixit99/wata-ai-demo/issues/10#issuecomment-6909762558)

#### Triage: PASS

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật.

R1–R11 đạt. Không trùng issue nào đang mở (đã tìm theo "sửa", "edit", `TaskList`). Đề xuất `risk:standard`: đụng định dạng lưu trữ nhưng không đổi kiểu `Task`.
