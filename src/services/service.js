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

const submitRegisterDetails = async (details) => {
  console.log(details)
  const { data, error } = await axi.post(`${baseURL}/register`, details);
  console.log(data, error);
  if (error) return error;
  return data;
};

const submitLoginDetails = async (details) => {
  const { data } = await axi.post(`${baseURL}/login`, details);
  console.log(data);
  return { data }
};

export { getTask, submitRegisterDetails, submitLoginDetails };
