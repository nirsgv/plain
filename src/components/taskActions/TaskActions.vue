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
import { calculateDraggedPosition } from "@/helpers.js";
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
    ...mapGetters([
      "tasks",
      "user",
      "tasksLoading",
      "parentLevel",
      "taskToFocus",
    ]),
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
      "focusTask",
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
    async onDragEnd(event) {
      const [draggedTask, calcPosition] = calculateDraggedPosition({
        event,
        tasks: this.sortedTasks,
      });
      // Update the position of the dragged task in the database
      await this.persistTaskPosition({
        taskUid: draggedTask.uid,
        updates: { position: calcPosition },
      });
    },
  },
};
</script>

<style lang="scss">
</style>
