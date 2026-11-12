import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './lib/useTasks';

export default function App() {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <main className="app">
      <header>
        <h1>WATA Tasks</h1>
        <p className="subtitle">
          {tasks.length} công việc · {doneCount} đã xong
        </p>
      </header>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onRemove={removeTask} onToggle={toggleTask} />
    </main>
  );
}
