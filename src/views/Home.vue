<template>
  <div class="home">
    <div v-if="user">
      <ul class="tasks">
        <li v-for="task in tasks" :key="task.uid" class="task">
          <input type="textarea" class="title is-1 task__title" @click="logTasks" v-model="task.title" @change="e => editTask({ taskUid: task.uid, value: e.target.value })" />
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
    this.authenticated && this.user?.data && this.loadTasks({ userId: this.user.data.uid })
  },
  computed: {
    ...mapGetters(["tasks", "authenticated", "user"]),
  },
  methods: {
    ...mapActions(["loadTasks", "announce", "editTask"]),
    addTask() {
      console.log("aasd");
    },
    logTasks() {
      console.log(this.tasks)
    },
    log({userId, value}) {
      console.log({userId, value})
    },
  },
};
</script>
<style scoped lang="scss">
.tasks {
  .task {
    border-bottom: 1px solid #00000022;
    display: block;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &__title {
      margin-bottom: 0;
      border: none;
      text-align: center;
      height: -webkit-fill-available;
    }
  }
}
</style>
