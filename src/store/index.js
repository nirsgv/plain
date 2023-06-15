import Vue from "vue";
import Vuex from "vuex";
import userStore from "./user";
import tasksStore from "./tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userStore,
    tasks: tasksStore,
  },
});
