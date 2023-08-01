<template>
  <div class="actions">
    <b-tooltip
      v-for="action in activeActions"
      :key="action.name"
      :label="action.tooltip"
      type="is-primary"
      position="is-bottom"
      :active="!!action.tooltip.length"
    >
      <div
        class="icon-button flex-center-all"
        @click="action.method"
        :class="{
          'drag-handle': action.name === 'drag',
          disabled: action.disabled,
        }"
      >
        <unicon :name="action.icon" fill="currentColor"></unicon>
      </div>
    </b-tooltip>
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
    ...mapGetters("tasksStore", ["tasks", "tasksLoading", "parentLevel"]),
    ...mapGetters({
      user: "userStore/user",
      isSorting: "tasksStore/isSorting",
    }),
    actions() {
      return {
        resolve: {
          name: "Check",
          icon: "check",
          tooltip: "Check",
          disabled: false,
          method: () => {
            this.toggleResolved({
              taskUid: this.task.uid,
              userId: this.user.uid,
              updates: { resolved: !this.task.resolved },
            });
          },
        },
        unresolve: {
          name: "Uncheck",
          icon: "history",
          tooltip: "Uncheck",
          disabled: false,
          method: () => {
            this.toggleResolved({
              taskUid: this.task.uid,
              userId: this.user.uid,
              updates: { resolved: !this.task.resolved },
            });
          },
        },
        archive: {
          name: "archive",
          icon: "minus",
          tooltip: "Remove",
          disabled: false,
          method: () => {
            this.$emit("drop", { taskUid: this.task.uid });
            this.dropDelete({ taskUid: this.task.uid });
          },
        },
        visitParent: {
          name: "visitParent",
          icon: "angle-left",
          tooltip: "View Parent Task",
          disabled: !this.task.parent_task_uid.length,
          method: () => {
            this.routeToPath({
              path: this.parentLevel,
            });
          },
        },
        visitChildren: {
          name: "visitChildren",
          icon: "angle-right",
          tooltip: "View Subtasks",
          disabled: this.task.resolved,
          method: () => {
            this.routeToPath({
              path: this.task.uid,
            });
          },
        },
        addChild: {
          name: "addChild",
          icon: "plus",
          tooltip: "Create Subtask",
          disabled: this.task.resolved,
          method: () => {
            this.addToCurrent({
              userId: this.user.uid,
              parentTask: this.task.uid,
              addToCurrent: false,
            });
          },
        },
        drag: {
          name: "drag",
          icon: "grip-horizontal-line",
          tooltip: "",
          disabled: this.isSorting,
          className: "drag-handle",
          method: () => {},
        },
      };
    },
    activeActions() {
      return [
        this.task.resolved ? this.actions.unresolve : this.actions.resolve,
        this.actions.archive,
        this.actions.visitParent,
        this.task.child_task_uids.length
          ? this.actions.visitChildren
          : this.actions.addChild,
        this.actions.drag,
      ];
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
      "toggleResolved",
    ]),
    async addToCurrent({ userId, title, parentTask, addToCurrent }) {
      console.log({ userId, title, parentTask, addToCurrent });
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
.actions {
  transition: all 0.1s ease-in-out;
  position: absolute;
  right: 0;
  display: flex !important;
  gap: 0.2rem;
  height: 100%;
  top: 0;
  align-items: flex-end;
  opacity: 1;
  padding-bottom: 0.5rem;
  opacity: 0;

  .task:hovered & {
    opacity: 1;
  }

  .b-tooltip.is-primary .tooltip-content {
    background: var(--white) !important;
    color: var(--black) !important;
    border-width: 0.1rem;
    border-color: var(--lightsalmon);
    border-style: solid;
    box-shadow: none;
    &:before {
      border-bottom-color: var(--lightsalmon)!important;
    }
  }
}

.icon-button {
  padding: 0;
  background-color: transparent;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  color: #bbb;
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
