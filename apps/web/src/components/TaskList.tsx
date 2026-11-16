import type { Task } from '../lib/tasks';
import { TaskItem } from './TaskItem';

interface Props {
  tasks: Task[];
  onRemove: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

export function TaskList({ tasks, onRemove, onEdit }: Props) {
  if (tasks.length === 0) {
    return <p className="empty">Chưa có công việc nào. Thêm việc đầu tiên ở ô phía trên.</p>;
  }

  return (
    <ul className="task-list" aria-label="Danh sách công việc">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onRemove={onRemove} onEdit={onEdit} />
      ))}
    </ul>
  );
}
