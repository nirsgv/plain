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
      v-for="task in sortedTasks"
      :key="task.uid"
      class="task container"
      :class="{ dropped: dropGroup.includes(task.uid) }"
    >
      <input
        type="text"
        v-model="task.title"
        :ref="task.uid"
        class="title task__title ellipsis"
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
      <ChildTasks :uids="task.child_task_uids" :parentUid="task.uid" />
      <TaskActions :task="task" @drop="drop" />
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
import ChildTasks from "@/components/childTasks/ChildTasks.vue";
import TaskActions from "@/components/taskActions/TaskActions.vue";
import { calculateDraggedPosition } from "@/helpers.js";
export default {
  name: "Tasks",
  components: {
    draggable,
    ChildTasks,
    TaskActions,
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
      "announce",
      "editTask",
      "addTask",
      "deleteTask",
      "updateTaskPositions",
      "persistTaskPosition",
      "focusTask",
    ]),

    drop({ taskUid }) {
      this.dropGroup.push(taskUid);
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
.tasks {
  max-height: 100vh;
  overflow-y: auto;
  .task {
    display: block;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: var(--lightsalmon);
    background-color: var(--white);
    padding: var(--content-padding);
    &__title {
      margin-bottom: 0 !important;
      border: none;
      text-align: center;
      height: -webkit-fill-available;
      font-size: var(--task-title-font-size);
      outline: none !important;
      width: 100%;
      text-decoration-color: transparent;
      transition: color 0.6s ease-in, text-decoration-color 0.3s ease-in 0.5s;
    }
    &:hover {
      .actions {
       opacity: 1;
      }
      &:after {
        height: 0.1rem;
      }
    }
    &:after {
      content: "";
      height: 0.05rem;
      width: 100%;
      background-color: black;
      position: absolute;
      bottom: 0;
      background-attachment: fixed;
      background-size: cover;
      background-image: linear-gradient(
        180deg in oklab,
        oklch(78% 0.24 46) 0%,
        oklch(90% 0.5 115) 98% 98%
      );
    }
  }
  &--loading {
    .task {
      border-color: black;
      animation: bordercolor;
      animation-duration: 0.2s;
      animation-direction: alternate;
    }
  }
}

.container {
  max-width: 34em;
  margin: 0 auto;
  font-size: 24px;
  font-family: Baskerville, Georgia, serif;
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

@keyframes drop-animation {
  from {
    height: 10rem;
    padding: 2rem;
    opacity: 1;
  }
  to {
    height: 0;
    padding: 0;
    opacity: 0;
  }
}
@keyframes blank-animation {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes bordercolor {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.drag-handle {
  /* Style your drag handle element here */
}
.dragging {
  /* Style the dragging element here */
}

.resolved {
  text-decoration: line-through;
  text-decoration-color: var(--lightsalmon) !important;
  color: #ccc !important;
  caret-color: var(--lightsalmon);
  pointer-events: none;
}
</style>
