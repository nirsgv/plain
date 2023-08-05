import router from "@/router";

export default {
  namespaced: true,
  actions: {
    routeToLoginPage: () => {
      router.push({ path: "/login" });
    },
    routeToHomePage: () => {
      router.push({ path: "/" });
    },
    routeToRegister: () => {
      router.push({ path: "/register" });
    },
    routeToPath: ({ commit }, { path }) => {
      console.log(commit, path);
      router.push({ path: `/${path}` });
    },
  },
};
