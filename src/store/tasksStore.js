import {
  getUserTasks,
  editTask,
  addTask,
  addRemoveChild,
  deleteTask,
  getTask,
} from "@/services/service.js";
import { getRandomTaskTitle } from "@/helpers.js";
import "vue-toast-notification/dist/theme-bootstrap.css";

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
      state.tasks = state.tasks.map((t) => (t.uid === taskUid ? { ...t, resolved: !t.resolved } : t));
    },
    ADD_TASK: (state, { task }) => {
      state.tasks = [...state.tasks, task];
    },
    REMOVE_TASK: (state, { taskUid }) => {
      state.tasks = state.tasks.filter((task) => task.uid !== taskUid);
    },
    SET_TASKS_LOADING: (state, { isLoading }) => {
      console.log(isLoading);
      state.tasksLoading = isLoading;
    },
    UPDATE_TASK_POSITIONS: (state, { updatedTasks }) => {
      console.log(updatedTasks);
      state.tasks = updatedTasks;
    },
    SET_PARENT_LEVEL: (state, { parentLevel }) => {
      state.parentLevel = parentLevel || "";
    },
    NEXT_TO_FOCUS: (state, { uid }) => {
      state.taskToFocus = uid || "";
    },
    SET_ADDING: (state, { isAdding }) => {
      console.log(isAdding);
      state.adding = isAdding;
    },
  },
  actions: {
    setTasks: ({ commit }, { tasks }) => {
      commit("SET_TASKS", { tasks });
    },
    loadTasks: async ({ commit }, { userId, taskUid = "" }) => {
      console.log("loadTasks", { userId, taskUid });
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
      console.log(commit, data);
    },
    addTask: async (
      { commit, dispatch },
      { userId, title, parentTask, addToCurrent = false }
    ) => {
      addToCurrent && commit("SET_ADDING", { isAdding: true });
      const t = getRandomTaskTitle();
      const response = await addTask({ userId, title: title || t, parentTask });
      const { uid } = response.data.task;
      if (parentTask) {
        await addRemoveChild({
          taskUid: parentTask,
          action: "add",
          childTaskUid: uid,
        });
      }
      if (addToCurrent){
        commit("ADD_TASK", { task: { ...response.data.task, title: t } });
        commit("SET_ADDING", { isAdding: false });
      } else {
        dispatch("routerStore/routeToPath", { path: parentTask }, { root: true });
      }
      commit("NEXT_TO_FOCUS", { uid });
      return response.data.task;
    },
    deleteTask: async ({ commit }, { userId, taskId }) => {
      console.log({ userId, taskId });
      await deleteTask({ taskId });
      commit("REMOVE_TASK", { taskUid: taskId });
    },
    updateTaskPositions: ({ commit }, updatedTasks) => {
      commit("UPDATE_TASK_POSITIONS", { updatedTasks });
    },
    persistTaskPosition: async ({ commit }, { taskUid, updates }) => {
      console.log({ taskUid, updates, commit });
      await editTask({
        taskUid,
        updates,
      });
    },
    focusTask({ commit }, { ref }) {
      commit("NEXT_TO_FOCUS", { uid: null });
      ref && ref.focus();
      // ref && ref.select();
    },
    toggleResolved: async ({ commit }, { taskUid, updates }) => {
      commit("TOGGLE_RESOLVED", { taskUid });

      console.log({ taskUid, updates, commit });
      await editTask({
        taskUid,
        updates,
      });
    },
  },
};
