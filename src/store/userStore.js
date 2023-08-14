import {
  submitRegisterDetails,
  submitLoginDetails,
} from "@/services/service.js";

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: null,
    authenticating: false,
  },
  getters: {
    authenticated: (state) => state.authenticated,
    user: (state) => state.user,
    authenticating: (state) => state.authenticating,
  },
  mutations: {
    SET_AUTHENTICATED: (state) => {
      state.authenticated = true;
    },
    DEAUTHENTICATE: (state) => {
      state.authenticated = false;
    },
    SET_AUTHENTICATING: (state, { authenticating = false }) => {
      state.authenticating = authenticating;
    },
    SET_USER: (state, user) => {
      if (!user) state.user = null;
      else state.user = { ...user.data };
    },
  },
  actions: {
    register: async ({ commit, dispatch }, details) => {
      const response = await submitRegisterDetails(details);
      console.log(response);
      if (response.type === "success") {

        commit("SET_AUTHENTICATED");
        console.log({ response });
        await commit("SET_USER", { data: response.user });
        dispatch("routerStore/routeToHomePage", {}, { root: true });
        dispatch("tasksStore/uncoverWelcomeTasks", { userUid: response.user.uid }, { root: true });
        dispatch("toastStore/registerWelcome", {}, { root: true });



      }
      commit("");
    },
    login: async ({ commit, dispatch }, details) => {
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
        dispatch("routerStore/routeToHomePage", {}, { root: true });
      }
    },
    logout: ({ commit, dispatch }) => {
      commit("DEAUTHENTICATE");
      commit("SET_USER", null);
      dispatch("tasksStore/clearTasks", {}, { root: true });
      dispatch("routerStore/routeToLoginPage", {}, { root: true });
    },
  },
};
