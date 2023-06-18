<template>
  <form class="add-task" @submit.prevent="null" ref="add">
    <!-- <b-input type="text" v-model="newTaskTitle" maxlength="30" /> -->
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
      class="add-task__button"
    >
      <unicon name="plus" fill="currentColor"></unicon>
      Add Task
      <!-- {{ sticky }} -->
    </b-button>
  </form>
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
    ...mapGetters(["tasks"]),
    sticky() {
      console.log(this.height);
      return this.height < 150;
    },
  },
  methods: {
    ...mapActions(["addTask"]),
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
    width: 100%;
    height: 100% !important;
    background-color: #ffa07a !important;
    &.sticky {
      position: fixed;
      bottom: 0;
      right: 0;
      height: 3rem !important;

      /* width: 10rem; */
      animation: sticky;
      /* animation-duration: .1s; */
      animation-fill-mode: forwards;
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
@keyframes sticky {
  from {
    bottom: 0;
    right: 0;
    width: 100%;
  }
  to {
    bottom: 1rem;
    right: 1rem;
    width: 10rem;
  }
}
</style>
