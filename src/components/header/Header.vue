<template>
  <header>
    <div class="login-bar" :class="{'container': authenticated}">
      <h2 class="logo-type selection-disabled emphasis-text">TODOAPP</h2>
      <div v-if="authenticated" class="status">
        Hello {{ user.name }}
        <b-button type="is-text" @click="logout">
          Sign out
        </b-button>
      </div>
      <div v-else class="">
        <router-link to="/login">Login</router-link>
    </div>
  </div>
</header>

</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Header",
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
header {
  background-color: var(--silver-3);
  width: 100vw;
  height: var(--header-height);
  padding: var(--header-padding);
  z-index: 20;
  position: relative;
  & > div {
    height: inherit;
  }
}
.login-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo-type {
  font-size: 1.5rem;
  color: var(--white);
  letter-spacing: 0.6rem;
  font-weight: 700;
}
.status {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
}
</style>
