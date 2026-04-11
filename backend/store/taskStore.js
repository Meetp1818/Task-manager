const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const DB_FILE = process.env.DATA_FILE || path.join(__dirname, "../data/tasks.json"); 


const dataDir = path.dirname(DB_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}


function loadTasks() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
     console.error("tasks.json corrupt", err.message);
  }
  return [];
}

function saveTasks(tasks) {
  fs.writeFileSync(DB_FILE, JSON.stringify(tasks, null, 2), "utf-8");
}

let tasks = loadTasks();

const TaskStore = {
  getAll() {
    return tasks;
  },

  getById(id) {
    return tasks.find((t) => t.id === id) || null;
  },

  create({ title }) { 
    const task = {
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    saveTasks(tasks);
    return task;
  },

  update(id, { completed, title }) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;

    if (typeof completed === "boolean") task.completed = completed;
    if (typeof title === "string" && title.trim()) task.title = title.trim();

    saveTasks(tasks);
    return task;
  },

  delete(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    saveTasks(tasks);
    return true;
  },
};

module.exports = TaskStore;






