import axios from "../config/axiosConfig";

export const getAllTasksApi = async (status = null) => {
  try {
    const response = await axios.get(
      status ? `/api/getTasks?status=${status}` : "/api/getTasks"
    );
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const addTaskApi = async (payload) => {
  try {
    const response = await axios.post("/api/createTask", payload);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const updateTaskApi = async (payload) => {
  try {
    const response = await axios.put("/api/updateTask", payload);
    return response;
  } catch (error) {
    throw Error(error);
  }
};

export const deleteTaskApi = async (taskId) => {
  try {
    const response = await axios.delete(`/api/deleteTask?taskId=${taskId}`);
    return response;
  } catch (error) {
    throw Error(error);
  }
};
