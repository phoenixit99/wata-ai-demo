# Spec — #8 [feature] Thêm, xoá và lưu công việc

> **Nguồn sự thật:** [issue #8](https://github.com/phoenixit99/wata-ai-demo/issues/8). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:uat`, `type:feature`, `risk:low`, `priority:p1`, `app:web`  
> **Trạng thái artifact:** **Chưa có bước Triage trên issue.** Tính năng có trên `main` từ 060aeb4, trước khi áp dụng quy trình; issue hợp thức hoá để đi UAT.

## Acceptance Criteria

- [ ] AC1: Gõ tên vào ô "Công việc mới" rồi bấm "Thêm": công việc xuất hiện ở **đầu** danh sách, dòng đếm tăng thành "<n> công việc".
- [ ] AC2: Khi chưa có công việc nào, trang hiển thị "Chưa có công việc nào. Thêm việc đầu tiên ở ô phía trên."
- [ ] AC3: Bấm "Xoá" ở một dòng: công việc đó biến mất, dòng đếm giảm.
- [ ] AC4: Tải lại trang: danh sách vẫn giữ nguyên.

## Design

Theo `docs/design-system.md` (Task row, Empty state). Không có frame Figma riêng.

## Technical notes

Đã có trên `main` từ commit 060aeb4 (bản đầu của app, trước khi áp dụng quy trình). Issue này hợp thức hoá tính năng để đi qua UAT.
