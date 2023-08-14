import Vue from "vue";
import Vuex from "vuex";
import userStore from "./userStore.js";
import routerStore from "./routerStore.js";
import tasksStore from "./tasksStore.js";
import toastStore from "./toastStore.js";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({ navigation: state.navigation }), //only save navigation module
});

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
  },
  getters: {
    isLoginModalOpen: (state) => state.isLoginModalOpen,
    isRegisterModalOpen: (state) => state.isRegisterModalOpen,
  },
  mutations: {
    SET_LOGIN_MODAL(state, value) {
      state.isLoginModalOpen = value;
      console.log({ state });
    },
    SET_REGISTER_MODAL(state, value) {
      state.isRegisterModalOpen = value;
    },
  },
  actions: {
    openLoginModal({ commit }) {
      console.log("openLoginModal");
      commit("SET_LOGIN_MODAL", true);
    },
    closeLoginModal({ commit }) {
      commit("SET_LOGIN_MODAL", false);
    },
    openRegisterModal({ commit }) {
      commit("SET_REGISTER_MODAL", true);
    },
    closeRegisterModal({ commit }) {
      commit("SET_REGISTER_MODAL", false);
    },
  },
  modules: {
    userStore,
    routerStore,
    tasksStore,
    toastStore,
  },
  plugins: [vuexLocal.plugin],
});
