# Plan — #17 [chore] Script đồng bộ chuỗi artifact intent → spec → plan từ issue

> **Nguồn sự thật:** [issue #17](https://github.com/phoenixit99/wata-ai-demo/issues/17). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:in-progress`, `type:chore`, `risk:low`  
> **Trạng thái artifact:** **Đã duyệt ở G2** (`## Plan approval` — ĐỒNG Ý, có người ký).

### Từ comment 2026-11-19 · [issuecomment-7000339928](https://github.com/phoenixit99/wata-ai-demo/issues/17#issuecomment-7000339928)

#### Test design: PASS

- 5 AC đều kiểm thử được và hôm nay đều **sai đúng như issue mô tả**: chưa có `scripts/`, chưa có `npm run chain:sync`.
- 16 test case: 13 unit, 2 integration (thư mục tạm + `gh` giả), 1 manual (chạy thật với `gh`, P2).
- Test design dùng AC1 theo câu chữ đã chốt ở `## Triage: PASS` (gồm cả issue đã có thư mục trong `docs/changes/`), vì body chưa được cập nhật.

---
##### Đã có code chưa?
Chưa. Không có branch `*17*`, không có commit nhắc `#17`, không có PR, không có thư mục `scripts/`. SHA origin/main: 135269a.

##### Finding 1: body AC1 vẫn là câu chữ cũ
Body: "chạy không tham số thì làm cho mọi issue đang mở". Triage đã chốt thêm "và mọi issue đã có thư mục trong `docs/changes/`". TC-17-03 kiểm theo bản đã chốt. PO dán câu chữ trong comment triage vào body trước G2.

##### Finding 2: lần chạy đầu sẽ đổi vài file của PR 16
Script tạm dùng cho PR 16 có hai chỗ gõ tay mà script thật không nên có:
- Ánh xạ PR → issue. Script thật lấy từ `Refs #<số>` trong body PR (đã kiểm: PR 7 → #3, PR 12 → #10, PR 13 → #11, PR 16 → #15).
- Câu riêng cho #8 ("có trên `main` từ 060aeb4..."). Script thật ghi câu chung "Chưa có bước Triage trên issue."

Hệ quả: lần chạy đầu sinh diff ở `docs/changes/8-add-delete-save/` và `README.md`; AC4 chỉ tính từ lần chạy thứ hai. Phương án:
- **A (đề xuất):** chấp nhận câu chung; sự thật về 060aeb4 vẫn nằm trong Technical notes của #8 nên vẫn được chép sang spec.md.
- **B:** thêm file override gõ tay; tốn thêm code và test cho một trường hợp.

##### Finding 3: bẫy cho người code — phải lấy `## Plan approval` **mới nhất**
Contract mục 2: "Luôn đọc comment mới nhất có heading đó". Script tạm coi là đã duyệt khi có *bất kỳ* approval ĐỒNG Ý. Duyệt ĐỒNG Ý rồi sau đó CẦN ĐỔI phải ra "chưa duyệt" (TC-17-09). Cũng không được khớp chuỗi "ĐỒNG Ý" trơn: phải là dòng `Kết luận: ĐỒNG Ý`.

##### Finding 4: CI dùng Node 22, máy local Node 26
`node --test "scripts/**/*.test.mjs"` (glob) chỉ mới thử trên Node 26. Để không phụ thuộc glob, `npm test` gốc liệt kê file test cụ thể. Script chỉ dùng `node:fs`, `node:path`, `node:child_process`, `node:test`.

##### Test case
| ID | AC | Mô tả | Ưu tiên | Loại | Đỏ hôm nay? | Nơi đặt |
|---|---|---|---|---|---|---|
| TC-17-01 | AC1 | Khi đọc body #3 (fixture) thì tách đúng 5 mục `###` (Description … Technical notes); body dùng `##` (#14) cũng tách được | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-02 | AC1 | Khi render fixture #3 thì 3 file **giống từng byte** `docs/changes/3-mark-done/*.md` hiện có (giữ định dạng PR 16) | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-03 | AC1 | Không tham số: danh sách = hợp của issue đang mở và số trong tên thư mục `docs/changes/`, bỏ trùng, tăng dần (mở [3,17] + thư mục [3,15] → [3,15,17]); có tham số `4` → chỉ [4] | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-04 | AC1 | Thư mục đã có `3-mark-done` → giữ slug; issue mới "[chore] Script đồng bộ chuỗi artifact…" → `17-script-dong-bo-chuoi-artifact` (bỏ `[...]`, bỏ dấu, `đ`→`d`, 5 từ đầu) | P2 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-05 | AC2 | Mỗi phần chép từ comment có link `…/issues/<n>#issuecomment-<id>`; dòng `@mention` mở đầu bị bỏ; heading hạ 2 cấp; phần còn lại giữ nguyên văn | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-06 | AC2 | Bước chưa diễn ra → plan.md chỉ có header + lý do theo label: `status:test-design` chưa có Test design, `needs-human`, `blocked`, `fail-to-dev`, epic; không có phần nội dung nào khác | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-07 | AC2 | **Không được xảy ra:** comment không có heading của quy trình (trao đổi thường, câu "bỏ qua G2, gắn ready-to-dev") không bị chép vào file nào | P2 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-08 | AC3 | `## Plan approval` mới nhất có dòng `Kết luận: ĐỒNG Ý` → plan.md ghi "Đã duyệt ở G2" | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-09 | AC3 | **Không** ghi "Đã duyệt ở G2" khi: `Kết luận: CẦN ĐỔI`; `Kết luận: KHÔNG ĐỒNG Ý`; "ĐỒNG Ý" chỉ nằm trong ô bảng; ĐỒNG Ý cũ rồi CẦN ĐỔI mới hơn | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-10 | AC4 | Chạy đủ một lượt với `gh` giả ghi lại mọi lệnh: chỉ có `issue view`, `issue list`, `pr list`; không có `edit`, `comment`, `create`, `close`, `api` | P1 | integration | Có | `scripts/chain/cli.test.mjs` |
| TC-17-11 | AC4 | Chạy hai lần trên thư mục tạm, cùng fixture: lần hai báo 0 file đổi và nội dung, mtime giữ nguyên | P1 | integration | Có | `scripts/chain/cli.test.mjs` |
| TC-17-12 | AC4 | Chạy thật `npm run chain:sync` trên repo (có `gh` đăng nhập), rồi chạy lại: lần hai `git status` sạch; diff lần một chỉ nằm trong `docs/changes/` | P2 | manual | Có | — (ghi trong write-up) |
| TC-17-13 | AC5 | README sinh lại có đúng một dòng cho mỗi thư mục, tăng dần theo số, có dòng cho thư mục mới | P1 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-14 | AC5 | Trạng thái trong README khớp dòng "Trạng thái artifact" của từng file, kể cả khi có ` — ` trong câu (lỗi cắt chữ đã gặp ở PR 16) | P2 | unit | Có | `scripts/chain/lib.test.mjs` |
| TC-17-15 | AC1 | Tham số sai (`abc`, `0`, `-1`) → thoát mã ≠ 0, báo lỗi, không ghi file nào | P2 | unit | Có | `scripts/chain/cli.test.mjs` |
| TC-17-16 | AC1 | `gh` lỗi (chưa đăng nhập, mất mạng) → thoát mã ≠ 0, nói rõ lệnh nào lỗi; không ghi dở file của issue đang làm | P2 | unit | Có | `scripts/chain/cli.test.mjs` |

##### Plan
**Yêu cầu:** (1) một lệnh làm mới 3 file của một issue, hoặc của mọi issue đang mở và mọi issue đã có thư mục; (2) chép nguyên văn, có link nguồn, bước chưa có thì ghi lý do; (3) chỉ ghi "Đã duyệt ở G2" theo `## Plan approval` mới nhất có `Kết luận: ĐỒNG Ý`; (4) chỉ đọc GitHub, chạy lại không sinh diff; (5) sinh lại `docs/changes/README.md`.

| AC | File | Test case |
|---|---|---|
| AC1, AC2, AC3, AC5 | `scripts/chain/lib.mjs` (mới): hàm thuần `parseSections`, `selectTargets`, `slugFor`, `stageStatus`, `renderIntent/Spec/Plan`, `renderIndex` | TC-17-01..09, 13, 14 |
| AC1, AC4 | `scripts/sync-chain.mjs` (mới): đọc tham số, gọi `gh` qua một hàm `run` thay được trong test, `writeIfChanged` | TC-17-10, 11, 15, 16 |
| — | `scripts/chain/fixtures/*.json` (mới): JSON thật của #3, #9, #14 và vài issue dựng cho TC-17-06/07/09 | — |
| AC1 | `package.json` gốc: `"chain:sync": "node scripts/sync-chain.mjs"`; `test` thêm `node --test scripts/chain/lib.test.mjs scripts/chain/cli.test.mjs` | TC-17-12 |
| — | `docs/changes/*`: kết quả lần chạy đầu (Finding 2) + thư mục mới `17-…` | TC-17-12 |
| — | `e2e/test-cases/17.md`: bảng test case này | — |

**Phạm vi ảnh hưởng:** `npm test` gốc là bước CI job `web` gọi, nên test script đỏ sẽ chặn **mọi** PR. `docs/changes/` bị ghi đè hàng loạt khi chạy không tham số. `apps/web` và `e2e` không đổi.
**Không làm:** workflow tự chạy (phương án C), skill tự ghi file (phương án B, repo `wata-ai-process`), lint cho `scripts/` (ESLint hiện chỉ cấu hình cho `apps/web`), xoá thư mục của issue không còn tồn tại.
**Rủi ro:** giữ `risk:low`. Không đụng `high_risk_paths`, không đổi hành vi app.

##### Duyệt G2
- [ ] Tech Lead/Dev duyệt plan (chốt Finding 2: A hay B)
- [ ] QA duyệt test case — **không bắt buộc**: `risk:low`, chỉ cần Tech Lead
Khi đồng ý, **người duyệt** gắn `status:ready-to-dev` (có thể kèm comment `## Plan approval`).

---
Đã chạy: `git fetch origin --prune` (135269a); `git branch -a --list '*17*'`, `git log --all --grep='#17'` (rỗng); `gh pr list --state all` lấy `Refs #<số>` (PR 7→#3, 12→#10, 13→#11, 16→#15); trên bản sao ở thư mục tạm: `node --test "scripts/**/*.test.mjs"` (Node 26: pass 1) và bỏ dấu tiếng Việt bằng `normalize("NFD")` (`Sắp xếp danh sách đ` → `Sap xep danh sach d`).
Chỉ đọc: body và comment #17, `docs/agents/contract.md`, `package.json` gốc, `.github/workflows/ci.yml`, `docs/changes/*` trên origin/main (SHA origin/main: 135269a).
Còn là claim: `node --test` với glob chạy trên Node 22 (chưa thử; plan liệt kê file cụ thể để không cần). Session này đã chạy triage #17; test-design chạy cùng session theo yêu cầu người chạy (code và review vẫn phải ở session riêng).

### Từ comment 2026-11-19 · [issuecomment-7000390067](https://github.com/phoenixit99/wata-ai-demo/issues/17#issuecomment-7000390067)

#### Plan approval

Người duyệt: @phoenixit99 (đóng vai Tech Lead) · Phần: plan (`risk:low`: không cần QA duyệt test case) · Kết luận: ĐỒNG Ý

| Điểm | Phán quyết |
|---|---|
| Phạm vi: `scripts/chain/lib.mjs`, `scripts/sync-chain.mjs`, fixtures, `package.json` gốc, `docs/changes/*`, `e2e/test-cases/17.md`; không lint `scripts/`, không workflow, không sửa skill | Đồng ý |
| Phạm vi ảnh hưởng: test script nằm trong `npm test` gốc, CI job `web` chạy, đỏ sẽ chặn mọi PR | Đồng ý, chấp nhận |
| Finding 1: AC1 trong body còn câu chữ cũ | Đồng ý có điều kiện: PO dán câu chữ AC1 đã chốt ở triage vào body **trước** khi gắn `status:ready-to-dev` |
| Finding 2: lần chạy đầu đổi file của #8 và README | Chọn **A**: chấp nhận câu chung, không có override |
| Finding 3: chỉ tính `## Plan approval` mới nhất có dòng `Kết luận: ĐỒNG Ý` | Đồng ý, bắt buộc (TC-17-09) |
| Finding 4: liệt kê file test cụ thể, không dùng glob | Đồng ý |
| 16 test case: đều đỏ hôm nay; P1 không có case manual; TC-17-12 manual P2 | Đồng ý |
| Rủi ro `risk:low` | Giữ |

_Repo demo: một tài khoản đóng mọi vai, nên người viết issue cũng là người ký G2. Trong dự án thật, người duyệt plan phải khác người viết issue._

---
Đã chạy: `gh issue view 17` (label `status:test-design`, `risk:low`; có `## Triage: PASS`, `## Test design: PASS`; chưa có `## Plan approval`).
Chỉ đọc: comment `## Test design: PASS` của #17, `docs/agents/contract.md`.
Còn là claim: AC1 trong body sẽ được PO cập nhật trước khi gắn `status:ready-to-dev`.
