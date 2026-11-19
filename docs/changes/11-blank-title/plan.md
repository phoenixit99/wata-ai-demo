# Plan — #11 [bug] Thêm được công việc chỉ có khoảng trắng

> **Nguồn sự thật:** [issue #11](https://github.com/phoenixit99/wata-ai-demo/issues/11). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:qa-failed`, `type:bug`, `risk:standard`, `priority:p1`, `app:web`  
> **Trạng thái artifact:** **Đã duyệt ở G2** (`## Plan approval` — ĐỒNG Ý, có người ký). Build write-up bên dưới ghi phần code thực tế so với plan.

PR: [#13](https://github.com/phoenixit99/wata-ai-demo/pull/13)

### Từ comment 2026-11-16 · [issuecomment-6909765221](https://github.com/phoenixit99/wata-ai-demo/issues/11#issuecomment-6909765221)

#### Test design: PASS

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật.

| ID | AC | Mô tả | Ưu tiên | Loại | Đỏ hôm nay? | Nơi đặt |
|---|---|---|---|---|---|---|
| TC-11-01 | AC1 | Gõ "   " + Thêm → "0 công việc", vẫn hiện trạng thái rỗng | P1 | unit | Có | `apps/web/src/App.test.tsx` |
| TC-11-02 | AC2 | Gõ "   Mua sữa   " → dòng hiển thị đúng "Mua sữa" | P2 | unit | Không (ghim) | `apps/web/src/App.test.tsx` |
| TC-11-03 | AC3 | `loadTasks` gặp dữ liệu cũ có việc tên `""` và `"   "` → bỏ qua, chỉ trả việc có tên | P1 | unit | Có | `apps/web/src/lib/tasks.test.ts` |

##### Plan
| AC | File sẽ sửa | Test case |
|---|---|---|
| AC1, AC2 | `components/TaskForm.tsx` | TC-11-01, 02 |
| AC3 | `lib/tasks.ts` (`loadTasks`) | TC-11-03 |

### Từ comment 2026-11-16 · [issuecomment-6909765833](https://github.com/phoenixit99/wata-ai-demo/issues/11#issuecomment-6909765833)

#### Plan approval

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật. Đây là chữ ký cổng G2 của con người.

Người duyệt: @phoenixit99 (đóng vai Tech Lead và QA) · Phần: cả hai · Kết luận: ĐỒNG Ý

### Từ comment 2026-11-16 · [issuecomment-6909766340](https://github.com/phoenixit99/wata-ai-demo/issues/11#issuecomment-6909766340)

#### Build write-up

PR: #13 · Branch: `fix/11-blank-title` · Commit: 1051c51

##### Đã làm
- AC1 → `components/TaskForm.tsx`: chặn submit khi `title.trim() === ''` (trước đây chỉ chặn chuỗi rỗng tuyệt đối).
- AC2 → không cần code mới: `createTask` đã `trim()`. Test ghim TC-11-02.
- Test tái hiện TC-11-01: **đỏ trước khi sửa** (`Tests 1 failed | 5 passed`), xanh sau khi sửa.

##### Không làm
- AC3 (dữ liệu cũ) **chưa có code** trong commit này.

---
Đã chạy (local): TC-11-01 đỏ trên main, xanh sau sửa; `lint`, `typecheck`, `test` (6 passed), `build` trên 1051c51
