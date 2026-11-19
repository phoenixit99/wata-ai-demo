# Spec — #3 [feature] Đánh dấu công việc đã hoàn thành

> **Nguồn sự thật:** [issue #3](https://github.com/phoenixit99/wata-ai-demo/issues/3). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:qa-passed`, `type:feature`, `risk:standard`, `priority:p1`, `app:web`  
> **Trạng thái artifact:** Đạt Definition of Ready (`## Triage: PASS`). Thiết kế UI đã duyệt.

## Acceptance Criteria

- [ ] AC1: Mỗi dòng công việc có ô đánh dấu (checkbox) với nhãn "Hoàn thành: <tên việc>". Khi tích, công việc hiển thị chữ màu `--color-muted` và gạch ngang; khi bỏ tích, trở lại như cũ.
- [ ] AC2: Dòng đếm ở đầu trang hiển thị "<n> công việc · <k> đã xong", trong đó k là số việc đã tích.
- [ ] AC3: Trạng thái hoàn thành vẫn giữ nguyên sau khi tải lại trang.
- [ ] AC4: Dữ liệu đã lưu từ phiên bản cũ (chưa có trường hoàn thành) vẫn hiển thị đủ, mọi việc cũ hiển thị là chưa xong; không mất công việc nào.

## Design

Brief UI: checkbox đặt đầu dòng, trước tên việc; việc đã xong dùng token `--color-muted` + gạch ngang (design system mục 4, "Task row: đã xong"). Không cần frame Figma riêng (repo demo).

## Technical notes

Kiểu `Task` trong `apps/web/src/lib/tasks.ts` là định dạng lưu trữ: chỉ thêm field tuỳ chọn.

## Phân tích và duyệt

### Từ comment 2026-11-12 · [issuecomment-6816900835](https://github.com/phoenixit99/wata-ai-demo/issues/3#issuecomment-6816900835)

#### Triage: PASS

- 4 AC đều có hành động và kết quả quan sát được (nhãn checkbox, màu, gạch ngang, dòng đếm, tải lại).
- AC4 nói rõ tương thích dữ liệu cũ, đúng bẫy đã ghi trong `CLAUDE.md` (kiểu `Task` là định dạng lưu trữ).
- Brief UI có trong mục Design và khớp design system mục 4 ("Task row: đã xong").

---
| # | Kết quả | Ghi chú |
|---|---|---|
| R1 | Đạt | @phoenixit99 |
| R2 | Đạt | Nói rõ thay đổi: đánh dấu hoàn thành |
| R3 | Đạt | User story + lý do (hiện chỉ có cách xoá) |
| R4 | Đạt | 4 AC |
| R5 | Đạt | Mỗi AC có kết quả quan sát được |
| R6 | Đạt | `web` |
| R7 | Đạt | Không còn TBD hay phần mẫu |
| R8 | Đạt | Không phụ thuộc issue đang mở |
| R9 | Không áp dụng | |
| R10 | Đạt | Brief UI trong mục Design; repo demo không dùng Figma (design system ghi rõ) |
| R11 | Đạt | "hoàn thành" khớp #4 và #5 (nhắc trạng thái hoàn thành, không trùng). Đối chứng dương: "Đánh dấu" → #3 |

---
##### Việc trùng hoặc liên quan
- #4 Lọc theo trạng thái (backlog): **phụ thuộc #3**, làm sau.
- #5 Hạn chót (backlog): AC3 của #5 đọc trạng thái hoàn thành; cùng sửa `apps/web/src/lib/tasks.ts` và `TaskList.tsx`. Thứ tự: #3 → #5.

##### Rủi ro đề xuất
risk:standard: thêm field vào định dạng lưu trữ (`apps/web/src/lib/tasks.ts`), có AC4 về dữ liệu cũ; không đụng `high_risk_paths`.

---
Đã chạy: `gh issue list --state all --search "hoàn thành in:title,body"`, `"done"`, đối chứng dương `"Đánh dấu"`
Chỉ đọc: `apps/web/src/lib/tasks.ts`, `useTasks.ts`, `components/TaskList.tsx`, `App.tsx`, `docs/design-system.md`, `CLAUDE.md` (SHA origin/main: 647b1d1)
Còn là claim: không có

### Từ comment 2026-11-12 · [issuecomment-6816955863](https://github.com/phoenixit99/wata-ai-demo/issues/3#issuecomment-6816955863)

#### Design approval: APPROVED

Frame: không dùng Figma (repo demo) — brief trong mục Design của issue · Phương án: checkbox đầu dòng, việc xong dùng `--color-muted` + gạch ngang
Người duyệt: Designer @phoenixit99; PO: @phoenixit99 (đóng vai, xác nhận trong buổi refinement)
