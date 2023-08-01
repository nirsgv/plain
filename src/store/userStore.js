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
    ROUTE_TO_HOME_PAGE: () => {
      router.push({ path: "/" });
    },
    ROUTE_TO_LOGIN_PAGE: () => {
      router.push({ path: "/login" });
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
      commit("ROUTE_TO_LOGIN_PAGE");
    },
    routeToHomePage: ({ commit }) => {
      commit("ROUTE_TO_HOME_PAGE");
    },
  },
};
