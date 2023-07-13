import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "@/_variables.scss";
import "@/main.scss";
import "@/animations.scss";
import "@/reset.scss";
import "buefy/dist/buefy.css";
import { filters } from "./filters.js";
import Unicon from "./unicons.js";
Vue.use(Unicon);

for (const [key, value] of Object.entries(filters)) {
  Vue.filter(key, value);
}

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
