/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueToast from "vue-toast-notification";
import router from "@/router";
// import VuexPersistence from 'vuex-persist'

// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   reducer: (state) => ({ navigation: state.navigation }), //only save navigation module
// });
import userStore from "./user";
import tasksStore from "./tasks";


Vue.use(VueToast, {
  duration: 4000,
  dismissible: true,
});

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
  },
  actions: {
    announce: async ({ commit }, { message, type }) => {
      console.log({ message, type, commit });
      Vue.$toast.open({
        message,
        type,
      });
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
  },
  modules: {
    user: userStore,
    tasks: tasksStore,
  },
  // plugins: [vuexLocal.plugin],
});
