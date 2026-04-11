const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "API request failed");
  }
  return json;
}

export const api = {
  getTasks: (filter) => request(`/tasks${filter ? `?filter=${filter}` : ""}`),
  createTask: (title) =>
    request("/tasks", {
      method: "POST",
      body: JSON.stringify({ title }),
    }),
  updateTask: (id, data) =>
  request(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data)
  }),
  deleteTask: (id) =>
    request(`/tasks/${id}`, {
      method: "DELETE",
    }),
};
