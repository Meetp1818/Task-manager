import { useTasks } from "./hooks/useTasks";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { FilterBar } from "./components/FilterBar";
import "./App.css";

function App() {
  const {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    editTask,
    removeTask,
  } = useTasks();

  
  const safeTasks = Array.isArray(tasks) ? tasks : [];

const counts = {
  all: safeTasks.length,
  completed: safeTasks.filter(t => t.completed).length,
  incomplete: safeTasks.filter(t => !t.completed).length,
};

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <span className="app-header__logo">✓</span>
          <h1 className="app-header__title">Tasks</h1>
        </div>
      </header>

      <main className="app-main">
        <TaskForm onAdd={addTask} />

        <FilterBar
          filter={filter}
          setFilter={setFilter}
          counts={counts}
        />

        <TaskList
          tasks={safeTasks}
          loading={loading}
          error={error}
          filter={filter}
          onToggle={toggleTask}
          onDelete={removeTask}
          onEdit={editTask}
        />

        {!loading && !error && safeTasks.length > 0 && (
          <p className="app-summary">
            {counts.incomplete} remaining · {counts.completed} done
          </p>
        )}
      </main>
    </div>
  );
}

export default App;