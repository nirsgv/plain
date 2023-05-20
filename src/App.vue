<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <LoginBar />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { LoginBar } from '@/components/index';
export default {
  name: "App",
  components: {
    LoginBar,
  },
  mounted() {
    !this.authenticated && this.routeToLoginPage();
  },
  computed: {
    ...mapGetters(["authenticated"]),
  },
  methods: {
    ...mapActions(["routeToLoginPage"]),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: inherit;
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
