# Chuỗi artifact: intent → spec → plan

Theo [The AI-native SDLC playbook](https://claude.com/resources/articles/the-ai-native-sdlc-playbook):
mỗi bước để lại một artifact mà bước sau đọc được. Mỗi thay đổi có một thư mục `<số issue>-<slug>/`.

| File | Giai đoạn (playbook) | Bước / cổng WATA |
|---|---|---|
| `intent.md` | Plan | Bước 1 `issue-create` · G1 |
| `spec.md` | Design | Bước 0 `refine` (epic), Bước 2 `triage`, `design-brief` |
| `plan.md` | Build (plan mode) | Bước 3 `test-design` · G2 |

**Nguồn sự thật cho nội dung là issue GitHub** (label `status:*` là nguồn sự thật cho trạng thái, theo contract.md); các file ở đây là bản chép có link về issue/comment
("linkage" trong playbook). Bước chưa diễn ra thì file ghi rõ lý do, không bịa nội dung.
Mẫu trống: `docs/templates/`. Sau G2, chuỗi tiếp tục trên PR (diff + test, Code review, QA report, G3/G4, UAT).

| Thay đổi | Tiêu đề | intent | spec | plan |
|---|---|---|---|---|
| [1-projects](1-projects/) | #1 [epic] Quản lý công việc theo dự án | Epic | Chưa chấp nhận | Không áp dụng ở mức epic |
| [2-prettier-app](2-prettier-app/) | #2 [feature] Làm app đẹp hơn và dễ dùng hơn | Đã qua G1 (PO gắn `status:backlog`). Triage FAIL: PO cần viết lại theo đề xuất trong spec.md trước khi đi tiếp. | Chưa chấp nhận | Chưa có plan |
| [3-mark-done](3-mark-done/) | #3 [feature] Đánh dấu công việc đã hoàn thành | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). Thiết kế UI đã duyệt. | Đã duyệt ở G2 |
| [4-filter-status](4-filter-status/) | #4 [feature] Lọc danh sách theo trạng thái: Tất cả / Đang làm / Đã xong | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Chưa có plan |
| [5-due-date](5-due-date/) | #5 [feature] Hạn chót cho công việc và nhãn Quá hạn | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Chưa có plan |
| [6-google-login-sync](6-google-login-sync/) | #6 [feature] Đăng nhập Google và đồng bộ công việc giữa các máy | Đã qua G1 (PO gắn `status:backlog`). | Chưa chấp nhận | Chưa có plan |
| [8-add-delete-save](8-add-delete-save/) | #8 [feature] Thêm, xoá và lưu công việc | Đã qua G1 (PO gắn `status:backlog`). | Chưa có bước Triage trên issue. Tính năng có trên `main` từ 060aeb4, trước khi áp dụng quy trình; issue hợp thức hoá để đi UAT. | Không có plan được duyệt |
| [9-sort-list](9-sort-list/) | #9 [feature] Sắp xếp danh sách công việc | Đã qua G1 (PO gắn `status:backlog`). | Chưa chấp nhận | Chưa có plan |
| [10-edit-task](10-edit-task/) | #10 [feature] Sửa tên công việc | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Đã duyệt ở G2 |
| [11-blank-title](11-blank-title/) | #11 [bug] Thêm được công việc chỉ có khoảng trắng | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Đã duyệt ở G2 |
| [14-email-login-sync](14-email-login-sync/) | #14 [epic] Đăng nhập bằng email và mật khẩu, đồng bộ công việc giữa các máy | Epic | Chưa chấp nhận | Không áp dụng ở mức epic |
