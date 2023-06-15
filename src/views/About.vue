<template>
  <div class="about">
    <b-title size="is-2">>about page</b-title>
    <br />
    <b-title size="is-1">{{ uid }}</b-title>
    <b-title size="is-1">{{ uid2 }}</b-title>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "About",
  props: {
    uid: {
      type: String,
      required: false,
    },
    uid2: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters("user", ["authenticated", "user"]),
  },
  methods: {
    ...mapActions("user", ["loadTasks"]),
    logTasks() {
      console.log(this.tasks);
    },
  },
};
</script>
<style lang="scss">

</style>
