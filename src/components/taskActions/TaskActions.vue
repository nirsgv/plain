<template>
  <div class="actions">
    <div
      class="icon-button"
      @click="
        toggleResolved({
          taskUid: task.uid,
          userId: user.uid,
          updates: { resolved: !task.resolved },
        })
      "
    >
      <unicon name="check" fill="currentColor"></unicon>
    </div>
    <div class="icon-button" @click="dropDelete({ taskUid: task.uid })">
      <unicon name="minus" fill="currentColor"></unicon>
    </div>
    <div
      class="icon-button"
      :class="{ disabled: !isBackActive }"
      @click="
        routeToPath({
          path: parentLevel,
        })
      "
    >
      <unicon name="angle-left" fill="currentColor"></unicon>
    </div>
    <div
      class="icon-button"
      v-if="task.child_task_uids.length"
      @click="
        routeToPath({
          path: task.uid,
        })
      "
    >
      <unicon name="angle-right" fill="currentColor"></unicon>
    </div>
    <div
      class="icon-button"
      v-else
      @click="
        addToCurrent({
          userId: user.uid,
          parentTask: task.uid,
          addToCurrent: false,
        })
      "
    >
      <unicon name="plus" fill="currentColor"></unicon>
    </div>
    <div class="drag-handle">
      <div class="icon-button">
        <unicon name="grip-horizontal-line" fill="currentColor"></unicon>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "TaskActions",
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTaskTitle: "",
      dropGroup: [],
    };
  },
  computed: {
    ...mapGetters(["tasks", "user", "tasksLoading", "parentLevel"]),
    isBackActive() {
      return this.$router.currentRoute.length > 1;
    },
  },
  created() {
    console.log(this.$router.currentRoute);
  },
  methods: {
    ...mapActions([
      "announce",
      "editTask",
      "addTask",
      "deleteTask",
      "updateTaskPositions",
      "persistTaskPosition",
      "routeToPath",
      "toggleResolved",
    ]),
    async addToCurrent({ userId, title, parentTask, addToCurrent }) {
      await this.addTask({ userId, title, parentTask, addToCurrent });
    },
    drop({ taskUid }) {
      this.dropGroup.push(taskUid);
    },
    dropDelete({ taskUid }) {
      this.drop({ taskUid });
      this.deleteTask({ userId: this.user.uid, taskId: taskUid });
    },
  },
};
</script>

<style lang="scss">
.icon-button {
  padding: 0;
  background-color: transparent;
  border-radius: 50%;
  height: 2rem;
  display: flex;
  align-items: center;
  width: 2rem;
  justify-content: center;
  color: var(--border-color);
  height: 100%;
  cursor: pointer;
  &:hover {
  }
  &.disabled {
    pointer-events: none;
    color: #ddd;
  }
}
</style>
