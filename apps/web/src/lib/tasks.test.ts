import { loadTasks, STORAGE_KEY } from './tasks';

describe('loadTasks', () => {
  it('TC-11-03: bỏ qua công việc tên rỗng đã lưu từ trước', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { id: 'a', title: 'Viết báo cáo', createdAt: '2026-11-01T00:00:00.000Z' },
        { id: 'b', title: '', createdAt: '2026-11-02T00:00:00.000Z' },
        { id: 'c', title: '   ', createdAt: '2026-11-03T00:00:00.000Z' },
      ]),
    );
    expect(loadTasks(localStorage).map((t) => t.id)).toEqual(['a']);
  });
});
