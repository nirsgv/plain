<template>
  <section class="sort-dropdown">
    <b-dropdown :paddingless="true">
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
.sort-dropdown {
}

</style>
