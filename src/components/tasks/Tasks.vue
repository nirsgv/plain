<template>
  <div v-if="user">
    <ul class="tasks">
      <draggable
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
            class="title is-1 task__title"
            v-model="task.title"
            @change="
              editTask({
                taskUid: task.uid,
                userId: user.uid,
                updates: { title: $event.target.value },
              })
            "
          />
          <div class="actions">
            <div class="icon-button" @click="drop({ taskUid: task.uid })">
              <unicon name="check" fill="currentColor"></unicon>
            </div>
            <div
              class="icon-button"
              @click="deleteTask({ userId: user.uid, taskId: task.uid })"
            >
              <unicon name="minus" fill="currentColor"></unicon>
            </div>
            <div class="icon-button" @click="drop({ taskUid: task.uid })">
              <unicon name="corner-down-right" fill="currentColor"></unicon>
            </div>
            <div class="drag-handle">
              <div class="icon-button">
                <unicon
                  name="grip-horizontal-line"
                  fill="currentColor"
                ></unicon>
              </div>
            </div>
          </div>
        </li>
      </draggable>
    </ul>

    <form class="add-task" @submit.prevent="null">
      <b-input type="text" v-model="newTaskTitle" maxlength="30" />
      <button
        native-type="submit"
        type="button"
        @click.prevent="addTask({ userId: user.uid, title: newTaskTitle })"
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

export default {
  name: "Tasks",
  components: {
    draggable,
  },
  data() {
    return {
      newTaskTitle: "",
      dropGroup: [],
    };
  },
  computed: {
    ...mapGetters(["tasks", "user"]),
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
    ]),
    drop({ taskUid }) {
      this.dropGroup.push(taskUid);
    },
    async onDragEnd(event) {
      const draggedIndex = event.oldIndex;
      const targetIndex = event.newIndex;
      const draggedTask = this.sortedTasks[draggedIndex];
      const targetTask = this.sortedTasks[targetIndex];

      let calcPosition;

      if (targetIndex > draggedIndex) {
        // Dragging down
        if (targetIndex === this.sortedTasks.length - 1) {
          // If dragging to the last position, set the position as a higher value
          calcPosition = targetTask.position + 1;
        } else {
          // Calculate the new position as the average of the target and next task positions
          const nextTask = this.sortedTasks[targetIndex + 1];
          calcPosition =
            targetTask.position + (nextTask.position - targetTask.position) / 2;
        }
      } else if (targetIndex < draggedIndex) {
        // Dragging up
        if (targetIndex === 0) {
          // If dragging to the first position, set the position as a fraction of the second task's position
          const secondTask = this.sortedTasks[1];
          calcPosition = secondTask.position / 2;
        } else {
          // Calculate the new position as the average of the target and previous task positions
          const prevTask = this.sortedTasks[targetIndex - 1];
          calcPosition =
            prevTask.position + (targetTask.position - prevTask.position) / 2;
        }
      }

      calcPosition = parseFloat(calcPosition.toFixed(3));

      // Update the position of the dragged task
      draggedTask.position = calcPosition;

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
      outline: none!important;
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

.drag-handle {
  /* Style your drag handle element here */
}
.dragging {
  /* Style the dragging element here */
}
</style>
