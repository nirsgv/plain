<template>
  <draggable
    tag="ul"
    v-if="user"
    class="tasks"
    :class="{ 'tasks--loading': tasksLoading }"
    v-model="sortedTasks"
    @end="onDragEnd"
    group="taskGroup"
    handle=".drag-handle"
  >
    <li
      v-for="task in tasks"
      :key="task.uid"
      class="task container"
      :class="{ dropped: dropGroup.includes(task.uid) }"
    >
      <Task :task="task" :user="user" @drop="(taskUid) => drop(taskUid)">
        <input
          type="text"
          v-model="task.title"
          :ref="task.uid"
          class="title task__title fixed-text-color ellipsis"
          :class="{ resolved: task.resolved }"
          @keyup.enter="
            editTask({
              taskUid: task.uid,
              userId: user.uid,
              updates: { title: $event.target.value },
            })
          "
          @change="
            editTask({
              taskUid: task.uid,
              userId: user.uid,
              updates: { title: $event.target.value },
            })
          "
        />
      </Task>
    </li>
    <li class="task container created" v-if="adding">
      <b-skeleton
        :animated="true"
        size="is-large"
        width="50%"
        position="is-centered"
      ></b-skeleton>
    </li>
  </draggable>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import Task from "@/components/task/Task.vue";
import { calculateDraggedPosition } from "@/helpers.js";
export default {
  name: "Tasks",
  components: {
    draggable,
    Task,
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      newTaskTitle: "",
      dropGroup: [],
    };
  },
  updated: function () {
    this.taskToFocus &&
      this.$refs[this.taskToFocus] &&
      this.focusTask({ ref: this.$refs[this.taskToFocus][0] });
  },
  computed: {
    ...mapGetters("tasksStore", [
      "tasks",
      "tasksLoading",
      "parentLevel",
      "taskToFocus",
      "adding",
    ]),
    ...mapGetters({
      user: "userStore/user",
    }),
    unresolved() {
      return this.tasks.filter((task) => !task.resolved);
    },
    sortedTasks: {
      get() {
        console.log(this.tasks);
        return this.tasks;
      },
      set(updatedTasks) {
        this.updateTaskPositions(updatedTasks);
      },
    },
  },
  methods: {
    ...mapActions("routerStore", ["routeToPath"]),
    ...mapActions("tasksStore", [
      "updateTaskPositions",
      "persistTaskPosition",
      "focusTask",
      "editTask",
    ]),

    drop({ taskUid }) {
      this.dropGroup.push(taskUid);
    },
    async onDragEnd(event) {
      const [draggedTask, calcPosition] = calculateDraggedPosition({
        event,
        tasks: this.sortedTasks,
      });
      await this.persistTaskPosition({
        taskUid: draggedTask.uid,
        updates: { position: calcPosition },
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  max-width: 34em;
  margin: 0 auto;
  font-size: 24px;
  line-height: 1.6em;
  flex-grow: 0;
}

.dropped,
.created {
  animation: drop-animation cubic-bezier(0, 0.55, 0.45, 1);
  animation-fill-mode: forwards;
  animation-duration: 0.5s;
  animation-delay: 0;
}

.dropped {
  & > * {
    animation: blank-animation ease-out;
    animation-fill-mode: forwards;
    animation-duration: 0.05s;
    animation-delay: 0;
  }
}

.created {
  animation-direction: reverse;
  animation-duration: 0.25s;
}

.blank {
  animation: blank-animation ease-out;
  animation-fill-mode: forwards;
}

.drag-handle {
  /* Style your drag handle element here */
}
.dragging {
  /* Style the dragging element here */
}

.resolved {
  text-decoration: line-through;
  text-decoration-color: #bbb !important;
  color: #ccc !important;
  /* caret-color: var(--lightsalmon); */
  pointer-events: none;
}
</style>
