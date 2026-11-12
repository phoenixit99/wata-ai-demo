import type { Task } from '../lib/tasks';

interface Props {
  tasks: Task[];
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function TaskList({ tasks, onRemove, onToggle }: Props) {
  if (tasks.length === 0) {
    return <p className="empty">Chưa có công việc nào. Thêm việc đầu tiên ở ô phía trên.</p>;
  }

  return (
    <ul className="task-list" aria-label="Danh sách công việc">
      {tasks.map((task) => (
        <li key={task.id} className={task.done ? 'task done' : 'task'}>
          <input
            type="checkbox"
            checked={!!task.done}
            onChange={() => onToggle(task.id)}
            aria-label={`Hoàn thành: ${task.title}`}
          />
          <span className="task-title">{task.title}</span>
          <button
            type="button"
            className="ghost"
            aria-label={`Xoá "${task.title}"`}
            onClick={() => onRemove(task.id)}
          >
            Xoá
          </button>
        </li>
      ))}
    </ul>
  );
}
