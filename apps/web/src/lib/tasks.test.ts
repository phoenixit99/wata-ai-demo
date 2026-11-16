import { renameTask, type Task } from './tasks';

const tasks: Task[] = [
  { id: 'a', title: 'Viết báo cáo', createdAt: '2026-11-01T00:00:00.000Z' },
  { id: 'b', title: 'Gọi khách hàng', createdAt: '2026-11-02T00:00:00.000Z' },
];

describe('renameTask', () => {
  it('TC-10-01: đổi tên đúng công việc, bỏ khoảng trắng hai đầu', () => {
    const result = renameTask(tasks, 'b', '  Gọi lại khách hàng  ');
    expect(result[1].title).toBe('Gọi lại khách hàng');
    expect(result[0]).toBe(tasks[0]);
  });

  it('TC-10-04: tên mới rỗng thì giữ nguyên tên cũ', () => {
    expect(renameTask(tasks, 'a', '   ')).toBe(tasks);
  });
});
