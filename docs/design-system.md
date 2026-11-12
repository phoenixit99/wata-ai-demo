# Design system — WATA Tasks

> Đầu vào bắt buộc để AI soạn brief UI và code giao diện (`design-brief`, `implement`, `pr-review --design`).
> Token trùng tên với biến CSS trong `apps/web/src/styles.css`.

Phiên bản: 1.0 · Figma library: không dùng (repo demo; brief UI mô tả bằng chữ và ASCII) · Người duyệt: @phoenixit99 (Designer)

## 1. Màu

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-primary` | `#9e1b20` | Tiêu đề, nút chính, trạng thái được chọn |
| `--color-accent` | `#e31e2d` | Hover nút phụ, cảnh báo nhẹ (quá hạn) |
| `--color-text` | `#1f1f1f` | Chữ chính |
| `--color-muted` | `#6b6b6b` | Chữ phụ, việc đã xong (kèm gạch ngang) |
| `--color-surface` | `#ffffff` | Nền thẻ |
| `--color-bg` | `#fbf0f0` | Nền trang |
| `--color-border` | `#e5d5d5` | Viền ô nhập, đường kẻ giữa các dòng |

Độ tương phản tối thiểu 4.5:1 cho chữ thường. Không dùng màu làm tín hiệu duy nhất (kèm chữ hoặc icon).

## 2. Chữ

| Token | Font | Cỡ / dòng | Đậm | Dùng cho |
|---|---|---|---|---|
| `text.h1` | system-ui | 24px / 32px | 700 | Tên app |
| `text.body` | system-ui | 16px / 24px | 400 | Tiêu đề công việc, ô nhập |
| `text.small` | system-ui | 14px / 20px | 400 | Số đếm, nút, nhãn phụ |

## 3. Khoảng cách và lưới

Bước khoảng cách: 4 / 8 / 12 / 16 / 24 (`--space-1` … `--space-6`). Một cột, rộng tối đa 560px, căn giữa.
Breakpoint: dưới 600px thẻ chiếm toàn bộ chiều rộng, lề 16px.

## 4. Component

| Component | Biến thể | Trạng thái bắt buộc | Code |
|---|---|---|---|
| Button | primary (nền `--color-primary`), ghost (nền trong) | default, hover, focus-visible, disabled | `button`, `button.ghost` trong `styles.css` |
| Input | text | default, focus, error (viền `--color-accent` + thông báo bên dưới) | `.task-form input` |
| Segmented control (bộ lọc) | — | default, selected (`aria-pressed="true"`, nền `--color-primary`) | chưa có |
| Task row | thường, đã xong (chữ `--color-muted`, gạch ngang) | hover hiện nút Xoá | `.task` |
| Empty state | — | một câu nói người dùng nên làm gì | `.empty` |

## 5. Quy tắc layout

- Thứ tự từ trên xuống: tiêu đề + số đếm → ô thêm việc → bộ lọc (nếu có) → danh sách.
- Hành động phá huỷ (Xoá) là nút ghost ở cuối dòng, không phải nút chính.

## 6. Nguyên tắc UX

- Mọi danh sách có trạng thái rỗng nói rõ việc cần làm tiếp; khi lọc ra rỗng, nói rõ là do bộ lọc.
- Thông báo lỗi nói điều người dùng cần làm ("Nhập tên công việc"), hiển thị ngay dưới ô nhập.
- Mọi thao tác dùng được bằng bàn phím; phần tử tương tác có nhãn cho trình đọc màn hình.

## 7. Tài sản và bản quyền

Không dùng ảnh hay icon ngoài. Font hệ thống.
