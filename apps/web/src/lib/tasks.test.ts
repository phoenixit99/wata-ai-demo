import { loadTasks, STORAGE_KEY, toggleDone, createTask } from './tasks';

describe('tasks', () => {
  it('TC-3-06 đọc dữ liệu cũ không có trường hoàn thành', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        { id: 'a', title: 'Việc cũ 1', createdAt: '2026-10-01T00:00:00.000Z' },
        { id: 'b', title: 'Việc cũ 2', createdAt: '2026-10-02T00:00:00.000Z' },
      ]),
    );
    const tasks = loadTasks();
    expect(tasks).toHaveLength(2);
    expect(tasks.every((t) => !t.done)).toBe(true);
  });

  it('toggleDone đảo trạng thái của đúng một việc', () => {
    const a = createTask('A');
    const b = createTask('B');
    const once = toggleDone([a, b], a.id);
    expect(once.find((t) => t.id === a.id)?.done).toBe(true);
    expect(once.find((t) => t.id === b.id)?.done).toBeFalsy();
    expect(toggleDone(once, a.id).find((t) => t.id === a.id)?.done).toBe(false);
  });
});
