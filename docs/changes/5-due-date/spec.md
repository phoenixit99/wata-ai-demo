# Spec — #5 [feature] Hạn chót cho công việc và nhãn Quá hạn

> **Nguồn sự thật:** [issue #5](https://github.com/phoenixit99/wata-ai-demo/issues/5). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:test-design`, `type:feature`, `risk:standard`, `priority:p2`, `app:web`  
> **Trạng thái artifact:** Đạt Definition of Ready (`## Triage: PASS`).

## Acceptance Criteria

- [ ] AC1: Ô thêm việc có thêm trường ngày "Hạn chót" (không bắt buộc). Thêm việc có hạn chót thì dòng công việc hiển thị "Hạn: dd/mm/yyyy".
- [ ] AC2: Việc chưa hoàn thành có hạn chót **trước ngày hôm nay** (theo giờ máy người dùng) hiển thị nhãn "Quá hạn" màu `--color-accent`. Việc hạn chót đúng hôm nay không tính là quá hạn.
- [ ] AC3: Việc đã hoàn thành không bao giờ hiển thị "Quá hạn".
- [ ] AC4: Việc không có hạn chót hiển thị như hiện nay; dữ liệu cũ (chưa có trường hạn chót) không bị mất.

## Design

Brief UI: trường date gốc của trình duyệt cạnh ô nhập; nhãn "Quá hạn" dạng chữ nhỏ (`text.small`) màu `--color-accent`, đặt sau tên việc.

## Technical notes

Thêm field tuỳ chọn `dueDate` (yyyy-mm-dd) vào `Task`. So sánh ngày theo giờ địa phương, không theo UTC.

## Phân tích và duyệt

### Từ comment 2026-11-12 · [issuecomment-6816910255](https://github.com/phoenixit99/wata-ai-demo/issues/5#issuecomment-6816910255)

#### Triage: PASS

- AC2 định nghĩa rõ biên: hạn chót **trước hôm nay** mới là quá hạn; đúng hôm nay thì không.
- AC3, AC4 phủ "điều không được xảy ra" (việc đã xong không quá hạn; dữ liệu cũ không mất).
- Technical notes chỉ ra bẫy múi giờ (so theo giờ địa phương, không UTC).

---
| # | Kết quả | Ghi chú |
|---|---|---|
| R1 | Đạt | @phoenixit99 |
| R2 | Đạt | |
| R3 | Đạt | |
| R4 | Đạt | 4 AC |
| R5 | Đạt | |
| R6 | Đạt | `web` |
| R7 | Đạt | |
| R8 | Đạt (có điều kiện) | AC3 cần trường hoàn thành của #3 (đang mở): code sau #3 |
| R9 | Không áp dụng | |
| R10 | Đạt | Brief UI trong mục Design |
| R11 | Đạt | "hạn chót", "quá hạn": chỉ #5. Cùng file với #3 (`tasks.ts`, `TaskList.tsx`) |

---
##### Việc trùng hoặc liên quan
- #3: cùng sửa `apps/web/src/lib/tasks.ts` và `components/TaskList.tsx`; làm sau #3 để tránh conflict.

##### Rủi ro đề xuất
risk:standard: thêm field tuỳ chọn `dueDate`; logic ngày dễ sai múi giờ nên test design cần case biên.

---
Đã chạy: `gh issue list --state all --search "hạn chót in:title,body"`, `"quá hạn"`, đối chứng dương `"Đánh dấu"`
Chỉ đọc: `apps/web/src/lib/tasks.ts`, `components/TaskForm.tsx`, `components/TaskList.tsx` (SHA origin/main: 647b1d1)
Còn là claim: không có
