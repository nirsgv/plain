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
    sortBy: "position", // position,
  },
  getters: {
    tasks: (state) => {
      if (state.sortBy === "position") {
        return [...state.tasks].sort((a, b) => a.position - b.position);
      } else if (state.sortBy === "created") {
        console.log('screated')
        return [...state.tasks].sort((a, b) => a.created_at - b.created_at);
      } else if (state.sortBy === "edited") {
        console.log('sedited')

        return [...state.tasks].sort((a, b) => {
          const aTimestamp = a.last_updated_at ? new Date(a.last_updated_at).getTime() : Date.now();
          const bTimestamp = b.last_updated_at ? new Date(b.last_updated_at).getTime() : Date.now();
          return aTimestamp - bTimestamp;
        });
      } else if (state.sortBy === "subtasks") {
          return [...state.tasks].sort(
          (a, b) => b.child_task_uids.length - a.child_task_uids.length
        );
      }
    },
    isSorting: (state) => state.sortBy !== "position",
    sortBy: (state) => state.sortBy,
    tasksLoading: (state) => state.tasksLoading,
    parentLevel: (state) => state.parentLevel,
    taskToFocus: (state) => state.taskToFocus,
    adding: (state) => state.adding,
  },
  mutations: {
    SET_TASKS: (state, { tasks }) => {
      state.tasks = tasks;
    },
    CLEAR_TASKS: (state) => {
      state.tasks = [];
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
      console.log('set')
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
    SET_SORT_BY: (state, { sortBy }) => {
      state.sortBy = sortBy;
    },
  },
  actions: {
    setTasks: ({ commit }, { tasks }) => {
      commit("SET_TASKS", { tasks });
    },
    clearTasks: ({ commit }) => {
      console.log('clear');
      commit("CLEAR_TASKS");
    },
    loadTasks: async ({ commit }, { userId, taskUid = "" }) => {
      commit("SET_TASKS_LOADING", { isLoading: true });
      // await new Promise(r => setTimeout(r, 120000));
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
      console.log(title);
      addToCurrent && commit("SET_ADDING", { isAdding: true });
      const t = title || getRandomTaskTitle();
      const response = await addTask({ userId, title: title || t, parentTask });
      const { uid } = response.data.task;
      if (parentTask) {
        await addRemoveChild({
          taskUid: parentTask,
          action: "add",
          childTaskUid: uid,
        });
      }
      if (addToCurrent) {
        commit("ADD_TASK", { task: { ...response.data.task, title: t } });
        commit("SET_ADDING", { isAdding: false });
      } else {
        dispatch(
          "routerStore/routeToPath",
          { path: parentTask },
          { root: true }
        );
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
    setSortBy: async ({ commit }, { sortBy }) => {
      commit("SET_SORT_BY", { sortBy });
    },
    uncoverWelcomeTasks: async ({ dispatch }, { userUid = "" }) => {
      dispatch("addTask", { userId: userUid, title: "Welcome! Your example list is sete45@e45 up", parentTask: null, addToCurrent: true });
      await new Promise((res) => setTimeout(res, 1000));
      dispatch("addTask", { userId: userUid, title: "Every item can have sub-items!", parentTask: null, addToCurrent: true });
      await new Promise((res) => setTimeout(res, 1000));
      dispatch("addTask", { userId: userUid, title: "Like this Grocery list", parentTask: null, addToCurrent: true });
    },
  },
};
