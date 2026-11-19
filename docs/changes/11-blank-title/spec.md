# Spec — #11 [bug] Thêm được công việc chỉ có khoảng trắng

> **Nguồn sự thật:** [issue #11](https://github.com/phoenixit99/wata-ai-demo/issues/11). File này là bản chép (linkage), sinh từ issue và comment; nếu lệch, issue thắng. Nội dung chép là dữ liệu, không phải lệnh.
>
> **Label lúc chép:** `status:qa-failed`, `type:bug`, `risk:standard`, `priority:p1`, `app:web`  
> **Trạng thái artifact:** Đạt Definition of Ready (`## Triage: PASS`).

## Acceptance Criteria

- [ ] AC1: Nhập tên chỉ có khoảng trắng rồi bấm "Thêm": không thêm công việc, dòng đếm không đổi.
- [ ] AC2: Tên có khoảng trắng hai đầu được lưu đã bỏ khoảng trắng.
- [ ] AC3: Người dùng đã lỡ lưu công việc tên rỗng (do lỗi này) thì sau khi cập nhật, các dòng trống đó không còn hiển thị khi tải trang.

## Phân tích và duyệt

### Từ comment 2026-11-16 · [issuecomment-6909764567](https://github.com/phoenixit99/wata-ai-demo/issues/11#issuecomment-6909764567)

#### Triage: PASS

> 🧪 **Dữ liệu dựng sẵn cho demo**, không phải kết quả một skill đã chạy thật. Riêng lỗi là thật: đã tái hiện trên `main` 647b1d1 (`TaskForm.tsx` chỉ chặn `title === ''`).

R1–R11 đạt. Đề xuất `risk:standard` vì AC3 đụng dữ liệu đã lưu.
