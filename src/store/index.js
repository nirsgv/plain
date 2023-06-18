/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import userStore from "./userStore.js";
import routerStore from "./routerStore.js";
import tasksStore from "./tasksStore.js";
import "vue-toast-notification/dist/theme-bootstrap.css";
import VueToast from "vue-toast-notification";
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
  namespaced: true,
  actions: {
    announce: async ({ commit }, { message, type }) => {
      console.log({ message, type, commit });
      Vue.$toast.open({
        message,
        type,
      });
    },
  },
  modules: {
    userStore,
    routerStore,
    tasksStore,
  },
  // plugins: [vuexLocal.plugin],
});
