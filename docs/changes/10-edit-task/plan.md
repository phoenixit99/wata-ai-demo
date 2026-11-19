# Plan — #10 [feature] Sửa tên công việc

> **Nguồn sự thật:** [issue #10](https://github.com/phoenixit99/wata-ai-demo/issues/10). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:in-review`, `type:feature`, `risk:standard`, `priority:p2`, `app:web`  
> **Trạng thái artifact:** **Đã duyệt ở G2** (`## Plan approval` — ĐỒNG Ý, có người ký). Build write-up bên dưới ghi phần code thực tế so với plan.

PR: [#12](https://github.com/phoenixit99/wata-ai-demo/pull/12)

### Từ comment 2026-11-16 · [issuecomment-6909763013](https://github.com/phoenixit99/wata-ai-demo/issues/10#issuecomment-6909763013)

#### Test design: PASS

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật.

##### Test case
| ID | AC | Mô tả | Ưu tiên | Loại | Nơi đặt |
|---|---|---|---|---|---|
| TC-10-01 | AC2 | `renameTask` đổi đúng việc, bỏ khoảng trắng hai đầu, việc khác giữ nguyên tham chiếu | P1 | unit | `apps/web/src/lib/tasks.test.ts` |
| TC-10-02 | AC1, AC2 | Bấm Sửa, gõ tên mới + Enter → hiển thị tên mới, giữ sau khi tải lại | P1 | unit | `apps/web/src/App.test.tsx` |
| TC-10-03 | AC3 | Đang sửa, nhấn Esc → giữ tên cũ, ô sửa biến mất | P2 | unit | `apps/web/src/App.test.tsx` |
| TC-10-04 | AC4 | Lưu tên chỉ có khoảng trắng → giữ tên cũ (unit cho hàm + UI) | P1 | unit | `lib/tasks.test.ts`, `App.test.tsx` |

##### Plan
| AC | File sẽ sửa | Test case |
|---|---|---|
| AC1, AC3 | `components/TaskItem.tsx` (mới), `components/TaskList.tsx`, `styles.css` | TC-10-02, 03 |
| AC2, AC4 | `lib/tasks.ts` (hàm thuần `renameTask`), `lib/useTasks.ts` (`editTask`), `App.tsx` | TC-10-01, 02, 04 |

- **Không làm:** sửa bằng double-click, hoàn tác.
- **Xung đột có thể có:** PR 7 (#3) cũng sửa `TaskList.tsx`, `useTasks.ts`, `App.tsx`; PR nào merge sau phải rebase.

### Từ comment 2026-11-16 · [issuecomment-6909763541](https://github.com/phoenixit99/wata-ai-demo/issues/10#issuecomment-6909763541)

#### Plan approval

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật. Đây là chữ ký cổng G2 của con người.

Người duyệt: @phoenixit99 (đóng vai Tech Lead và QA) · Phần: cả hai · Kết luận: ĐỒNG Ý

### Từ comment 2026-11-16 · [issuecomment-6909764039](https://github.com/phoenixit99/wata-ai-demo/issues/10#issuecomment-6909764039)

#### Build write-up

PR: #12 · Branch: `feat/10-edit-task` · Commit: 9bf13ff

##### Đã làm
- AC1, AC3 → `components/TaskItem.tsx` (mới): mỗi dòng có nút "Sửa"; chế độ sửa là `<form>` với ô nhập `Sửa tên: <tên>`, nút "Lưu" (submit, nên Enter cũng lưu), "Huỷ"; Esc huỷ. `TaskList.tsx` chỉ còn render `TaskItem`.
- AC2, AC4 → `lib/tasks.ts`: hàm thuần `renameTask(tasks, id, title)`, bỏ khoảng trắng hai đầu; tên rỗng thì trả lại **đúng mảng cũ** (không render lại). `useTasks.ts`: `editTask`. Lưu qua tải lại nhờ `useEffect` sẵn có.
- `styles.css`: `.task-edit` dùng chung kiểu ô nhập với `.task-form`, chỉ dùng token.

##### Test
TC-10-01, TC-10-04 (`lib/tasks.test.ts`); TC-10-02, 03, 04 (`App.test.tsx`).

##### Quyết định thiết kế và lý do
- Tách `TaskItem` để giữ state "đang sửa" theo từng dòng; không đưa vào `useTasks` vì đó là state giao diện, không phải dữ liệu.
- Không đổi kiểu `Task` → không cần bước đọc dữ liệu cũ.

##### Không làm (ngoài phạm vi)
Double-click để sửa, hoàn tác.

---
Đã chạy (local, branch `feat/10-edit-task`): `npm run lint -w apps/web`, `typecheck`, `test` (9 passed), `build` · Chỉ đọc: `docs/coding-standards/react.md` · Còn là claim: CI trên PR (xem check của PR)
