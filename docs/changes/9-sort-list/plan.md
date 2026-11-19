# Plan — #9 [feature] Sắp xếp danh sách công việc

> **Nguồn sự thật:** [issue #9](https://github.com/phoenixit99/wata-ai-demo/issues/9). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:needs-human`, `type:feature`, `risk:standard`, `priority:p2`, `app:web`  
> **Trạng thái artifact:** **Chưa có plan** — test-design dừng ở `## Needs human`, chờ PO quyết định.

### Từ comment 2026-11-16 · [issuecomment-6909762108](https://github.com/phoenixit99/wata-ai-demo/issues/9#issuecomment-6909762108)

#### Needs human

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật. Câu hỏi bên dưới là thật: AC1 không kiểm thử được nếu chưa chốt "thứ tự hợp lý" là gì.

@phoenixit99 (PO): bước **test-design** dừng ở AC1. "Thứ tự hợp lý" có ít nhất 3 cách hiểu, mỗi cách cho ra bộ test case và phạm vi code khác nhau. Đây là quyết định sản phẩm nên AI không tự chọn.

| Phương án | Người dùng thấy gì | Hệ quả kỹ thuật | Size |
|---|---|---|---|
| **A. Mới nhất trước** (như hiện tại), thêm nút đảo "Cũ nhất trước" | Một nút bật/tắt ở đầu danh sách | Chỉ sắp theo `createdAt`, không đổi kiểu `Task` | S |
| **B. Kéo thả thủ công** | Kéo từng dòng lên/xuống | Thêm field `order` (tuỳ chọn) vào `Task`, cần đọc dữ liệu cũ; cần thao tác bàn phím cho a11y | L |
| **C. Theo hạn chót** | Việc gần hạn lên đầu | Phụ thuộc **#5** (hạn chót) chưa có code. Làm sau #5 | M |

Câu hỏi:
1. Chọn A, B hay C (hoặc cách khác)?
2. Việc đã xong (#3) nằm cuối danh sách hay giữ nguyên vị trí?

Khi đã chốt: sửa AC1 trong body theo phương án đã chọn, rồi gắn lại `status:test-design`.

---
Đã chạy: — · Chỉ đọc: body issue, `apps/web/src/lib/tasks.ts`, #3, #5 · Còn là claim: ước lượng size
