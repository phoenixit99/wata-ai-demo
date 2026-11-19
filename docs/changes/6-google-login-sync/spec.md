# Spec — #6 [feature] Đăng nhập Google và đồng bộ công việc giữa các máy

> **Nguồn sự thật:** [issue #6](https://github.com/phoenixit99/wata-ai-demo/issues/6). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:blocked`, `type:feature`, `risk:high`, `priority:p3`, `app:web`  
> **Trạng thái artifact:** **Chưa chấp nhận** — `## Triage: BLOCKED`. Xem lý do bên dưới.

## Acceptance Criteria

- [ ] AC1: Có nút "Đăng nhập bằng Google"; đăng nhập xong hiển thị email của tài khoản ở góc phải.
- [ ] AC2: Công việc tạo trên máy A xuất hiện trên máy B (cùng tài khoản) trong vòng 10 giây.
- [ ] AC3: Đăng xuất thì danh sách trên máy trở về dữ liệu cục bộ, không lộ công việc của tài khoản.

## Design

Chờ kết quả phân tích ở epic #1 (mô hình dữ liệu dự án và việc có cần backend).

## Technical notes

Cần backend + lưu trữ (chưa có). Phụ thuộc quyết định kiến trúc ở #1. Đụng xác thực → rủi ro cao, Tech Lead đề xuất người code trực tiếp.

## Phân tích và duyệt

### Từ comment 2026-11-12 · [issuecomment-6816914569](https://github.com/phoenixit99/wata-ai-demo/issues/6#issuecomment-6816914569)

#### Triage: BLOCKED

- R8: AC2 (đồng bộ giữa máy) cần backend và lưu trữ; app hiện chỉ chạy trên trình duyệt (`localStorage`), không có API.
- Epic #1 đang mở và chính câu hỏi "có cần đồng bộ giữa các máy không" nằm trong đó.
- Các điều kiện khác đạt; AC2 "trong vòng 10 giây" đo được.

---
| # | Kết quả | Ghi chú |
|---|---|---|
| R1 | Đạt | @phoenixit99 |
| R2 | Đạt | |
| R3 | Đạt | |
| R4 | Đạt | 3 AC |
| R5 | Đạt | |
| R6 | Đạt một phần | `web`, nhưng cần thêm app `api` chưa có trong `project.yml` |
| R7 | Đạt | |
| R8 | **Không đạt** | Chặn bởi #1 (mở): chưa chốt kiến trúc đồng bộ |
| R9 | Không áp dụng | |
| R10 | Không đạt (khuyến nghị) | Chưa có request/response cho API đồng bộ |
| R11 | Đạt | "Google", "đồng bộ": chỉ #6 và #1 (liên quan) |

---
##### Việc trùng hoặc liên quan
- #1 Epic quản lý theo dự án: câu hỏi mở về đồng bộ; quyết định ở đó.

##### Rủi ro đề xuất
risk:high: xác thực (OAuth) và đồng bộ dữ liệu người dùng; đề xuất Tech Lead gắn `human-code`.

---
Đã chạy: `gh issue list --state all --search "Google in:title,body"`, `"đồng bộ"`, đối chứng dương `"Đánh dấu"`
Chỉ đọc: body #1, #6; `CLAUDE.md` mục "Về project" (SHA origin/main: 647b1d1)
Còn là claim: "trong vòng 10 giây" khả thi — phụ thuộc kiến trúc chưa chọn
