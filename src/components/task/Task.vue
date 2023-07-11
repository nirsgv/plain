<template>
  <div class="wrapper">
    <slot></slot>
    <ChildTasks :uids="task.child_task_uids" :parentUid="task.uid" />
    <TaskActions :task="task" @drop="(taskUid) => $emit('drop', taskUid)" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChildTasks from "@/components/childTasks/ChildTasks.vue";
import TaskActions from "@/components/taskActions/TaskActions.vue";
export default {
  name: "Tasks",
  components: {
    ChildTasks,
    TaskActions,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    user: {
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
    ...mapGetters("tasksStore", ["taskToFocus"]),
  },
  methods: {
    ...mapActions("tasksStore", [
      "announce",
      "addTask",
      "deleteTask",
      "updateTaskPositions",
      "persistTaskPosition",
      "focusTask",
    ]),
  },
};
</script>

<style lang="scss">
.tasks {
  --taskHeight: 14rem;
  .wrapper {
    width: 100%;
  }
  .task {
    display: block;
    height: var(--taskHeight);
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
        height: 0.2rem;
      }
    }
    &:after {
      content: "";
      height: 0.1rem;
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
</style>
