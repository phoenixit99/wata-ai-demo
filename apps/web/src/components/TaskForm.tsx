import { useState, type FormEvent } from 'react';

interface Props {
  onAdd: (title: string) => void;
}

export function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (title === '') return;
    onAdd(title);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <label htmlFor="new-task" className="visually-hidden">
        Công việc mới
      </label>
      <input
        id="new-task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Thêm công việc…"
        maxLength={200}
      />
      <button type="submit">Thêm</button>
    </form>
  );
}
