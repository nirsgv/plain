<template>
  <div v-if="user">
    <ul class="tasks">
      <draggable v-model="sortedTasks" @end="onDragEnd" group="taskGroup" handle=".drag-handle">
        <li v-for="task in sortedTasks" :key="task.uid" class="task container" :class="{ dropped: dropGroup.includes(task.uid) }">
          <input type="text" class="title is-1 task__title" v-model="task.title" @change="editTask({ taskUid: task.uid, userId: user.uid, updates: { title: $event.target.value } })" />
          <div class="actions">
            <div class="icon-button" @click="drop({ taskUid: task.uid })">
              <unicon name="check" fill="currentColor"></unicon>
            </div>
            <div class="icon-button" @click="deleteTask({ userId: user.uid, taskId: task.uid })">
              <unicon name="minus" fill="currentColor"></unicon>
            </div>
            <div class="drag-handle">
              <div class="icon-button">
                <unicon name="grip-horizontal-line" fill="currentColor"></unicon>
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
      "persistTaskPositions",
    ]),
    drop({ taskUid }) {
      console.log(this.dropGroup);
      this.dropGroup.push(taskUid);
    },
    startDrag(event) {
      event.preventDefault();
      event.stopPropagation();
      const draggableElement = event.target.closest('.draggable');
      if (draggableElement) {
        draggableElement.draggable = true;
        draggableElement.classList.add('dragging');
      }
    },

    async onDragEnd(event) {
      const draggedIndex = event.oldIndex;
      const droppedIndex = event.newIndex;

      const updatedTasks = [...this.sortedTasks];

      // Switch the positions of dragged and dropped tasks
      const draggedTask = {
        uid: updatedTasks[draggedIndex].uid,
        position: updatedTasks[draggedIndex].position,
      };
      const droppedTask = {
        uid: updatedTasks[droppedIndex].uid,
        position: updatedTasks[droppedIndex].position,
      };
      // Set the updated tasks to trigger the computed property setter
      this.sortedTasks = updatedTasks.map((item) => {
        if (item.uid === draggedTask.uid)
          return { ...item, position: droppedTask.position };
        else if (item.uid === droppedTask.uid)
          return { ...item, position: draggedTask.position };
        else return item;
      });
      this.persistTaskPositions({ draggedTask, droppedTask });
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
    &__title {
      margin-bottom: 0 !important;
      border: none;
      text-align: center;
      height: -webkit-fill-available;
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
