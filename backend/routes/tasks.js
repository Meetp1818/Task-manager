const express = require("express");
const router = express.Router();
const TaskStore = require("../store/taskStore");
const { validateCreateTask, validateUpdateTask } = require("../middleware/validate");


router.get("/", (req, res) => {
  let tasks = TaskStore.getAll();
  const { filter } = req.query;//

  if (filter === "completed") {
    tasks = tasks.filter((t) => t.completed);
  } else if (filter === "incomplete") {
    tasks = tasks.filter((t) => !t.completed);
  }

  res.json({ data: tasks, count: tasks.length });
});


router.post("/", validateCreateTask, (req, res) => {
  const task = TaskStore.create({ title: req.body.title });
  res.status(201).json({ data: task });
});


router.patch("/:id", validateUpdateTask, (req, res) => {
  const task = TaskStore.update(req.params.id, {
    completed: req.body.completed,
    title: req.body.title,
  });

  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ data: task });
});


router.delete("/:id", (req, res) => {
  const deleted = TaskStore.delete(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted successfully" });
});

module.exports = router;
