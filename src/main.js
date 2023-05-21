import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "@/main.scss";
import "@/reset.scss";
import "buefy/dist/buefy.css";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
