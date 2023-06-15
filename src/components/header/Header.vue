<template>
  <header class="Login-bar">
    <div class="container">
      <b-title size="is-1" class="logo-type">TODO</b-title>
      <div class="user-status">
        <div v-if="authenticated" class="logout">
          Hello {{ user.name }}
          <span @click="deauthenticate">Sign out</span>
        </div>
        <div v-else class="login">
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapGetters(["authenticated", "user"]),
  },
  methods: {
    ...mapActions(["deauthenticate"]),
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
.user-status {
  font-size: 1rem;
}
</style>
