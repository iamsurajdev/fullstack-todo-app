import React, { useState, useEffect } from "react";
import { Button, Select } from "antd";
import { getAllTasksApi } from "../../api/todoApis";
import AddEditTaskModal from "../../components/AddEditTaskModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [addEditModal, setAddEditModal] = useState(false);

  const fetchAllTasks = async () => {
    try {
      const res = await getAllTasksApi();
      setTasks(res.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const openAddEditModal = () => {
    setAddEditModal(!addEditModal);
  };

  const closeAddEditModal = () => {
    setAddEditModal(!addEditModal);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <Button type="primary" onClick={openAddEditModal}>
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
              <Button type="primary" onClick={() => {}}>
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
        <AddEditTaskModal open={addEditModal} onCancel={closeAddEditModal} />
      ) : null}
    </div>
  );
};

export default TaskList;
