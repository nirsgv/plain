import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import About from "@/views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/about/:uid/:uid2",
    name: "About",
    props: true,
    component: About,
  },
  {
    path: "/login",
    name: "Login",
    props: route => ({ isLogin: route.name === 'Login' }),
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    props: route => ({ isRegister: route.name === 'Register' }),
    component: Register,
  },
  {
    path: "/:uid?",
    name: "Home",
    props: true,
    component: Home,
  },
];



const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_VUE_ROUTER_BASE,
  routes,
});
console.log({ VUE_APP_VUE_ROUTER_BASE: process.env.VUE_APP_VUE_ROUTER_BASE });
export default router;
