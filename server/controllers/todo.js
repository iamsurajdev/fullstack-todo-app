const Todo = require("../models/todo");

exports.createTaskController = async (req, res) => {
  const { title, description, status } = req.body;
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
  try {
    const data = await Todo.find();

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

  try {
    const data = await Todo.findByIdAndUpdate(
      taskId,
      { title: title, description: description, status: status },
      { new: true }
    );

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
    await Todo.findByIdAndDelete(taskId);

    res.status(201).json("Deleted successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: error?.message || "Something went wrong",
    });
  }
};
