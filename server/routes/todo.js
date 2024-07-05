const express = require("express");
const router = express.Router();
const {
  createTaskController,
  getTasksController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/todo");

router.post("/createTask", createTaskController);
router.get("/getTasks", getTasksController);
router.put("/updateTask", updateTaskController);
router.delete("/deleteTask", deleteTaskController);

module.exports = router;
