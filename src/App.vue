<template>
  <div id="app">
    <Header />
    <router-view />
    <Login v-if="isLoginModalOpen" />
    <Register v-if="isRegisterModalOpen" />
  </div>
</template>

<script>
import { Header } from "@/components/index";
import { mapGetters } from "vuex";
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';

export default {
  name: "App",
  components: {
    Header,
    Login,
    Register,
  },
  computed: {
    ...mapGetters(['isLoginModalOpen', "isRegisterModalOpen"]),
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
