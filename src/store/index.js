/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import {
  getUserTasks,
  submitRegisterDetails,
  submitLoginDetails,
  editTask,
  addTask,
  addRemoveChild,
  deleteTask,
  getTask,
} from "@/services/service.js";
import { getRandomTaskTitle } from "@/helpers.js";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueToast from "vue-toast-notification";
import router from "@/router";
// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   reducer: (state) => ({ navigation: state.navigation }), //only save navigation module
// });
import userStore from "./user";
// import tasksStore from "./tasks";


Vue.use(VueToast, {
  duration: 4000,
  dismissible: true,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    tasksLoading: false,
    authenticated: false,
    user: null,
    parentLevel: "",
    taskToFocus: null,
    adding: false,
  },
  getters: {
    tasks: (state) => state.tasks.sort((a, b) => a.position - b.position),
    tasksLoading: (state) => state.tasksLoading,
    authenticated: (state) => state.authenticated,
    user: (state) => state.user,
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
    submitRegisterDetails: async ({ commit, dispatch }, details) => {
      const user = await submitRegisterDetails(details);
      if (user.announce) {
        dispatch("announce", {
          message: user.announce.message,
          type: user.announce.type,
        });
      }
      commit("");
    },
    submitLoginDetails: async ({ commit, dispatch }, details) => {
      const response = await submitLoginDetails(details);
      if (response.announce) {
        dispatch("announce", {
          message: response.announce.message,
          type: response.announce.type,
        });
      } else if (!response.data.error) {
        commit("SET_AUTHENTICATED");
        console.log({ response });
        commit("SET_USER", response);
        dispatch("routeToHomePage");
      }
    },
    announce: async ({ commit }, { message, type }) => {
      console.log({ message, type, commit });
      Vue.$toast.open({
        message,
        type,
      });
    },
    deauthenticate: ({ commit }) => {
      commit("DEAUTHENTICATE");
      commit("SET_USER", null);
    },
    routeToLoginPage: () => {
      router.push({ path: "/login" });
    },
    routeToHomePage: () => {
      router.push({ path: "/" });
    },
    routeToPath: ({ commit }, { path }) => {
      console.log(commit, path);
      router.push({ path: `/${path}` });
    },
    editTask: async ({ commit }, { taskUid, updates }) => {
      console.log({ taskUid, updates });
      const { data } = await editTask({ taskUid, updates });
      // dispatch("loadTasks", { userId });
      console.log(commit, data)
      // commit("UPDATE_TASK", { task: data.data });
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
        dispatch("routeToPath", { path: parentTask });
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
      console.log(updatedTasks);
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
  modules: {
    user: userStore,
    // tasks: tasksStore,
  },
  // plugins: [vuexLocal.plugin],
});
