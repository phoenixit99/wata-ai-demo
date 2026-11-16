import { useState, type FormEvent, type KeyboardEvent } from 'react';
import type { Task } from '../lib/tasks';

interface Props {
  task: Task;
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export function TaskItem({ task, onRemove, onEdit }: Props) {
  const [draft, setDraft] = useState<string | null>(null);

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (draft !== null) onEdit(task.id, draft);
    setDraft(null);
  };

  const cancelOnEscape = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setDraft(null);
  };

  if (draft !== null) {
    return (
      <li className="task">
        <form className="task-edit" onSubmit={save}>
          <input
            aria-label={`Sửa tên: ${task.title}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={cancelOnEscape}
            maxLength={200}
            autoFocus
          />
          <button type="submit">Lưu</button>
          <button type="button" className="ghost" onClick={() => setDraft(null)}>
            Huỷ
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="task">
      <span className="task-title">{task.title}</span>
      <button
        type="button"
        className="ghost"
        aria-label={`Sửa "${task.title}"`}
        onClick={() => setDraft(task.title)}
      >
        Sửa
      </button>
      <button
        type="button"
        className="ghost"
        aria-label={`Xoá "${task.title}"`}
        onClick={() => onRemove(task.id)}
      >
        Xoá
      </button>
    </li>
  );
}
