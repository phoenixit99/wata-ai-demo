export interface Task {
  id: string;
  title: string;
  createdAt: string; // ISO 8601
  /** Tuỳ chọn: dữ liệu lưu trước #3 không có trường này, đọc thiếu thì coi là chưa xong. */
  done?: boolean;
}

export const STORAGE_KEY = 'wata-tasks:v1';

export function createTask(title: string, now: Date = new Date()): Task {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    createdAt: now.toISOString(),
  };
}

export function toggleDone(tasks: Task[], id: string): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

export function loadTasks(storage: Storage = localStorage): Task[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[], storage: Storage = localStorage): void {
  storage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
