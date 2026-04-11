import { useState, useEffect, useCallback } from "react";
import { api } from "../api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); 

  const fetchTasks = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await api.getTasks();   
    setTasks(Array.isArray(res) ? res : res.data || []);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (title) => {
    const res = await api.createTask(title);
    if (filter === "all" || filter === "incomplete") {
      setTasks((prev) => [...prev, res.data]);
    }
    return res.data;
  };

 const toggleTask = async (id, completed) => {
  await api.updateTask(id, { completed });

  setTasks((prev) =>
    (Array.isArray(prev) ? prev : []).map((t) =>
      (t.id === id || t._id === id)
        ? { ...t, completed }
        : t
    )
  );
};

  const editTask = async (id, title) => {
    const res = await api.updateTask(id, { title });
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
  };

  const removeTask = async (id) => {
    await api.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    tasks,
    loading,
    error,
    filter,
    setFilter,
    addTask,
    toggleTask,
    editTask,
    removeTask,
    refetch: fetchTasks,
  };
}
