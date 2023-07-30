<template>
  <header class="Login-bar">
    <div class="container">
      <h1 class="logo-type selection-disabled emphasis-text">TODO</h1>
      <div v-if="authenticated" class="status">
        Hello {{ user.name }}
        <b-button type="is-text" @click="logout">
          Sign out
        </b-button>
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
    ...mapActions("userStore", ["logout"]),
  },
};
</script>

<style scoped lang="scss">
.Login-bar {
  width: 100vw;
  background-color: var(--silver-1);
  /*border-bottom: 1px solid var(--silver-3);*/
  height: 6rem;
  padding: var(--header-padding);
  z-index: 20;
  position: relative;

  width: 100vw;
  background-color: var(--silver-1);
  /* border-bottom: 3px solid var(--silver-3); */
  height: 3rem;
  padding: var(--header-padding);
  z-index: 20;
  position: relative;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
}
.logo-type {
  font-size: 2rem;
  font-weight: 400;
}
.status {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
}
</style>
