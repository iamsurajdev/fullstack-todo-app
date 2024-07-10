import { useState, useEffect } from "react";
import { Button, message, Select, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  addTaskApi,
  deleteTaskApi,
  getAllTasksApi,
  updateTaskApi,
} from "../../api/todoApis";
import AddEditTaskModal from "../../components/AddEditTaskModal";
import DeleteConformationModal from "../../components/DeleteConformationModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [addEditModal, setAddEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAllTasks = async () => {
    try {
      setLoading(true);
      const res = await getAllTasksApi();
      setTasks(res.data);
    } catch (error) {
      console.log("error", error);
      message.error("Something went wrong while fetching tasks");
    } finally {
      setLoading(false);
    }
  };

  const openAddEditModal = (data = null) => {
    if (data) {
      setSelectedTask(data);
    }
    setAddEditModal(true);
  };

  const closeAddEditModal = () => {
    setAddEditModal(false);
    setSelectedTask(null);
  };

  const openDeleteModal = (data = null) => {
    if (data) {
      setSelectedTask(data);
    }
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedTask(null);
    setDeleteModal(false);
  };

  const addTask = async (value) => {
    try {
      setLoading(true);
      const response = await addTaskApi(value);
      setTasks((prev) => [...prev, response.data]);
      closeAddEditModal();
      message.success("Task added");
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
      message.error("Something went wrong while adding task");
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (value, taskId = null) => {
    try {
      setLoading(true);
      const response = await updateTaskApi({
        ...value,
        taskId: taskId ? taskId : selectedTask?._id,
      });
      setTasks((prev) =>
        prev.map((i) => (i._id === response?.data?._id ? response?.data : i))
      );
      closeAddEditModal();
      message.success("Task updated");
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
      message.error("Something went wrong while updating task");
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async () => {
    try {
      setLoading(true);
      await deleteTaskApi(selectedTask?._id);
      setTasks((prev) => prev.filter((i) => i._id !== selectedTask?._id));
      closeDeleteModal();
      message.success("Task deleted");
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
      message.error("Something went wrong while deleting task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl text-center">Task Management</h1>
        <div className="my-6">
          <Button type="primary" block onClick={() => openAddEditModal()}>
            <PlusOutlined /> Add Task
          </Button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="mb-4 p-4 border rounded">
              <h2
                className={`text-2xl font-bold ${
                  task.status === "done" ? "line-through" : ""
                }`}
              >
                {task.title}
              </h2>
              <p className={`${task.status === "done" ? "line-through" : ""}`}>
                {task.description}
              </p>
              <div className="mt-2">
                <Button type="primary" onClick={() => openAddEditModal(task)}>
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  className="mx-3"
                  onClick={() => openDeleteModal(task)}
                >
                  Delete
                </Button>
                <Select
                  defaultValue={task.status}
                  style={{
                    width: 120,
                  }}
                  onChange={(value) => updateTask({ status: value }, task._id)}
                  options={[
                    {
                      value: "todo",
                      label: "To Do",
                    },
                    {
                      value: "inprogress",
                      label: "In Progress",
                    },
                    {
                      value: "done",
                      label: "Done",
                    },
                  ]}
                />
              </div>
            </li>
          ))}
        </ul>

        {addEditModal ? (
          <AddEditTaskModal
            open={addEditModal}
            onCancel={closeAddEditModal}
            editTaskData={selectedTask}
            addTask={addTask}
            updateTask={updateTask}
          />
        ) : null}

        {deleteModal && (
          <DeleteConformationModal
            title={"Delete content"}
            isOpen={deleteModal}
            onClose={closeDeleteModal}
            content={
              "Are you sure you want to delete this task. once deleted it can not be recovered"
            }
            onConform={deleteTask}
          />
        )}
      </div>
    </Spin>
  );
};

export default TaskList;
