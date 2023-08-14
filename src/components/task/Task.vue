<template>
  <div class="wrapper">
    <slot></slot>
    <div class="last-edited">
      <h6>Created {{ task.created_at | timeAgo }}</h6>
      <h6 v-if="task.last_updated_at">Edited {{ task.last_updated_at | timeAgo }}</h6>
    </div>
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
  font-family: var(--font-family);
  padding: 3.4rem 0 3rem;
  .wrapper {
    width: 100%;
  }
  .task {
    height: var(--taskHeight);
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: var(--lightsalmon);
    padding: var(--content-padding);
    border-radius: var(--task-border-radius);
    border: none!important;
    padding: 1rem;
    background: var(--white);
    margin-bottom: 1rem;
    background-color: var(--main-bkg);
    &__title {
      margin-bottom: 0 !important;
      border: none;
      text-align: center;
      height: -webkit-fill-available;
      font-size: var(--task-title-font-size);
      outline: none !important;
      width: 100%;
      text-decoration-color: transparent;
      transition: color 0.1s ease-in, text-decoration-color 0.05s ease-in 0.5s;
      font-family: inherit;
      caret-color: #333;
      font-weight: 400;
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
      height: 0;
      width: calc(100% - var(--task-border-radius));
      background-color: #eee;
      position: absolute;
      bottom: 0;
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

  .last-edited {
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 1rem;
    line-height: 1.4;
    user-select: none;
    color: var(--silver-4)
  }
}
</style>
