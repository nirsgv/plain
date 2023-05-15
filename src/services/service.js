/* eslint-disable no-debugger */
import axios from "axios";

const axi = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 1000,
  headers: {'X-Requested-With': 'XMLHttpRequest'},
});

const getTask = async () => {
  const { data } = await axi.get(`http://localhost:8000/api/tasks`);
  // await new Promise(resolve => setTimeout(resolve, 20));
  return data;
};

export {
  getTask,
}