<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- {{ tasks }} -->
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  mounted() {
    this.announce({
      message: "Test message from Vue",
      type: "success",
    });
    this.loadTasks();
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapActions(["loadTasks", "announce"]),
  },

};
</script>
