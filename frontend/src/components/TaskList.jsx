import { TaskItem } from "./TaskItem";

export function TaskList({
  tasks,
  loading,
  error,
  onToggle,
  onDelete,
  onEdit,
  filter,
}) {
 const filteredTasks = tasks.filter((t) => {
  if (filter === "completed") return t.completed;
  if (filter === "incomplete") return !t.completed;
  return true;
});

  if (loading) {
    return (
      <div className="task-list__state">
        <div className="spinner" aria-label="Loading tasks" />
        <p>Loading tasks…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list__state task-list__state--error">
        <svg viewBox="0 0 24 24" fill="none" className="state-icon">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 8v4M12 16h.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p>Could not load tasks: {error}</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    const emptyMessages = {
      all: "No tasks yet. Add one above!",
      completed: "No completed tasks.",
      incomplete: "All tasks are done! 🎉",
    };
    return (
      <div className="task-list__state task-list__state--empty">
        <svg viewBox="0 0 24 24" fill="none" className="state-icon">
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 12h8M8 8h5M8 16h3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <p>{emptyMessages[filter]}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
