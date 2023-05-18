import Vue from "vue";
import Vuex from "vuex";
import {
  getTask,
  submitRegisterDetails,
  submitLoginDetails,
} from "@/services/service.js";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueToast from "vue-toast-notification";

Vue.use(VueToast, {
  duration: 4000,
  dismissible: true,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    authenticated: false,
  },
  getters: {
    tasks: (state) => state.tasks,
    authenticated: (state) => state.authenticated,
  },
  mutations: {
    SET_TASKS: (state, { tasks }) => {
      state.tasks = tasks;
    },
    SET_AUTHENTICATED: (state) => {
      state.authenticated = true;
    },
  },
  actions: {
    setTasks: ({ commit }, { tasks }) => {
      commit("SET_TASKS", { tasks });
    },
    loadTasks: async ({ commit }) => {
      const tasks = await getTask();
      commit("SET_TASKS", { tasks });
    },
    submitRegisterDetails: async ({ commit }, details) => {
      const registeredUser = await submitRegisterDetails(details);
      console.log({ registeredUser });
      commit("");
    },
    submitLoginDetails: async ({ commit }, details) => {
      const registeredUser = await submitLoginDetails(details);
      if (registeredUser) {
        commit("SET_AUTHENTICATED");
        console.log(
          "iajsdoisjoiupjcdwoijc82ec08jwcdiojwcdpioj wkdcmpoiwcmpoimcwop powcmpomcw"
        );
      }
    },
    announce: async ({ commit }, { message, type }) => {
      console.log({ message, type, commit });
      Vue.$toast.open({
        message,
        type,
      });
    },
  },
  modules: {},
});
