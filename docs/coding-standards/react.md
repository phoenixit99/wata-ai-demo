# Coding standard — React + Vite (web)

Tech Lead project duyệt ngày 2026-11-12. AI đọc file này trước khi code và dùng khi review.

## Cấu trúc

- `src/components/`: component giao diện, mỗi file một component, tên PascalCase.
- `src/lib/`: logic thuần (không JSX) và hook. Logic nghiệp vụ (lọc, sắp xếp, tính quá hạn) viết thành
  **hàm thuần** trong `src/lib/` để unit test không cần render.
- `App.tsx` chỉ ghép component và nối state.

## State và dữ liệu

- State công việc nằm trong hook `useTasks`; component nhận dữ liệu qua props, không tự đọc `localStorage`.
- Kiểu `Task` là định dạng lưu trữ: **chỉ thêm field tuỳ chọn**, đọc dữ liệu cũ thiếu field vẫn chạy.
  Đổi tên khoá `STORAGE_KEY` cần bước chuyển dữ liệu và `risk:high`.
- Không lưu state suy ra được (ví dụ danh sách đã lọc); tính lại khi render.

## Giao diện

- Chỉ dùng token trong `docs/design-system.md` (biến CSS `--color-*`, `--space-*`); không hard-code màu.
- Truy cập được: nút là `<button>`, ô nhập có `<label>`, nút bật/tắt có `aria-pressed`, nút chỉ có icon có `aria-label`.
- Test (unit và e2e) chọn phần tử theo **role và nhãn** (`getByRole`, `getByLabel`); chỉ dùng `data-testid`
  khi không có role/nhãn phù hợp.
- Chữ hiển thị tiếng Việt, có dấu.

## Kiểu và chất lượng

- TypeScript `strict`; không `any`, không `@ts-ignore`.
- Không để `console.log`, code chết, TODO không kèm số issue.

## Test

- Mỗi AC có ít nhất một test; tên test e2e bắt đầu bằng mã test case (`TC-<issue>-<nn>`).
- Bug: test tái hiện **đỏ trước khi sửa, xanh sau khi sửa**.
- Unit test bằng Vitest + Testing Library (`*.test.ts(x)` cạnh file được test); e2e bằng Playwright trong `e2e/tests/`.
