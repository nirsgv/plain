<template>
  <div class="home">
    <Spinner :active="tasksLoading" :isFullPage="true" />
    <StickyPart :uid="uid" />
    <Tasks :uid="uid" />
    <CreateTask :uid="uid" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "@/components/tasks/Tasks.vue";
import CreateTask from "@/components/createTask/CreateTask.vue";
import StickyPart from "@/components/stickyPart/StickyPart.vue";
import Spinner from "@/components/spinner/Spinner.vue";

export default {
  name: "Home",
  components: {
    Tasks,
    CreateTask,
    StickyPart,
    Spinner,
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
    ...mapGetters(['isLoginModalOpen']),
    ...mapGetters({
      authenticated: "userStore/authenticated",
      user: "userStore/user",
    }),
    ...mapGetters("tasksStore", [
      "tasksLoading",
    ]),
  },
  methods: {
    ...mapActions("tasksStore", ["loadTasks"]),
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
  width: 100vw;
}
</style>
