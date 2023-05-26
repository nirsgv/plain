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

const getUserTasks = async (userId) => {
  console.log(userId);
  const { data } = await axi.get(`${baseURL}/tasks/${userId}`);
  // await new Promise(resolve => setTimeout(resolve, 20));
  return data;
};

const submitRegisterDetails = async (details) => {
  console.log(details);
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
  console.log({ taskUid, updates });
  const { data } = await axi.post(`${baseURL}/tasks/edit`, {
    taskUid,
    updates,
  });
  console.log(data);
  return { data };
};

const addTask = async ({ userId, title, parentTask = null }) => {
  console.log({ userId, title, parentTask });
  const { data } = await axi.post(`${baseURL}/tasks/create`, {
    userId,
    title,
    parentTask,
  });
  console.log(data);
  return { data };
};

const deleteTask = async ({ taskId }) => {
  const { data } = await axi.delete(`${baseURL}/tasks/delete`, { taskId });
  console.log(data);
  return { data };
};

export {
  getTask,
  getUserTasks,
  submitRegisterDetails,
  submitLoginDetails,
  editTask,
  addTask,
  deleteTask,
};
