<template>
  <div class="about">
    <h2>about page</h2>
    <br />
    <h1>{{ uid }}</h1>
    <h1>{{ uid2 }}</h1>
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
    ...mapGetters("userStore", ["authenticated", "user"]),
  },
  methods: {
    ...mapActions(["loadTasks"]),
    logTasks() {
      console.log(this.tasks);
    },
  },
};
</script>
<style lang="scss">

</style>
