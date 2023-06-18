<template>
  <header class="Login-bar">
    <div class="container">
      <h1 class="logo-type">TODO</h1>
      <div v-if="authenticated" class="logout">
        Hello {{ user.name }}
        <button @click="deauthenticate">Sign out</button>
      </div>
      <div v-else class="login">
        <router-link to="/login">Login</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters({
      authenticated: "userStore/authenticated",
      user: "userStore/user",
    }),
  },
  methods: {
    ...mapActions("userStore", ["deauthenticate"]),
  },
};
</script>

<style scoped lang="scss">
.Login-bar {
  width: 100vw;
  background-color: #fff;
  border-bottom: 1px solid var(--border-color);
  position: fixed;
  top: 0;
  height: 3rem;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: inherit;
    height: 100%;
    /* outline: 4px dashed red; */
  }
}
.logo-type {
  font-size: 100%;
  font-weight: normal;
  font-weight: 900;
  color: var(--border-color);
}
</style>
