# Spec — #2 [feature] Làm app đẹp hơn và dễ dùng hơn

> **Nguồn sự thật:** [issue #2](https://github.com/phoenixit99/wata-ai-demo/issues/2). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:fail-to-dev`, `type:feature`  
> **Trạng thái artifact:** **Chưa chấp nhận** — `## Triage: FAIL`. Xem lý do bên dưới.

## Acceptance Criteria

- [ ] AC1: Giao diện đẹp hơn
- [ ] AC2: Thao tác nhanh hơn
- [ ] AC3: TBD

## Design

_No response_

## Technical notes

_No response_

## Phân tích và duyệt

### Từ comment 2026-11-12 · [issuecomment-6816898285](https://github.com/phoenixit99/wata-ai-demo/issues/2#issuecomment-6816898285)

#### Triage: FAIL

- Tiêu đề và AC dùng từ mơ hồ ("đẹp hơn", "nhanh hơn", "dễ dùng hơn"): không có kết quả quan sát được để test (R2, R5).
- AC3 còn `TBD` (R7); chưa có người được assign (R1).
- Story đổi UI nhưng mục Design trống (R10).
- "Làm đẹp" thường là nhiều việc nhỏ khác nhau; nên tách thành từng issue có hành vi cụ thể.

---
| # | Kết quả | Ghi chú |
|---|---|---|
| R1 | Không đạt | Chưa có assignee |
| R2 | Không đạt | "Làm app đẹp hơn và dễ dùng hơn" không nói thay đổi gì |
| R3 | Đạt một phần | Có mô tả nhưng không nêu vấn đề cụ thể người dùng gặp |
| R4 | Đạt | Có 3 AC |
| R5 | Không đạt | AC1 "đẹp hơn", AC2 "nhanh hơn": không có hành động + kết quả quan sát được |
| R6 | Đạt | `web`, có trong `project.yml` |
| R7 | Không đạt | AC3: `TBD` |
| R8 | Đạt | Không nhắc issue phụ thuộc |
| R9 | Không áp dụng | Không phải bug |
| R10 | Không đạt | Đổi UI nhưng không có brief UI |
| R11 | Đạt | Tìm "đẹp", "giao diện" trên mọi issue: chỉ có #2. Đối chứng dương "Đánh dấu" trả về #3 |

---
##### Câu chữ đề xuất

Nếu vấn đề là **khó thêm việc nhanh** (ví dụ):

> **Tiêu đề:** [feature] Nhấn Enter để thêm việc và giữ con trỏ trong ô nhập
>
> **Description:** Là người dùng nhập nhiều việc liên tiếp, tôi muốn thêm việc bằng phím Enter và tiếp tục gõ ngay, để không phải bấm chuột sau mỗi việc.
>
> - [ ] AC1: Gõ tên việc rồi nhấn Enter thì việc được thêm lên đầu danh sách và ô nhập trống.
> - [ ] AC2: Sau khi thêm, con trỏ vẫn ở trong ô nhập (gõ tiếp được ngay, không cần bấm chuột).

Nếu vấn đề là **khó nhìn trên điện thoại** (ví dụ):

> **Tiêu đề:** [feature] Danh sách công việc hiển thị vừa màn hình điện thoại 360px
>
> - [ ] AC1: Ở chiều rộng 360px, không có thanh cuộn ngang; nút "Thêm" và "Xoá" bấm được (vùng chạm ≥ 44×44px).

PO chọn vấn đề thật, mỗi vấn đề một issue.

##### Việc trùng hoặc liên quan
- Không có.

##### Rủi ro đề xuất
Chưa đề xuất (chưa rõ phạm vi).

---
Đã chạy: `gh issue list --state all --search "đẹp in:title,body"`, `"giao diện"`, đối chứng dương `"Đánh dấu"` (trả về #3)
Chỉ đọc: body #2, `.claude/project.yml`, `apps/web/src/` (SHA origin/main: 647b1d1)
Còn là claim: "app nhìn còn đơn giản quá" — không có số liệu hay phản hồi người dùng đi kèm
