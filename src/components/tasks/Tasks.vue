<template>
  <div v-if="user">
    <!-- {{ $refs }} -->
    <draggable
      tag="ul"
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
        :data-task-uid="task.uid"
      >
        <input
          type="text"
          v-model="task.title"
          class="title is-1 task__title"
          :class="{ resolved: task.resolved }"
          :ref="task.uid"
          @change="
            editTask({
              taskUid: task.uid,
              userId: user.uid,
              updates: { title: $event.target.value },
            })
          "
        />
        <ChildTasks :uids="task.child_task_uids" :parentUid="task.uid" />
        <TaskActions :task="task" />
      </li>
    </draggable>
  </div>
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
    ...mapGetters([
      "tasks",
      "user",
      "tasksLoading",
      "parentLevel",
      "taskToFocus",
    ]),
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
    ...mapActions([
      "announce",
      "editTask",
      "addTask",
      "deleteTask",
      "updateTaskPositions",
      "persistTaskPosition",
      "routeToPath",
      "focusTask",
    ]),

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
.tasks {
  .task {
    border-bottom: 1px solid #00000022;
    display: block;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: var(--border-color);

    &__title {
      margin-bottom: 0 !important;
      border: none;
      text-align: center;
      height: -webkit-fill-available;
      font-size: 3rem;
      outline: none !important;
      width: 100%;
      text-decoration-color: transparent;
      transition: color 0.6s ease-in, text-decoration-color 0.3s ease-in 0.5s;
    }
    &:hover .actions {
      opacity: 1;
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
  padding: 2em;
  font-size: 24px;
  font-family: Baskerville, Georgia, serif;
  line-height: 1.6em;
}

.dropped {
  animation: drop-animation cubic-bezier(0, 0.55, 0.45, 1);
  animation-fill-mode: forwards;
  animation-duration: 0.55s;
  animation-delay: 0;
  & > * {
    animation: blank-animation ease-out;
    animation-fill-mode: forwards;
    animation-duration: 0.05s;
    animation-delay: 0;
  }
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
  text-decoration-color: var(--border-color)!important;;
  color: #ccc !important;
  caret-color: var(--border-color);
  pointer-events: none;
}
</style>
