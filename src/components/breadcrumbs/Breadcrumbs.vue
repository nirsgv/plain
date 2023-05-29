<template>
  <b-breadcrumb align="is-left">
    <b-breadcrumb-item tag="router-link" to="/">Home</b-breadcrumb-item>
    <router-link to="/about">About</router-link>

    <b-breadcrumb-item tag="router-link" to="/about"
      >About</b-breadcrumb-item
    >
    <b-breadcrumb-item tag="router-link" to="/documentation/breadcrumb" active
      >Breadcrumb</b-breadcrumb-item
    >
  </b-breadcrumb>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Breadcrumbs",
  computed: {
    ...mapGetters(["tasks", "user"]),
  },
  methods: {
    ...mapActions(["persistTaskPosition"]),
  },
};
</script>

<style lang="scss"></style>
