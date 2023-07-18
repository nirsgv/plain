<template>
  <b-button
    type="is-primary"
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
    class="add-task__button fixed-background-color"
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
  display: flex;
  justify-content: center;
  align-items: center;
  &__button {
    width: 7rem !important;
    height: 7rem !important;
    border-radius: 50%!important;
    /* background-color: #ffa07a !important; */

    & > span {
      display: flex;
      flex-direction: column;
    }
    &.sticky {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
    }
    &:hover {
      color: white;
    }

    span {
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }
  }
}
</style>
