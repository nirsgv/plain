<template>
  <section class="sort-dropdown">
    <b-dropdown>
      <template #trigger="{ active }">
        <b-button
          label="Click me!"
          type="is-primary"
          :icon-right="active ? 'menu-up' : 'menu-down'"
        />
      </template>

      <b-dropdown-item>Action</b-dropdown-item>
      <b-dropdown-item>Another action</b-dropdown-item>
      <b-dropdown-item>Something else</b-dropdown-item>
    </b-dropdown>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SortDropdown",
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
  border-bottom: 1px solid #9a9a9a;
  position: fixed;
  top: 0;
  height: 3rem;
  padding: var(--header-padding);
  /* filter: contrast(80%) brightness(30%); */
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
  color: #4a4a4a;
}
</style>
