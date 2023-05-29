/* eslint-disable no-debugger */
import axios from "axios";

const baseURL = "http://localhost:8000/api";

const axi = axios.create({
  baseURL,
  timeout: 1000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

const getTask = async () => {
  const { data } = await axi.get(`${baseURL}/tasks`);
  // await new Promise(resolve => setTimeout(resolve, 20));
  return data;
};

const getUserTasks = async (userId, list = "") => {
  console.log(userId);
  const params = { userId };
  if (list) {
    params.list = list;
  }
  const { data } = await axios.get(`${baseURL}/tasks`, { params });
  return data;
};

const submitRegisterDetails = async (details) => {
  const { data, error } = await axi.post(`${baseURL}/register`, details);
  console.log(data, error);
  if (error) return error;
  return data;
};

const submitLoginDetails = async (details) => {
  const { data } = await axi.post(`${baseURL}/login`, details);
  console.log(data);
  return { data };
};

const editTask = async ({ taskUid, updates }) => {
  const { data } = await axi.patch(`${baseURL}/tasks/edit`, {
    taskUid,
    updates,
  });
  console.log(data);
  return { data };
};

const addRemoveChild = async ({ taskUid, action, childTaskUid }) => {
  const { data } = await axi.patch(`${baseURL}/tasks/add-remove-child`, {
    taskUid,
    action,
    childTaskUid,
  });
  console.log(data);
  return { data };
};

const addTask = async ({ userId, title, parentTask = null }) => {
  const { data } = await axi.post(`${baseURL}/tasks/create`, {
    userId,
    title,
    parentTask,
  });
  return { data };
};

const deleteTask = async ({ taskId }) => {
  const { data } = await axi.delete(`${baseURL}/tasks/delete`, { taskId });
  return { data };
};

export {
  getTask,
  getUserTasks,
  submitRegisterDetails,
  submitLoginDetails,
  editTask,
  addRemoveChild,
  addTask,
  deleteTask,
};
