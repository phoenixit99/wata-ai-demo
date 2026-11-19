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
Làm mới: `npm run chain:sync` (mọi issue) hoặc `npm run chain:sync -- <số issue>`.

| Thay đổi | Tiêu đề | intent | spec | plan |
|---|---|---|---|---|
| [1-projects](1-projects/) | #1 [epic] Quản lý công việc theo dự án | Epic — đang ở Bước 0 (`refine`), chờ PO/BA/Tech Lead chốt các câu hỏi mở trong Feature analysis. | Chưa chấp nhận — có Feature analysis, chờ quyết định của con người; chưa tách story con. | Không áp dụng ở mức epic — plan nằm ở từng story con sau khi tách. |
| [2-prettier-app](2-prettier-app/) | #2 [feature] Làm app đẹp hơn và dễ dùng hơn | Đã qua G1 (PO gắn `status:backlog`). | Chưa chấp nhận — `## Triage: FAIL`. | Chưa có plan — spec chưa đạt (Triage FAIL). |
| [3-mark-done](3-mark-done/) | #3 [feature] Đánh dấu công việc đã hoàn thành | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Đã duyệt ở G2 (`## Plan approval` — ĐỒNG Ý, có người ký). |
| [4-filter-status](4-filter-status/) | #4 [feature] Lọc danh sách theo trạng thái: Tất cả / Đang làm / Đã xong | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Chưa có plan — issue đang ở `status:test-design`, skill `test-design` chưa đăng kết quả. |
| [5-due-date](5-due-date/) | #5 [feature] Hạn chót cho công việc và nhãn Quá hạn | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Chưa có plan — issue đang ở `status:test-design`, skill `test-design` chưa đăng kết quả. |
| [6-google-login-sync](6-google-login-sync/) | #6 [feature] Đăng nhập Google và đồng bộ công việc giữa các máy | Đã qua G1 (PO gắn `status:backlog`). | Chưa chấp nhận — `## Triage: BLOCKED`. | Chưa có plan — issue `status:blocked` (xem spec.md). |
| [8-add-delete-save](8-add-delete-save/) | #8 [feature] Thêm, xoá và lưu công việc | Đã qua G1 (PO gắn `status:backlog`). | Chưa có bước Triage trên issue. | Chưa có plan. |
| [9-sort-list](9-sort-list/) | #9 [feature] Sắp xếp danh sách công việc | Đã qua G1 (PO gắn `status:backlog`). | Chưa chấp nhận — AC chưa kiểm thử được, chờ quyết định sản phẩm (xem plan.md / Needs human). | Chưa có plan — test-design dừng ở `## Needs human`, chờ PO quyết định. |
| [10-edit-task](10-edit-task/) | #10 [feature] Sửa tên công việc | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Đã duyệt ở G2 (`## Plan approval` — ĐỒNG Ý, có người ký). |
| [11-blank-title](11-blank-title/) | #11 [bug] Thêm được công việc chỉ có khoảng trắng | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Đã duyệt ở G2 (`## Plan approval` — ĐỒNG Ý, có người ký). |
| [14-email-login-sync](14-email-login-sync/) | #14 [epic] Đăng nhập bằng email và mật khẩu, đồng bộ công việc giữa các máy | Epic — đang ở Bước 0 (`refine`), chờ PO/BA/Tech Lead chốt các câu hỏi mở trong Feature analysis. | Chưa chấp nhận — có Feature analysis, chờ quyết định của con người; chưa tách story con. | Không áp dụng ở mức epic — plan nằm ở từng story con sau khi tách. |
| [17-script-dong-bo-chuoi-artifact](17-script-dong-bo-chuoi-artifact/) | #17 [chore] Script đồng bộ chuỗi artifact intent → spec → plan từ issue | Đã qua G1 (PO gắn `status:backlog`). | Đạt Definition of Ready (`## Triage: PASS`). | Đã duyệt ở G2 (`## Plan approval` — ĐỒNG Ý, có người ký). |
