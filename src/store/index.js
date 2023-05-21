import Vue from "vue";
import Vuex from "vuex";
import {
  // getTask,
  getUserTasks,
  submitRegisterDetails,
  submitLoginDetails,
  editTask,
  addTask,
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
    authenticated: false,
    user: null,
  },
  getters: {
    tasks: (state) => state.tasks,
    authenticated: (state) => state.authenticated,
    user: (state) => state.user,
  },
  mutations: {
    SET_TASKS: (state, { tasks }) => {
      state.tasks = tasks;
    },
    SET_AUTHENTICATED: (state) => {
      state.authenticated = true;
    },
    DEAUTHENTICATE: (state) => {
      state.authenticated = false;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },

  },
  actions: {
    setTasks: ({ commit }, { tasks }) => {
      commit("SET_TASKS", { tasks });
    },
    loadTasks: async ({ commit }, { userId }) => {
      console.log({userId})
      const tasks = await getUserTasks(userId);
      console.log({tasks})
      commit("SET_TASKS", { tasks });
    },
    submitRegisterDetails: async ({ commit, dispatch }, details) => {
      const user = await submitRegisterDetails(details);
      if (user.announce) {
        dispatch('announce', { message: user.announce.message, type: user.announce.type })
      }
      commit("");
    },
    submitLoginDetails: async ({ commit, dispatch }, details) => {
      const response = await submitLoginDetails(details);
      if (response.announce) {
        dispatch('announce', { message: response.announce.message, type: response.announce.type })
      } else if (!response.data.error) {
        commit("SET_AUTHENTICATED");
        console.log({response})
        commit("SET_USER", response);
        dispatch('routeToHomePage');
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
      router.push({ path: '/login' });
    },
    routeToHomePage: () => {
      router.push({ path: '/' });
    },
    routeToPath: (path) => {
      router.push({ path: `'/${path}'` });
    },
    editTask: async ({ commit }, { taskUid, value }) => {
      console.log({ taskUid, value });

      const response = await editTask({ taskUid, value });
      commit("SET_TASK", response);
    },
    addTask: async ({ commit, dispatch }, { userId, title, parentTask }) => {
      const response = await addTask({ userId, title, parentTask });
      dispatch('loadTasks', { userId });
      console.log({response, commit});
    },
  },
  modules: {},
  // plugins: [vuexLocal.plugin],
});
