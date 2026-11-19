# Spec — #17 [chore] Script đồng bộ chuỗi artifact intent → spec → plan từ issue

> **Nguồn sự thật:** [issue #17](https://github.com/phoenixit99/wata-ai-demo/issues/17). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:in-progress`, `type:chore`, `risk:low`  
> **Trạng thái artifact:** Đạt Definition of Ready (`## Triage: PASS`).

## Acceptance Criteria

- [ ] AC1: `npm run chain:sync -- <số issue>` tạo mới hoặc ghi đè 3 file của issue đó từ body và comment hiện tại; chạy không tham số thì làm cho mọi issue đang mở.
- [ ] AC2: Nội dung chép nguyên văn, mỗi phần có link về comment nguồn; bước chưa diễn ra thì ghi lý do, không bịa.
- [ ] AC3: plan.md chỉ ghi "Đã duyệt ở G2" khi có comment `## Plan approval` chứa `Kết luận: ĐỒNG Ý`.
- [ ] AC4: Script chỉ đọc GitHub (`gh issue view`), không ghi gì lên GitHub; chạy lại khi issue không đổi thì không sinh diff.
- [ ] AC5: `docs/changes/README.md` (bảng trạng thái) được cập nhật cùng lúc.

## Design

_No response_

## Technical notes

- Dựa trên script đã dùng để sinh dữ liệu cho PR #16. Đặt ở `scripts/sync-chain.mjs`, viết bằng Node để không thêm Python vào repo, chỉ dùng thư viện có sẵn của Node, và cần có `gh` đã đăng nhập.
- Slug hiện đang gõ tay; script sẽ lấy slug từ tên thư mục đã có, issue mới thì sinh slug từ tiêu đề.
- Có unit test cho phần đọc section và phần xét trạng thái (fixture JSON).
- Phụ thuộc #15 / PR #16 (merge trước).
- Ngoài phạm vi: workflow tự chạy (phương án C) và việc skill tự ghi file (phương án B).

## Phân tích và duyệt

### Từ comment 2026-11-19 · [issuecomment-7000282228](https://github.com/phoenixit99/wata-ai-demo/issues/17#issuecomment-7000282228)

#### Triage: PASS

- 5 AC đều có lệnh/hành động và kết quả kiểm được (file sinh ra, link nguồn, dòng trạng thái G2, không ghi lên GitHub, chạy lại không sinh diff).
- Phụ thuộc đã gỡ: PR 16 đã merge (CI `web`, `e2e`, GitGuardian xanh), #15 đã đóng; `docs/changes/` có trên `origin/main`.
- Quyết định của người chạy (phoenixit99, đóng vai PO + Tech Lead) trong buổi triage: tự assign; gắn `type:chore`, **không** gắn `app:*` (R6 không áp dụng: tooling ở gốc repo, không đụng `apps/web`); AC1 chạy không tham số phải làm cả issue đã có thư mục trong `docs/changes/` (kể cả issue đã đóng).

---
| # | Kết quả | Ghi chú |
|---|---|---|
| R1 | Đạt | Assign @phoenixit99 trong buổi triage |
| R2 | Đạt | "Script đồng bộ chuỗi artifact intent → spec → plan từ issue" |
| R3 | Đạt | Vấn đề: file trong `docs/changes/` cũ đi khi issue đổi trạng thái; lý do: skill chưa tự ghi |
| R4 | Đạt | 5 AC |
| R5 | Đạt | Không có từ mơ hồ; AC4 kiểm bằng `git diff` sau lần chạy thứ hai |
| R6 | Không áp dụng | `project.yml` chỉ có app `web`; thay đổi nằm ở `scripts/`, `docs/changes/`, `package.json` gốc. Ngoại lệ được người chạy duyệt |
| R7 | Đạt | Không có TBD/`<...>` |
| R8 | Đạt | #15 CLOSED, PR 16 MERGED |
| R9 | Không áp dụng | Không phải bug |
| R10 | Không áp dụng | Không đổi API/UI |
| R11 | Đạt | Không trùng (tìm "chain", "sync-chain", "docs/changes"; đối chứng dương trả về #17) |

---
##### Câu chữ đề xuất
Thay AC1 bằng:

> - [ ] AC1: `npm run chain:sync -- <số issue>` tạo mới hoặc ghi đè 3 file của issue đó từ body và comment hiện tại. Chạy không tham số thì làm cho mọi issue đang mở **và** mọi issue đã có thư mục trong `docs/changes/` (kể cả issue đã đóng, để giữ trạng thái cuối).

##### Việc trùng hoặc liên quan
- #15 [docs] Lưu chuỗi artifact intent → spec → plan cho mỗi issue (CLOSED): sinh ra `docs/changes/` mà script này giữ cập nhật.

##### Ghi chú cho test-design
- CI (`.github/workflows/ci.yml`) chạy `npm test` ở gốc, hiện chỉ gọi `apps/web`. Thêm test của script vào `npm test` gốc (ví dụ `node --test scripts/`) thì CI chạy được mà không sửa workflow.
- CI dùng Node 22; máy local đang Node 26. Script chỉ dùng API có ở Node 22.
- Script gọi `gh`; unit test dùng fixture JSON, không gọi mạng.
- `docs/changes/README.md` hiện sinh bằng tay; AC5 yêu cầu script sinh lại, nên test cần so với bản hiện có.

##### Rủi ro đề xuất
risk:low: chore tooling, chỉ ghi file markdown trong `docs/changes/`, không đổi hành vi app, không đụng `high_risk_paths`.

---
Đã chạy: `git fetch origin --prune` (origin/main 135269a); `gh issue list --search` cho R11 (kèm đối chứng dương); `gh pr view 16` (MERGED, 3 check SUCCESS); `gh issue view 15` (CLOSED); `node -v` (v26.8.2).
Chỉ đọc: body và timeline #17, `docs/agents/contract.md`, `.claude/project.yml`, `package.json` gốc, `.github/workflows/ci.yml` (SHA origin/main: 135269a).
Còn là claim: "dựa trên script đã dùng cho PR 16" — script đó nằm ở thư mục tạm của session, không có trong repo; implement cần viết lại.
