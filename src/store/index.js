import Vue from "vue";
import Vuex from "vuex";
import { getTask, submitRegisterDetails, submitLoginDetails } from "@/services/service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  getters: {
    tasks: (state) => state.tasks,
  },
  mutations: {
    SET_TASKS: (state, { tasks }) => {
      state.tasks = tasks;
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
      console.log({registeredUser});
      commit("SET_TASKasdasd");
    },
    submitLoginDetails: async ({ commit }, details) => {
      const registeredUser = await submitLoginDetails(details);
      console.log({registeredUser});
      commit("SET_TASKasdasd");
    },
  },
  modules: {},
});
