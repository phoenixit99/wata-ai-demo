import { useEffect, useState } from 'react';
import { createTask, loadTasks, saveTasks, type Task } from './tasks';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks((prev) => [createTask(title), ...prev]);
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return { tasks, addTask, removeTask };
}
