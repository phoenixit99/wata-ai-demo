# Spec — #14 [epic] Đăng nhập bằng email và mật khẩu, đồng bộ công việc giữa các máy

> **Nguồn sự thật:** [issue #14](https://github.com/phoenixit99/wata-ai-demo/issues/14). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `type:epic`, `app:web`  
> **Trạng thái artifact:** **Chưa chấp nhận** — có Feature analysis, chờ quyết định của con người; chưa tách story con.

## Acceptance Criteria

- [ ] AC1: Khi người dùng chưa có tài khoản nhập email hợp lệ và mật khẩu từ 8 ký tự trở lên rồi bấm "Đăng ký", thì tài khoản được tạo, người dùng vào thẳng danh sách công việc và thấy email của mình ở đầu trang.
- [ ] AC2: Khi đăng ký bằng email đã có tài khoản (kể cả khác chữ hoa/thường, ví dụ `An@Mail.com` và `an@mail.com`), thì thấy thông báo "Email này đã được đăng ký", và không có tài khoản thứ hai nào được tạo.
- [ ] AC3: Khi đăng ký với email sai định dạng hoặc mật khẩu dưới 8 ký tự, thì ô bị sai viền đỏ kèm dòng báo lỗi cụ thể, và không có request nào gửi lên server.
- [ ] AC4: Khi người dùng đã có tài khoản nhập đúng email và mật khẩu rồi bấm "Đăng nhập", thì vào danh sách công việc của tài khoản đó.
- [ ] AC5: Khi đăng nhập sai mật khẩu, hoặc bằng email chưa đăng ký, thì thấy cùng một thông báo "Email hoặc mật khẩu không đúng", và không vào được danh sách công việc.
- [ ] AC6: Khi người dùng thêm, sửa hoặc xoá một công việc trên máy A, rồi đăng nhập cùng tài khoản trên máy B (hoặc tải lại trang trên máy B), thì máy B thấy đúng thay đổi đó.
- [ ] AC7: Khi người dùng đã có công việc lưu trên máy từ trước và đăng ký hoặc đăng nhập lần đầu trên máy đó, thì toàn bộ công việc cũ được gắn vào tài khoản và hiện trong danh sách, và không công việc nào bị mất hay bị nhân đôi.
- [ ] AC8: Khi tài khoản A đăng nhập, thì A không thấy, sửa hay xoá được công việc của tài khoản B, kể cả khi gọi thẳng API.
- [ ] AC9: Mật khẩu không bao giờ được lưu ở dạng đọc được: không có trong `localStorage`, log hay cơ sở dữ liệu (server chỉ lưu bản băm).

## Design

Chưa có. Cần màn hình Đăng nhập / Đăng ký (`design-brief` trước khi code).

## Technical notes

- Liên quan **#6** (Đăng nhập Google và đồng bộ công việc giữa các máy, đang `status:blocked`): cùng cần backend và phần đồng bộ. `refine` nên chốt một hướng backend dùng chung cho cả hai.
- Đổi cách lưu công việc phải đọc được dữ liệu cũ ở khoá `wata-tasks:v1` (xem CLAUDE.md, mục "Bẫy đã biết") để làm được AC7.
- Đụng tới xác thực, nên dự kiến `risk:high` (`docs/agents/risk-tiers.md`); triage đề xuất, Tech Lead chốt.

## Phân tích và duyệt

### Từ comment 2026-11-16 · [issuecomment-6910685088](https://github.com/phoenixit99/wata-ai-demo/issues/14#issuecomment-6910685088)

#### Feature analysis

##### Tóm tắt
Epic này biến WATA Tasks từ app chỉ chạy trên trình duyệt thành app có backend: tài khoản (email + mật khẩu), lưu công việc phía server theo người dùng, và gộp dữ liệu cũ ở `wata-tasks:v1` khi đăng nhập lần đầu. Phần khó không phải màn hình đăng nhập, mà là ba thứ repo **chưa có**: backend + hạ tầng (DB, secret, staging cho UAT), mô hình đồng bộ (`Task` hiện không có `updatedAt` và không ghi nhận việc đã xoá), và an toàn xác thực (AC8, AC9). Hướng được chọn: **A, backend tự viết `apps/api`**. Server là nguồn sự thật, web tải lại khi mở trang (không offline-first, không realtime). Cùng backend này dùng lại cho Google (#6). Epic này cũng trả lời câu hỏi đang mở ở #1 ("có cần đồng bộ không"): có.

---

##### Kiểm chứng giải pháp
1. **Vấn đề thật?** Vấn đề thật là "cùng một danh sách trên nhiều máy". Đăng nhập là phương tiện. #6 xin cùng kết quả qua Google. Nếu người dùng chỉ cần đồng bộ, **một** cách đăng nhập là đủ; làm cả email/mật khẩu lẫn Google là hai lần công xác thực. → câu hỏi cho PO bên dưới.
2. **80/20:** server là nguồn sự thật; web đọc toàn bộ danh sách khi mở trang/đăng nhập và gửi từng thay đổi lên ngay. Đủ cho AC6 (đề bài chỉ yêu cầu "tải lại trang trên máy B" thấy thay đổi, không cần realtime như #6 AC2 "trong 10 giây"). Xoá chỉ là `DELETE` phía server, không cần tombstone. Không làm chế độ offline khi đã đăng nhập. Lựa chọn rẻ hơn nữa (xuất/nhập file, "mã đồng bộ" không tài khoản) không đạt AC1–AC5 nên không đưa vào bảng.
3. **Không làm thì sao?** App vẫn chạy tốt cho người dùng một máy. Chưa có số liệu bao nhiêu người dùng nhiều máy. Với repo demo, giá trị chính là thể hiện quy trình cho một thay đổi nhiều app, `risk:high`; nói thẳng: về sản phẩm, không làm "không sao nhiều" cho tới khi có bằng chứng người dùng cần.
4. **Phổ biến hay hiếm?** Không đếm được: không backend, không analytics, dữ liệu nằm trên máy người dùng.
5. **Giả định bị bỏ:** issue giả định "email + mật khẩu tự quản lý". Phát biểu lại kết quả: *người dùng thấy cùng danh sách trên mọi máy, và không ai khác thấy được danh sách đó*. Cách xác thực là chi tiết thực hiện; tự lưu mật khẩu là cách rủi ro nhất để đạt kết quả này.

---

##### Các hướng kiến trúc
| Hướng | Mô tả | Ưu điểm | Điểm yếu | Công sức |
|---|---|---|---|---|
| A. Backend tự viết trong monorepo | App mới `apps/api` (Node + TypeScript, Postgres). Tự làm đăng ký/đăng nhập (băm mật khẩu bằng thuật toán chậm, có salt), phiên đăng nhập, API `tasks` kiểm tra quyền sở hữu ở server | Toàn quyền và review được hết trong PR; test AC8 bằng unit/integration test trong CI; thể hiện đúng thứ tự contract → API → web của quy trình; không phụ thuộc nhà cung cấp | Tự chịu mọi lỗi bảo mật xác thực (lưu mật khẩu, chống dò mật khẩu, quản lý phiên); cần tự lo hosting, DB, migration, secret; #6 (Google OAuth) là thêm một lần công xác thực nữa; công lớn nhất | XL |
| B. Dịch vụ backend có sẵn (BaaS: auth + DB, ví dụ Supabase/Firebase) | Web gọi SDK của nhà cung cấp; tài khoản do dịch vụ quản lý; bảng `tasks` có chính sách theo hàng (row-level policy) giới hạn mỗi người chỉ đọc/ghi hàng của mình | Không tự lưu mật khẩu (AC9 do nhà cung cấp lo); Google login cho #6 thường chỉ là cấu hình; không có app `api` để vận hành | AC8 nằm trong **cấu hình policy**, khó review trong PR và khó test trong CI (cần môi trường giả lập của nhà cung cấp hoặc project test riêng); một policy sai là lộ dữ liệu của mọi người; phụ thuộc nhà cung cấp, chi phí, nơi lưu dữ liệu; thông báo lỗi (AC2, AC5) do SDK quyết định, có thể không khớp đúng câu chữ | L |

**Đề xuất:** A. Người chạy phiên này (@phoenixit99, vai PO/Tech Lead) chọn A khi xem bản nháp, vì:
- Mọi logic xác thực và quyền sở hữu nằm trong diff, review được, và AC8 có test tự động chạy trong CI.
- Repo để demo quy trình, và A đi đúng thứ tự contract → API → web.
- Không phụ thuộc nhà cung cấp.

Bản nháp đầu của AI nghiêng về B vì B không phải tự lưu mật khẩu.

**Phản biện chính hướng A:**
- Tự viết xác thực là phần dễ sai nhất của epic: băm mật khẩu, chống dò mật khẩu, quản lý phiên. Đề xuất `human-code` cho story xác thực, cùng lượt review bảo mật theo `risk:high`.
- Thêm hạ tầng phải tự vận hành: DB, migration, secret, staging.
- #6 (Google) sẽ là một lần công xác thực thứ hai (OAuth) trong `apps/api`.
- Công XL, nên tách nhỏ như bảng issue con bên dưới.

---

##### App bị đụng
- `web`: màn Đăng ký/Đăng nhập; hiển thị email ở đầu trang; tách nguồn dữ liệu (cục bộ khi chưa đăng nhập, server khi đã đăng nhập) sau `useTasks` (`apps/web/src/lib/useTasks.ts`); gộp dữ liệu `wata-tasks:v1` lần đầu; thêm `updatedAt?` vào `Task` (`apps/web/src/lib/tasks.ts`, chỉ thêm field tuỳ chọn theo `docs/coding-standards/react.md`).
- `api` (app mới, `apps/api`): đăng ký/đăng nhập, phiên, API `tasks` theo người dùng, migration DB; code xác thực dưới `apps/api/src/auth/`, đồng bộ dưới `.../sync/` để khớp `high_risk_paths`.
- Cấu hình (con người làm): thêm mục `apps[]` và label `app:api` vào `.claude/project.yml`, coding standard cho backend (hiện chỉ có `docs/agents/en/coding-standards/nestjs.md` / `nextjs.md`, chưa có bản cho project), job CI mới (AI không sửa workflow).

---

##### API contract cần chốt
Theo hướng A. Chốt ở issue con 2 trước khi code API hay web.

```ts
// Kiểu dùng chung
interface User { id: string; email: string }            // email đã chuẩn hoá: trim + chữ thường
interface Task {                                          // giữ tương thích wata-tasks:v1
  id: string;            // crypto.randomUUID() từ client; khoá chính phía server là (userId, id)
  title: string;
  createdAt: string;     // ISO 8601
  updatedAt?: string;    // MỚI, tuỳ chọn; thiếu thì coi = createdAt; dùng cho "bản lưu sau thắng"
  // field của #3 (done), #5 (hạn chót), #1 (projectId) thêm sau: server lưu và trả lại nguyên vẹn
}
type ApiError = { code: 'VALIDATION' | 'EMAIL_TAKEN' | 'INVALID_CREDENTIALS' | 'UNAUTHORIZED' | 'NOT_FOUND'; message: string };
```

| Endpoint | Request | Response | AC |
|---|---|---|---|
| `POST /auth/register` | `{ email, password }` (mật khẩu ≥ 8) | `201 { user }` + phiên; `409 EMAIL_TAKEN`; `400 VALIDATION` | AC1, AC2, AC9 |
| `POST /auth/login` | `{ email, password }` | `200 { user }` + phiên; **`401 INVALID_CREDENTIALS` giống hệt** cho sai mật khẩu và email chưa có | AC4, AC5 |
| `GET /tasks` | — | `200 Task[]` của người đang đăng nhập | AC6 |
| `PUT /tasks/:id` | `Task` | `200 Task`; upsert; chỉ ghi khi `updatedAt` mới hơn bản đang lưu | AC6 |
| `DELETE /tasks/:id` | — | `204`; `404` nếu không phải việc của mình (không phân biệt "không tồn tại" và "của người khác") | AC6, AC8 |
| `POST /tasks/import` | `{ tasks: Task[] }` | `200 Task[]` (danh sách sau gộp); upsert theo `id`, gọi lại nhiều lần không nhân đôi | AC7 |

- Quyền sở hữu luôn lấy từ phiên phía server, không bao giờ từ `userId` trong request (AC8).
- Email: chuẩn hoá trước khi lưu + unique index trên email đã chuẩn hoá (AC2 `An@Mail.com` = `an@mail.com`).
- Kiểm tra định dạng email/mật khẩu ở **cả** client (AC3: không gửi request) **và** server.
- Tương thích ngược app mobile: không áp dụng (`mobile.supported_app_versions: 0`).

---

##### Thiết kế
Cần Designer (`design-brief`): màn hình mới (Đăng ký, Đăng nhập, chuyển qua lại giữa hai màn), đổi header (email người dùng), trạng thái lỗi theo ô (AC3: viền đỏ + dòng báo lỗi, khớp Input "error" trong `docs/design-system.md` mục 4), thông báo lỗi chung (AC2, AC5), trạng thái đang tải khi gọi server, và cách người dùng **chưa đăng nhập** tìm thấy lối vào đăng nhập.

---

##### Rủi ro và câu hỏi mở
- **Tech Lead:** chọn framework, DB và cách migration cho `apps/api`. Có thể là NestJS (đã có `docs/agents/en/coding-standards/nestjs.md` để làm gốc) hoặc một framework nhẹ hơn, với Postgres hoặc SQLite. Chọn cả thuật toán băm mật khẩu (băm chậm, có salt, ví dụ argon2id hoặc bcrypt). Quyết định này cần có trước issue con 1.
- **PO:** cần cả email/mật khẩu (#14) **và** Google (#6), hay một là đủ? Với hướng A, mỗi cách đăng nhập là một phần xác thực riêng phải viết trong `apps/api`.
- **PO:** máy dùng chung. Issue giả định "vẫn dùng khi chưa đăng nhập" và "đóng trình duyệt thì mất đăng nhập". Nếu việc của tài khoản được lưu vào `wata-tasks:v1`, người kế tiếp mở app (chưa đăng nhập) sẽ thấy việc của tài khoản (#6 AC3 cấm điều này). Đề xuất: dữ liệu tài khoản **không** ghi vào `wata-tasks:v1`; sau khi gộp (AC7), xoá bản cục bộ. Xin xác nhận.
- **PO:** tài khoản thứ hai đăng nhập trên cùng máy sau khi việc cục bộ đã gộp vào tài khoản thứ nhất: không còn gì để gộp (theo đề xuất trên). Đúng ý không?
- **PO + Security:** AC2 ("Email này đã được đăng ký") cho phép dò email nào có tài khoản, trong khi AC5 cố tình tránh điều đó. Chấp nhận (phổ biến, dễ dùng) hay đổi AC2?
- **Tech Lead + Security:** chống dò mật khẩu (giới hạn số lần thử) chưa có trong AC nào. Cần thêm AC hay chấp nhận cho demo?
- **Tech Lead:** phiên đăng nhập giữ ở `sessionStorage` (khớp giả định "đóng trình duyệt thì mất", nhưng lộ nếu có XSS) hay cookie phiên `HttpOnly` (an toàn hơn, cần cấu hình CORS/SameSite)?
- **Tech Lead / PM:** hosting, DB, secret và **môi trường staging** (G5 UAT cần) chưa tồn tại; AI không deploy được. Ai lo, chi phí bao nhiêu?
- **Tech Lead:** `high_risk_paths` hiện là `**/auth/**`, `**/sync/**` (commit 647b1d1 đã bỏ `tasks.ts` khỏi danh sách). Đề xuất đặt code xác thực dưới `auth/` và code đồng bộ dưới `sync/` để tự động thành `risk:high`; story gộp dữ liệu cũ (AC7) vẫn nên `risk:high` theo `docs/agents/risk-tiers.md` (chuyển dữ liệu) dù đụng `tasks.ts`.
- **Người cần gỡ chặn #6:** #6 đang `status:blocked` chờ #1, nhưng câu hỏi backend thực ra được quyết ở #14. Đề xuất người chuyển phụ thuộc của #6 sang #14. Định dạng `projectId` của #1 (nếu làm) cần đi qua server không đổi.
- Rủi ro: 3 PR đang mở (PR 7, PR 12, PR 13) cùng sửa `tasks.ts` / `useTasks.ts` / `App.tsx` / `TaskForm.tsx`; story web của epic nên chờ chúng merge. AC6 có "sửa", tức phụ thuộc #10 (PR 12).

---

##### Issue con đề xuất
| # | Tiêu đề | App | Loại | Phụ thuộc |
|---|---|---|---|---|
| 1 | Chốt và dựng hạ tầng backend: DB, secret, staging; thêm app vào `project.yml`, label `app:api`, coding standard, job CI (con người làm) | api / cấu hình | chore | Tech Lead chọn framework/DB |
| 2 | Chốt contract: kiểu `User`/`Task` (thêm `updatedAt?`), endpoint/schema + mã lỗi ở mục trên | api, web | chore | 1 |
| 3 | Đăng ký và đăng nhập phía server: chuẩn hoá email, băm mật khẩu, mã lỗi chung (AC2, AC5, AC9) — `risk:high`, đề xuất `human-code` | api | feature | 2 |
| 4 | API công việc theo người dùng: list/upsert/delete, kiểm tra quyền sở hữu, test "A không đụng được việc của B" (AC8) — `risk:high` | api | feature | 3 |
| 5 | Màn Đăng ký / Đăng nhập, email ở đầu trang, kiểm tra định dạng phía client (AC1, AC3, AC4, AC5 phần UI) | web | feature | 3, `design-brief` duyệt, PR 7/12/13 merge |
| 6 | Đồng bộ danh sách với server khi đã đăng nhập: tải khi mở trang, gửi thêm/sửa/xoá (AC6) | web | feature | 4, 5, #10 |
| 7 | Gộp công việc cục bộ `wata-tasks:v1` vào tài khoản lần đầu, không mất, không nhân đôi (AC7; `POST /tasks/import` hoặc tương đương) — `risk:high` | api, web | feature | 6 |

Mỗi AC thuộc đúng một issue con (AC5 tách phần server ở 3 và phần màn hình ở 5). Chỉ tạo issue con khi PO và Tech Lead đồng ý (chạy `/issue-create` cho từng dòng, "Part of #14", không gắn `status:*`).

---
Đã chạy: `git fetch origin --prune` (origin/main: 647b1d1); `gh issue list --state all --search "<q> in:title,body"` với "đăng nhập" (→ #14, #6, #5; #5 khớp lỏng, không nói về đăng nhập), "mật khẩu" (→ #14), "email" (→ #14, #6), đối chứng dương "Đánh dấu" (→ #3, …); `grep -rn "wata-tasks"` trong `apps`, `e2e` (chỉ `apps/web/src/lib/tasks.ts:7`); `gh pr view` PR 7, 12, 13 (danh sách file); timeline #14 (chỉ gắn `type:epic`, `app:web`)
Chỉ đọc: body #14, #1 (kèm `## Feature analysis`), #6 (kèm `## Triage: BLOCKED`); `apps/web/src/lib/tasks.ts`, `useTasks.ts`, `App.tsx`, `components/TaskForm.tsx`, `TaskList.tsx`, `test-setup.ts`; `CLAUDE.md`, `.claude/project.yml`, `docs/agents/contract.md`, `risk-tiers.md`, `docs/coding-standards/react.md`, `docs/design-system.md`, `.github/workflows/ci.yml`, `e2e/tests/smoke.spec.ts`
Còn là claim: khả năng của BaaS ở hướng B (row-level policy, Google login "chỉ là cấu hình") và gợi ý framework/thuật toán băm cho hướng A, đều viết theo hiểu biết chung, chưa đối chiếu tài liệu chính thức; nhu cầu đồng bộ nhiều máy của người dùng — chưa có số liệu
