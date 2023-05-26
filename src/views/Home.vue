<template>
  <div class="home">
    <Tasks v-if="user" />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "../components/tasks/Tasks.vue";

export default {
  name: "Home",
  components: {
    Tasks,
  },
  mounted() {
    this.authenticated &&
      this.user &&
      this.loadTasks({ userId: this.user.uid });
  },
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed: {
    ...mapGetters(["authenticated", "user"]),
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
