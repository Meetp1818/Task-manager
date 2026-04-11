function validateCreateTask(req, res, next) {
  const { title } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      error: "Validation failed",
      message: "title is required and must be a non-empty string",
    });
  }

  if (title.trim().length > 200) {
    return res.status(400).json({
      error: "Validation failed",
      message: "title must be 200 characters or fewer",
    });
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { completed, title } = req.body;

  if (completed === undefined && title === undefined) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Request body must include at least one of: completed, title",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      error: "Validation failed",
      message: "completed must be a boolean",
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        error: "Validation failed",
        message: "title must be a non-empty string",
      });
    }
    if (title.trim().length > 200) {
      return res.status(400).json({
        error: "Validation failed",
        message: "title must be 200 characters or fewer",
      });
    }
  }

  next();
}

module.exports = { validateCreateTask, validateUpdateTask };
