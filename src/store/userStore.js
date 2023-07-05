import {
  submitRegisterDetails,
  submitLoginDetails,
} from "@/services/service.js";
import router from "@/router";

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: null,
  },
  getters: {
    authenticated: (state) => state.authenticated,
    user: (state) => state.user,
  },
  mutations: {
    SET_AUTHENTICATED: (state) => {
      state.authenticated = true;
    },
    DEAUTHENTICATE: (state) => {
      state.authenticated = false;
    },
    SET_USER: (state, user) => {
      state.user = { ...user.data };
    },
  },
  actions: {
    register: async ({ commit, dispatch }, details) => {
      const user = await submitRegisterDetails(details);
      if (user.announce) {
        dispatch("announce", {
          message: user.announce.message,
          type: user.announce.type,
        });
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
    logout: ({ commit }) => {
      commit("DEAUTHENTICATE");
      commit("SET_USER", null);
    },
    routeToHomePage: () => {
      router.push({ path: "/" });
    },
  },
};
