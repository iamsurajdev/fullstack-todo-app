import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import { addTaskApi, getAllTasksApi, updateTaskApi } from "../../api/todoApis";
import AddEditTaskModal from "../../components/AddEditTaskModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [addEditModal, setAddEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchAllTasks = async () => {
    try {
      const res = await getAllTasksApi();
      setTasks(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const openAddEditModal = (data = null) => {
    if (data) {
      console.log("data", data);
      setSelectedTask(data);
    }
    setAddEditModal(!addEditModal);
  };

  const closeAddEditModal = () => {
    setAddEditModal(!addEditModal);
    setSelectedTask(null);
  };

  const addTask = async (value) => {
    try {
      const response = await addTaskApi(value);
      setTasks((prev) => [...prev, response.data]);
      closeAddEditModal();
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
    }
  };

  const updateTask = async (value) => {
    try {
      const response = await updateTaskApi({
        ...value,
        taskId: selectedTask?._id,
      });
      setTasks((prev) =>
        prev.map((i) => (i._id === response?.data?._id ? response?.data : i))
      );
      closeAddEditModal();
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button type="primary" onClick={() => openAddEditModal()}>
          Add
        </Button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-4 p-4 border rounded">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <div className="mt-2">
              <Button type="primary" onClick={() => openAddEditModal(task)}>
                Edit
              </Button>
              <Button type="primary" danger className="mx-3" onClick={() => {}}>
                Delete
              </Button>
              <Select
                defaultValue={task.status}
                style={{
                  width: 120,
                }}
                onChange={() => {}}
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
    </div>
  );
};

export default TaskList;
