import router from "@/router";
import {
  getUserTasks,
  editTask,
  addTask,
  deleteTask,
  getTask,
} from "@/services/service.js";
import { getRandomTaskTitle } from "@/helpers.js";

export default {
  namespaced: true,
  state: {
    tasks: [],
    tasksLoading: false,
    parentLevel: "",
    taskToFocus: null,
    adding: false,
  },
  getters: {
    tasks: (state) => state.tasks.sort((a, b) => a.position - b.position),
    tasksLoading: (state) => state.tasksLoading,
    parentLevel: (state) => state.parentLevel,
    taskToFocus: (state) => state.taskToFocus,
    adding: (state) => state.adding,
  },
  mutations: {
    SET_TASKS: (state, { tasks }) => {
      state.tasks = tasks;
    },
    UPDATE_TASK: (state, { task }) => {
      state.tasks = state.tasks.map((t) => (t.uid === task.uid ? task : t));
    },
    TOGGLE_RESOLVED: (state, { taskUid }) => {
      state.tasks = state.tasks.map((t) =>
        t.uid === taskUid ? { ...t, resolved: !t.resolved } : t
      );
    },
    ADD_TASK: (state, { task }) => {
      state.tasks = [...state.tasks, task];
    },
    REMOVE_TASK: (state, { taskUid }) => {
      state.tasks = state.tasks.filter((task) => task.uid !== taskUid);
    },
    SET_TASKS_LOADING: (state, { isLoading }) => {
      state.tasksLoading = isLoading;
    },
    SET_PARENT_LEVEL: (state, { parentLevel }) => {
      state.parentLevel = parentLevel || "";
    },
    NEXT_TO_FOCUS: (state, { uid }) => {
      state.taskToFocus = uid || "";
    },
    SET_ADDING: (state, { isAdding }) => {
      state.adding = isAdding;
    },
    SET_AUTHENTICATED: (state) => {
      state.authenticated = true;
    },
    DEAUTHENTICATE: (state) => {
      state.authenticated = false;
    },
    SET_USER: (state, user) => {
      console.log({ user });
      state.user = { ...user.data };
    },
    UPDATE_TASK_POSITIONS: (state, { updatedTasks }) => {
      state.tasks = updatedTasks;
    },
  },
  actions: {
    setTasks: ({ commit }, { tasks }) => {
      commit("SET_TASKS", { tasks });
    },
    loadTasks: async ({ commit }, { userId, taskUid = "" }) => {
      commit("SET_TASKS_LOADING", { isLoading: true });
      const tasks = await getUserTasks({ userId, taskUid });
      const level = await getTask({ userId, taskUid });
      const parentLevel = level?.parent_task_uid;
      commit("SET_PARENT_LEVEL", { parentLevel });
      commit("SET_TASKS", { tasks });
      commit("SET_TASKS_LOADING", { isLoading: false });
    },
    editTask: async ({ commit }, { taskUid, updates }) => {
      const { data } = await editTask({ taskUid, updates });
      commit("UPDATE_TASK", { task: data.data });
    },
    addTask: async ({ commit }, { userId, parentTaskUid = null }) => {
      const title = getRandomTaskTitle();
      const { data } = await addTask({ userId, title, parentTaskUid });
      commit("ADD_TASK", { task: data.task });
      commit("NEXT_TO_FOCUS", { uid: data.task.uid });
    },
    addChildTask: async ({ commit }, { userId, parentTaskUid }) => {
      const title = getRandomTaskTitle();
      const { data } = await addTask({ userId, title, parentTaskUid });
      commit("ADD_TASK", { task: data.data });
    },
    deleteTask: async ({ commit }, { taskUid }) => {
      await deleteTask({ taskUid });
      commit("REMOVE_TASK", { taskUid });
    },
    toggleResolved: async ({ commit }, { taskUid }) => {
      const { data } = await editTask({ taskUid, updates: { resolved: true } });
      commit("TOGGLE_RESOLVED", { taskUid: data.data.uid });
    },
    toggleUnresolved: async ({ commit }, { taskUid }) => {
      const { data } = await editTask({ taskUid, updates: { resolved: false } });
      commit("TOGGLE_RESOLVED", { taskUid: data.data.uid });
    },
    setAdding: ({ commit }, { isAdding }) => {
      commit("SET_ADDING", { isAdding });
    },
    persistTaskPosition: async ({ commit }, { taskUid, updates }) => {
      console.log({ taskUid, updates, commit });
      await editTask({
        taskUid,
        updates,
      });
    },
    updateTaskPositions: ({ commit }, updatedTasks) => {
      console.log(updatedTasks);
      commit("UPDATE_TASK_POSITIONS", { updatedTasks });
    },
    focusTask({ commit }, { ref }) {
      commit("NEXT_TO_FOCUS", { uid: null });
      ref && ref.focus();
      // ref && ref.select();
    },
    routeToPath: ({ commit }, { path }) => {
      console.log(commit, path);
      router.push({ path: `/${path}` });
    },
  },
};
