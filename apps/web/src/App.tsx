import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { useTasks } from './lib/useTasks';

export default function App() {
  const { tasks, addTask, removeTask } = useTasks();

  return (
    <main className="app">
      <header>
        <h1>WATA Tasks</h1>
        <p className="subtitle">{tasks.length} công việc</p>
      </header>
      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} onRemove={removeTask} />
    </main>
  );
}
