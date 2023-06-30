/* eslint-disable no-debugger */
import axios from "axios";

const baseURL = process.env.VUE_APP_VUE_API_BASE;
console.log({ VUE_APP_VUE_API_BASE: baseURL });
const axi = axios.create({
  baseURL,
  timeout: 5000,
  headers: { "X-Requested-With": "XMLHttpRequest" },
});

const getTask = async ({ userId, taskUid }) => {
  try {
    const { data } = await axi.get(`${baseURL}/task`, {
      params: { userId, taskUid },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    throw new Error("Failed to retrieve tasks.");
  }
};

const getUserTasks = async ({ userId, taskUid }) => {
  if (!userId) {
    throw new Error("userId is required");
  }

  const params = {
    userId,
    parentTaskUid: taskUid,
  };

  try {
    const { data } = await axi.get(`${baseURL}/tasks`, { params });
    return data;
  } catch (error) {
    const { status, statusText } = error.response;
    console.error(`Error retrieving user tasks: ${status} ${statusText}`);
    throw new Error(`${status} ${statusText}`);
  }
};

const submitRegisterDetails = async (details) => {
  try {
    const { data } = await axi.post(`${baseURL}/register`, details);
    return data;
  } catch (error) {
    console.error("Error submitting register details:", error);
    throw new Error("Failed to submit register details.");
  }
};

const submitLoginDetails = async (details) => {
  try {
    const { data } = await axi.post(`${baseURL}/login`, details);
    return { data };
  } catch (error) {
    console.error("Error submitting login details:", error);
    throw new Error("Failed to submit login details.");
  }
};

const editTask = async ({ taskUid, updates }) => {
  try {
    const { data } = await axi.patch(`${baseURL}/tasks/edit`, {
      taskUid,
      updates,
    });
    return { data };
  } catch (error) {
    console.error("Error editing task:", error);
    throw new Error("Failed to edit task.");
  }
};

const addRemoveChild = async ({ taskUid, action, childTaskUid }) => {
  try {
    const { data } = await axi.patch(`${baseURL}/tasks/add-remove-child`, {
      taskUid,
      action,
      childTaskUid,
    });
    return { data };
  } catch (error) {
    console.error("Error adding/removing child task:", error);
    throw new Error("Failed to add/remove child task.");
  }
};

const addTask = async ({ userId, title, parentTask = "" }) => {
  try {
    const { data } = await axi.post(`${baseURL}/tasks/create`, {
      userId,
      title,
      parentTask,
    });
    console.log({ data });
    return { data };
  } catch (error) {
    console.error("Error adding task:", error);
    throw new Error("Failed to add task.");
  }
};

const deleteTask = async ({ taskId }) => {
  try {
    const { data } = await axi.delete(`${baseURL}/tasks/delete`, {
      params: { taskId },
    });
    return { data };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task.");
  }
};

const getTitles = async ({ uids }) => {
  try {
    const { data } = await axi.get(`${baseURL}/tasks/titles/`, {
      params: { uids },
    });
    return { data };
  } catch (error) {
    console.error("Error retrieving task titles:", error);
    throw new Error("Failed to retrieve task titles.");
  }
};

const getBreadcrumbs = async ({ uid }) => {
  // await new Promise(r => setTimeout(r, 100000));
  try {
    const { data } = await axi.get(`${baseURL}/tasks/breadcrumbs/`, {
      params: { taskUid: uid },
    });
    return { data };
  } catch (error) {
    console.error("Error retrieving task titles:", error);
    throw new Error("Failed to retrieve task titles.");
  }
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
  getTitles,
  getBreadcrumbs,
};
