import Vue from "vue";
import Vuex from "vuex";
import { getTask } from "@/services/service.js";

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
  },
  modules: {},
});
