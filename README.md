# Task Manager

A simple full-stack Task Manager with a React frontend and a Node.js/Express REST API. Supports creating, viewing, completing, editing, and deleting tasks — with filtering and persistent file-based storage.

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later
- _(Optional)_ **Docker** + **Docker Compose** for containerised setup

---

## Quick Start (Manual)

### 1. Start the Backend

```bash
cd backend
npm install
npm start
```

The API will be available at **http://localhost:4000**.

### 2. Start the Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**.

> The frontend proxies API requests to `localhost:4000` via the `"proxy"` field in `frontend/package.json`, so no extra CORS configuration is needed in development.

---

## Quick Start (Docker)

```bash
docker-compose up --build
```

Task data is persisted in a named Docker volume (`task-data`), so it survives container restarts.

---

### Task object

```json
{
  "id": "uuid",
  "title": "Buy groceries",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### POST /tasks — Request body

```json
{ "title": "My new task" }
```

### PATCH /tasks/:id — Request body

Send one or both fields:

```json
{ "completed": true }
{ "title": "Updated title" }
{ "completed": true, "title": "Updated title" }
```

### Response envelope

All responses follow this shape:

```json
// Success list
{ "data": [...], "count": 3 }

// Success single
{ "data": { ...task } }

// Success delete
{ "message": "Task deleted successfully" }

// Error
{ "error": "Validation failed", "message": "title is required..." }
```

---

## Running Tests

Tests use Node's built-in test runner (no extra dependencies).

```bash
cd backend
npm test
```

The test suite spins up the server on port 4001 with an isolated temporary data file so it does not affect your real data.

**Coverage:**

- `GET /tasks` — list, filtering
- `POST /tasks` — creation, validation (missing title, empty, too long)
- `PATCH /tasks/:id` — complete, edit, 404, bad input
- `DELETE /tasks/:id` — delete, 404 on repeat

---

## Features

### Core

- [x] List all tasks
- [x] Add a task (with form validation + loading state)
- [x] Mark task as complete / incomplete
- [x] Delete a task
- [x] Loading and error states

### Bonus

- [x] **Filter** tasks — All / Active / Done
- [x] **Edit** task title inline
- [x] **Persist** tasks across restarts (JSON file in `backend/data/tasks.json`)
- [x] **Tests** — integration tests via `node:test`
- [x] **Docker** — `docker-compose up --build`

---

## Assumptions & Trade-offs

| Decision                       | Rationale                                                                                                                                             |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File-based persistence**     | Meets the "no database required" note. Simple, zero-dependency, survives restarts. A real app would use a proper database.                            |
| **`react-scripts` (CRA)**      | Minimal setup overhead for a time-boxed exercise. Vite would be faster to build, but adds nothing functionally.                                       |
| **No auth / multi-user**       | Out of scope; a single shared task list is assumed.                                                                                                   |
| **Filter applied server-side** | Keeps the frontend stateless and makes the filter query param genuinely useful rather than cosmetic.                                                  |
| **In-memory + file sync**      | Reads from disk once on startup; all mutations write back immediately. Good enough for a single-instance server; not suitable for horizontal scaling. |
| **`node:test` over Jest**      | Zero extra dependencies, ships with Node 18+, sufficient for integration-level tests.                                                                 |
| **Inline edit UX**             | Avoids a modal or separate route; keeps the interface simple and focused.                                                                             |
