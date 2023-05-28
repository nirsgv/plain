import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "@/main.scss";
import "@/reset.scss";
import "buefy/dist/buefy.css";
import Unicon from "vue-unicons/dist/vue-unicons-vue2.umd";
import {
  uniMinus,
  uniCheck,
  uniTrash,
  uniGripHorizontalLine,
  uniDraggabledots,
  uniElipsisDoubleVAlt,
  uniCornerDownRightAlt,
  uniArrowDown,
  uniAngleDown,
  uniArrowRight,
  uniArrowLeft,
  uniCornerDownRight,
  uniExpandFromCorner,
} from "vue-unicons/dist/icons";
Unicon.add([
  uniMinus,
  uniCheck,
  uniTrash,
  uniGripHorizontalLine,
  uniDraggabledots,
  uniElipsisDoubleVAlt,
  uniCornerDownRightAlt,
  uniArrowDown,
  uniAngleDown,
  uniArrowRight,
  uniArrowLeft,
  uniCornerDownRight,
  uniExpandFromCorner,
]);
Vue.use(Unicon);

Vue.use(Buefy, {
  defaultIconPack: "fas",
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
