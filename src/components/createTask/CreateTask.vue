<template>
  <b-button
    native-type="submit"
    :class="{ sticky }"
    @click.prevent="
      addToCurrent({
        userId: user.uid,
        title: newTaskTitle,
        parentTask: uid,
        addToCurrent: true,
      })
    "
    class="add-task__button flex-center-all shadow-light emphasis-text"
  >
    <unicon name="plus" fill="currentColor"></unicon>
  </b-button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChildTasks",
  data() {
    return {
      newTaskTitle: "",
      height: 0,
    };
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.updateButtonHeight();
  },
  computed: {
    ...mapGetters({
      user: "userStore/user",
    }),
    ...mapGetters("tasksStore", ["tasks"]),
    sticky() {
      console.log(this.height);
      return this.height < 150;
    },
  },
  methods: {
    ...mapActions("tasksStore", ["addTask"]),
    async addToCurrent({ userId, title, parentTask, addToCurrent }) {
      await this.addTask({ userId, title, parentTask, addToCurrent });
    },
    updateButtonHeight() {
      console.log("updateButtonHeight");
      const addButton = this.$refs.add;
      if (addButton) {
        this.height = addButton.getBoundingClientRect().height;
      }
    },
  },
  watch: {
    tasks() {
      this.updateButtonHeight();
    },
  },
};
</script>

<style lang="scss">
.add-task {
  flex-grow: 1;
  min-height: 0.1rem;
  &__button {
    width: var(--add-button-size) !important;
    height: var(--add-button-size) !important;
    border-radius: 50%!important;
    box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.05)!important;
    & > span {
      display: flex;
      flex-direction: column;
    }

    &.sticky {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
    }
    .unicon svg {
      transition: transform 0.1s ease-in-out;
    }
    &:hover {
      color: white;
    }
    &:active {
      .unicon svg {
        transform: rotate(-180deg);
      }
    }
    span {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }
}
</style>
