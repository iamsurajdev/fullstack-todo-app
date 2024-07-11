const Todo = require("../models/todo");

exports.createTaskController = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!["todo", "inprogress", "done"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const data = await Todo.create({
      title: title,
      description: description,
      status: status,
    });

    res.status(201).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
    });
  }
};

exports.getTasksController = async (req, res) => {
  const { status } = req.query;

  let filter = {};
  if (status) {
    filter.status = status;
  }

  try {
    const data = await Todo.find(filter);

    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
    });
  }
};

exports.updateTaskController = async (req, res) => {
  const { taskId, title, description, status } = req.body;

  if (title && title.trim() === "") {
    return res.status(400).json({ message: "Title cannot be empty" });
  }

  if (status && !["todo", "inprogress", "done"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const data = await Todo.findByIdAndUpdate(
      taskId,
      { title: title, description: description, status: status },
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
    });
  }
};

exports.deleteTaskController = async (req, res) => {
  const { taskId } = req.query;

  try {
    const task = await Todo.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json("Deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
    });
  }
};
