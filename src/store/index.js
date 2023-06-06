/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import {
  // getTask,
  getUserTasks,
  submitRegisterDetails,
  submitLoginDetails,
  editTask,
  addTask,
  addRemoveChild,
  deleteTask,
  getTask,
} from "@/services/service.js";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueToast from "vue-toast-notification";
import router from "@/router";
// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   reducer: (state) => ({ navigation: state.navigation }), //only save navigation module
// });

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
  },
  getters: {
    tasks: (state) => state.tasks.sort((a, b) => a.position - b.position),
    tasksLoading: (state) => state.tasksLoading,
    authenticated: (state) => state.authenticated,
    user: (state) => state.user,
    parentLevel: (state) => state.parentLevel,
  },
  mutations: {
    SET_TASKS: (state, { tasks }) => {
      state.tasks = tasks;
    },
    ADD_TASK: (state, { task }) => {
      state.tasks =  [...state.tasks, task ];
    },
    REMOVE_TASK: (state, { taskUid }) => {
      state.tasks =  state.tasks.filter(task => task.uid !== taskUid);
    },
    SET_TASKS_LOADING: (state, { isLoading }) => {
      console.log(isLoading)
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
  },
  actions: {
    setTasks: ({ commit }, { tasks }) => {
      commit("SET_TASKS", { tasks });
    },
    loadTasks: async ({ commit }, { userId, taskUid = "" }) => {
      console.log('loadTasks', { userId, taskUid });
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

      const response = await editTask({ taskUid, updates });
      // dispatch("loadTasks", { userId });

      commit("SET_TASK", response);
    },
    addTask: async ({ commit, dispatch }, { userId, title, parentTask, addToCurrent = false }) => {
      console.log(parentTask);
      const response = await addTask({ userId, title, parentTask });
      console.log({response});
      const { uid } = response.data.task;
      if (parentTask) {
        await addRemoveChild({ taskUid: parentTask, action: 'add', childTaskUid: uid })
      }
      addToCurrent ? commit("ADD_TASK", { task: response.data.task }) : dispatch("routeToPath", { path: parentTask });
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
  },
  modules: {},
  // plugins: [vuexLocal.plugin],
});
