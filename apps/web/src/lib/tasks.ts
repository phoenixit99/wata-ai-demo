export interface Task {
  id: string;
  title: string;
  createdAt: string; // ISO 8601
}

export const STORAGE_KEY = 'wata-tasks:v1';

export function createTask(title: string, now: Date = new Date()): Task {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    createdAt: now.toISOString(),
  };
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
