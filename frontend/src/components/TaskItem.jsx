import { useState } from "react";

export function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [busy, setBusy] = useState(false);

  const taskId = task.id || task._id;

  const handleToggle = async () => {
    setBusy(true);
    try {
      await onToggle(taskId, !task.completed);
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    setBusy(true);
    try {
      await onDelete(task.id);
    } finally {
      setBusy(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === task.title) {
      setEditing(false);
      setEditValue(task.title);
      return;
    }
    setBusy(true);
    try {
      await onEdit(task.id, trimmed);
      setEditing(false);
    } finally {
      setBusy(false);
    }
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Escape") {
      setEditing(false);
      setEditValue(task.title);
    }
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <li
      className={`task-item${task.completed ? " task-item--done" : ""}${busy ? " task-item--busy" : ""}`}
    >
      <button
        className="task-item__check"
        onClick={handleToggle}
        disabled={busy}
        aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
      >
        {task.completed ? (
          <svg viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              fill="currentColor"
              opacity="0.15"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M4.5 8l2.5 2.5 4.5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </button>

      <div className="task-item__body">
        {editing ? (
          <form onSubmit={handleEditSubmit} className="task-item__edit-form">
            <input
              className="task-item__edit-input"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleEditKeyDown}
              autoFocus
              maxLength={200}
              disabled={busy}
            />
            <button
              type="submit"
              className="task-item__edit-save"
              disabled={busy}
            >
              Save
            </button>
            <button
              type="button"
              className="task-item__edit-cancel"
              onClick={() => {
                setEditing(false);
                setEditValue(task.title);
              }}
              disabled={busy}
            >
              Cancel
            </button>
          </form>
        ) : (
          <>
            <span className="task-item__title">{task.title}</span>
            <span className="task-item__date">{formattedDate}</span>
          </>
        )}
      </div>

      {!editing && (
        <div className="task-item__actions">
          <button
            className="task-item__btn task-item__btn--edit"
            onClick={() => setEditing(true)}
            disabled={busy}
            aria-label="Edit task"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M11 2l3 3-8 8H3v-3l8-8z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="task-item__btn task-item__btn--delete"
            onClick={handleDelete}
            disabled={busy}
            aria-label="Delete task"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path
                d="M3 4h10M6 4V2h4v2M5 4v9h6V4H5z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </li>
  );
}
