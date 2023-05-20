<template>
  <div class="home">
    <div>
      <ul class="tasks">
        <li v-for="task in tasks" :key="task.uid" class="task">
          <h1 class="title is-1 task__title">Title 1</h1>

          <span>{{ task.title }}</span>
          <span>{{ task.status }}</span>
        </li>
      </ul>
      <form>
        <Input />
        <button type="button" @click.prevent="addTask">Add Task</button>
        <Tasks />
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "@/components";

export default {
  name: "Home",
  component: {
    Tasks,
  },
  mounted() {
    this.loadTasks();
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapActions(["loadTasks", "announce"]),
    addTask() {
      console.log("aasd");
    },
  },
};
</script>
<style scoped lang="scss">
.tasks {
  .task {
    border-bottom: 1px solid #00000022;
    display: block;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &__title {
      margin-bottom: 0;
    }
  }
}
</style>
