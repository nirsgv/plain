<template>
  <div class="actions">
    <b-tooltip
      v-for="action in activeActions"
      :key="action.name"
      :label="action.tooltip"
      type="is-primary is-light"
      position="is-bottom"
      :active="!!action.tooltip.length"
    >
      <div class="icon-button" @click="action.method" :class="action.className">
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
    ...mapGetters(["tasks", "user", "tasksLoading", "parentLevel"]),
    actions() {
      return {
        resolve: {
          name: "Check",
          icon: "check",
          tooltip: "Resolve",
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
          tooltip: "Unresolve",
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
          tooltip: "",
          method: () => {
            this.dropDelete({ taskUid: this.task.uid });
          },
        },
        visitParent: {
          name: "visitParent",
          icon: "angle-left",
          tooltip: "visitParent",
          method: () => {
            this.routeToPath({
              path: this.parentLevel,
            });
          },
        },
        visitChildren: {
          name: "visitChildren",
          icon: "angle-right",
          tooltip: "visitChildren",
          method: () => {
            this.routeToPath({
              path: this.task.uid,
            });
          },
        },
        addChild: {
          name: "addChild",
          icon: "plus",
          tooltip: "",
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
        this.task.child_task_uids.length ? this.actions.visitChildren : this.actions.addChild,
        this.actions.drag,
      ]
    },
    isBackActive() {
      return this.$router.currentRoute.path !== "/";
    },
  },
  created() {
    console.log(this.$router.currentRoute);
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
  },
};
</script>

<style lang="scss">
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

  .task:hovered & {
    opacity: 1;
  }
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
  color: var(--border-color);
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
