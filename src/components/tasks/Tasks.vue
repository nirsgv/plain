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
      >{{ task.resolved }}
        <input
          type="text"
          class="title is-1 task__title"
          :class="{ resolved: dropGroup.includes(task.uid) }"
          v-model="task.title"
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
        <div class="actions">
          <div
            class="icon-button"
            @click="
              editTask({
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
      </li>
    </draggable>

    <form class="add-task" @submit.prevent="null">
      <b-input type="text" v-model="newTaskTitle" maxlength="30" />
      <button
        native-type="submit"
        type="button"
        @click.prevent="
          addToCurrent({
            userId: user.uid,
            title: newTaskTitle,
            parentTask: uid,
            addToCurrent: true,
          })
        "
        class="add-task__button"
      >
        Add Task
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import draggable from "vuedraggable";
import ChildTasks from "@/components/childTasks/ChildTasks.vue";
// import { ref, $nextTick } from 'vue';
import { calculateDraggedPosition } from "@/helpers.js";
export default {
  name: "Tasks",
  components: {
    draggable,
    ChildTasks,
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
      caret-color: var(--border-color);
    }
    .actions {
      transition: all 0.1s ease-in-out;
      position: absolute;
      right: 0;
      display: flex !important;
      gap: 1rem;
      height: 100%;
      top: 0;
      align-items: center;
      opacity: 0;
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
.add-task {
  margin: 2rem 5rem 0;
  .control {
    flex-grow: 1;
    input {
      height: 100%;
    }
  }
  &__button {
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

.icon-button {
  padding: 0;
  background-color: transparent;
  border-radius: 50%;
  height: 2rem;
  display: flex;
  align-items: center;
  width: 2rem;
  justify-content: center;
  color: #ccc;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #888;
  }
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
  text-decoration-color: red;
  color: #ccc !important;
}
</style>
