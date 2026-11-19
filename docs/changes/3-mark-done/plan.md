# Plan — #3 [feature] Đánh dấu công việc đã hoàn thành

> **Nguồn sự thật:** [issue #3](https://github.com/phoenixit99/wata-ai-demo/issues/3). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:qa-passed`, `type:feature`, `risk:standard`, `priority:p1`, `app:web`  
> **Trạng thái artifact:** **Đã duyệt ở G2** (`## Plan approval` — ĐỒNG Ý, có người ký). Build write-up bên dưới ghi phần code thực tế so với plan.

PR: [#7](https://github.com/phoenixit99/wata-ai-demo/pull/7)

### Từ comment 2026-11-12 · [issuecomment-6816955307](https://github.com/phoenixit99/wata-ai-demo/issues/3#issuecomment-6816955307)

#### Test design: PASS

- 4 AC đều kiểm thử được và hôm nay đều **sai đúng như issue mô tả** (chưa có trường hoàn thành, chưa có checkbox).
- 8 test case: 5 unit, 2 Playwright, 1 manual (P3, không chặn QA).
- AC4 có test ghim (TC-3-06) vì `loadTasks` hôm nay đã đọc được dữ liệu cũ; đã phá thử trên bản sao để chắc test đỏ được.

---
##### Đã có code chưa?
Chưa. Không có branch `*3*`, không có commit nhắc `#3`, không có PR. SHA origin/main: 647b1d1.

##### Finding 1: dòng đếm hiện tính bằng `tasks.length` trong `App.tsx`
`apps/web/src/App.tsx`: `{tasks.length} công việc`. AC2 cần thêm số đã xong; nếu sau này có bộ lọc (#4) thì vẫn phải đếm trên toàn bộ `tasks`, không theo danh sách đã lọc. Ghi để #4 không làm sai.

##### Finding 2: bẫy cho người code — đừng đổi `STORAGE_KEY`
Thêm field mới mà đổi khoá `wata-tasks:v1` sẽ làm mất toàn bộ dữ liệu cũ (AC4). Chỉ thêm `done?: boolean`, đọc thiếu thì coi là `false`.

##### Test case
| ID | AC | Mô tả | Ưu tiên | Loại | Đỏ hôm nay? | Nơi đặt |
|---|---|---|---|---|---|---|
| TC-3-01 | AC1 | Khi tích "Hoàn thành: <tên>", checkbox ở trạng thái checked và dòng việc có kiểu đã xong (gạch ngang) | P1 | unit | Có | `apps/web/src/App.test.tsx` |
| TC-3-02 | AC1 | Khi bỏ tích, dòng việc trở lại kiểu thường | P2 | unit | Có | `apps/web/src/App.test.tsx` |
| TC-3-03 | AC2 | Có 2 việc, tích 1 → dòng đếm là "2 công việc · 1 đã xong"; chưa tích việc nào → "2 công việc · 0 đã xong" | P1 | unit | Có | `apps/web/src/App.test.tsx` |
| TC-3-04 | AC2 | Xoá một việc đã xong → cả hai số giảm (không còn đếm việc đã xoá) | P2 | unit | Có | `apps/web/src/App.test.tsx` |
| TC-3-05 | AC3 | Tích hoàn thành, tải lại trang → vẫn tích | P1 | auto | Có | `e2e/tests/3-complete.spec.ts` |
| TC-3-06 | AC4 | `loadTasks` đọc dữ liệu cũ không có trường hoàn thành → đủ số việc, mọi việc là chưa xong | P1 | unit | Không (ghim) | `apps/web/src/lib/tasks.test.ts` |
| TC-3-07 | AC4 | Trình duyệt có sẵn dữ liệu cũ (không có `done`) → trang hiển thị đủ việc, tất cả chưa tích | P1 | auto | Có | `e2e/tests/3-complete.spec.ts` |
| TC-3-08 | AC1 | Dùng bàn phím (Tab, Space) tích được; trình đọc màn hình đọc nhãn "Hoàn thành: <tên>" | P3 | manual | Chưa rõ | QA |

Bảng lưu ở `e2e/test-cases/3.md` (commit trong PR của bước 4).

##### Plan
- **Yêu cầu:** (1) checkbox hoàn thành trên mỗi dòng, việc xong có kiểu muted + gạch ngang; (2) dòng đếm "n công việc · k đã xong"; (3) lưu qua tải lại; (4) dữ liệu cũ đọc được.

| AC | File sẽ sửa | Test case |
|---|---|---|
| AC1 | `lib/tasks.ts` (`done?: boolean`, hàm `toggleDone`), `lib/useTasks.ts` (`toggleTask`), `components/TaskList.tsx` (checkbox), `styles.css` (`.task.done`) | TC-3-01, 02, 08 |
| AC2 | `App.tsx` (dòng đếm) | TC-3-03, 04 |
| AC3 | `lib/useTasks.ts` (đã lưu mỗi lần đổi state) | TC-3-05 |
| AC4 | `lib/tasks.ts` (`loadTasks` không đổi khoá) | TC-3-06, 07 |

- **Phạm vi ảnh hưởng:** thêm/xoá việc và dòng đếm hiện có (test cũ "1 công việc" phải sửa theo định dạng mới); dữ liệu đã lưu của người dùng.
- **Không làm:** lọc theo trạng thái (#4), sắp xếp việc đã xong xuống cuối (chưa có AC), hoàn tác.
- **Rủi ro:** giữ `risk:standard`.

##### Duyệt G2
- [ ] Tech Lead/Dev duyệt plan
- [ ] QA duyệt test case
Khi cả hai đồng ý, **một người** gắn `status:ready-to-dev` (có thể kèm comment `## Plan approval`).

---
Đã chạy: phá thử TC-3-06 trên bản sao (cho `loadTasks` trả `[]` khi thiếu `done` → test đỏ, hoàn lại); `git branch -a --list '*3*'`, `git log --all --grep='#3'` (rỗng)
Chỉ đọc: `apps/web/src/App.tsx`, `lib/tasks.ts`, `lib/useTasks.ts`, `components/TaskList.tsx`, `App.test.tsx`, `docs/coding-standards/react.md` (SHA origin/main: 647b1d1)
Còn là claim: TC-3-08 (trình đọc màn hình) chỉ kiểm được bằng tay

### Từ comment 2026-11-12 · [issuecomment-6816956329](https://github.com/phoenixit99/wata-ai-demo/issues/3#issuecomment-6816956329)

#### Plan approval

Người duyệt: @phoenixit99 (đóng vai Tech Lead và QA) · Phần: cả hai · Kết luận: ĐỒNG Ý

| Điểm | Phán quyết |
|---|---|
| Phạm vi: 6 file trong `apps/web`, không lọc/sắp xếp | Đồng ý |
| Finding 1: dòng đếm luôn tính trên toàn bộ việc | Đồng ý, ghi lại cho #4 |
| Finding 2: không đổi `STORAGE_KEY` | Đồng ý, bắt buộc |
| TC-3-06 là test ghim, đã phá thử | Đồng ý |
| TC-3-08 manual P3 không chặn QA | Đồng ý |
| Rủi ro `risk:standard` | Giữ |
| Story có UI: duyệt thiết kế | Brief trong mục Design dùng đúng token có sẵn (design system mục 4, "Task row: đã xong"); Designer xác nhận không cần frame riêng |

_Repo demo: một tài khoản đóng mọi vai; trong dự án thật, Tech Lead và QA là hai người ký riêng._

### Từ comment 2026-11-12 · [issuecomment-6817018922](https://github.com/phoenixit99/wata-ai-demo/issues/3#issuecomment-6817018922)

#### Build write-up

##### Đã làm
- AC1 → `apps/web/src/components/TaskList.tsx`: checkbox đầu dòng, nhãn `Hoàn thành: <tên>`, dòng có class `done` khi xong; `lib/tasks.ts`: hàm thuần `toggleDone`; `lib/useTasks.ts`: `toggleTask`; `styles.css`: `.task.done` dùng `--color-muted` + gạch ngang. Test: TC-3-01, TC-3-02 (`App.test.tsx`), `toggleDone` (`lib/tasks.test.ts`).
- AC2 → `apps/web/src/App.tsx`: dòng đếm `{tasks.length} công việc · {doneCount} đã xong`, `doneCount` tính trên toàn bộ `tasks`. Test: TC-3-03, TC-3-04.
- AC3 → không cần code mới: `useTasks` đã lưu sau mỗi lần đổi state. Test: TC-3-05 (Playwright, bước QA).
- AC4 → `lib/tasks.ts`: `done?: boolean` tuỳ chọn, giữ `STORAGE_KEY = 'wata-tasks:v1'`. Test: TC-3-06 (ghim), TC-3-07 (Playwright, bước QA).
- Sửa test cũ "thêm công việc" theo định dạng dòng đếm mới.

##### Quyết định thiết kế và lý do
- `doneCount` không lưu vào state mà tính khi render (coding standard: không lưu state suy ra được).
- Dùng `<input type="checkbox">` gốc với `aria-label`, không tự vẽ, để bàn phím và trình đọc màn hình chạy sẵn.

##### Không làm (ngoài phạm vi)
- Lọc theo trạng thái (#4), sắp xếp việc đã xong xuống cuối, hoàn tác.

##### Kiểm chứng
| Lệnh | Kết quả |
|---|---|
| `npm run lint -w apps/web` | pass |
| `npm run typecheck -w apps/web` | pass |
| `npm run test -w apps/web` | 10/10 pass (trước khi code: 6 fail như dự kiến) |
| `npm run build -w apps/web` | pass |
| Phá thử: `toggleDone` luôn đặt `done: true` | TC-3-02 và test `toggleDone` đỏ; đã hoàn lại |
| CI `ci / web`, `ci / e2e` trên commit d5bb826 | pass |

##### Còn nợ trước release
- QA: viết Playwright TC-3-05, TC-3-07; test tay TC-3-08.

##### Câu hỏi mở
- Không có.

---
Đã chạy: lint, typecheck, unit test (đỏ trước, xanh sau), build, phá thử; CI trên d5bb826
Chỉ đọc: `docs/coding-standards/react.md`, `docs/design-system.md` mục 4
Còn là claim: TC-3-08 (trình đọc màn hình) chưa ai chạy
