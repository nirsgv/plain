<template>
  <div class="home" v-if="user">
    <Breadcrumbs :uid="uid" />
    <Tasks :uid="uid" />
    <CreateTask :uid="uid" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "../components/tasks/Tasks.vue";
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs.vue";
import CreateTask from "../components/createTask/CreateTask.vue";

export default {
  name: "Home",
  components: {
    Tasks,
    Breadcrumbs,
    CreateTask,
  },
  props: {
    uid: {
      type: String,
      default: "",
    },
  },
  watch: {
    uid: {
      handler: 'fetchTasks', // Call fetchTasks whenever uid prop changes
      immediate: true // Call fetchTasks immediately on component creation as well
    },
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
    fetchTasks() {
      if (this.authenticated && this.user) {
        this.loadTasks({ userId: this.user.uid, taskUid: this.uid });
      }
    },
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
