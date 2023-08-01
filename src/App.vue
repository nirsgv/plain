<template>
  <div id="app">
    <Header />
    <router-view />
    <Login v-if="isLoginModalOpen" />
    <Register v-if="isRegisterModalOpen" />
    <Spinner :active="loading" :isFullPage="false" />
  </div>
</template>

<script>
import { Header, Spinner } from "@/components/index";
import { mapGetters } from "vuex";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

export default {
  name: "App",
  components: {
    Header,
    Login,
    Register,
    Spinner,
  },
  computed: {
    ...mapGetters(["isLoginModalOpen", "isRegisterModalOpen"]),
    ...mapGetters("userStore", ["authenticating"]),
    ...mapGetters("tasksStore", ["tasksLoading"]),
    loading() {
      return this.authenticating || this.tasksLoading;
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: inherit;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
