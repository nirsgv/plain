<template>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChildTasks",
  data() {
    return {
      newTaskTitle: "",
    };
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["authenticated", "user"]),
  },
  methods: {
    ...mapActions(["addTask"]),
    async addToCurrent({ userId, title, parentTask, addToCurrent }) {
      await this.addTask({ userId, title, parentTask, addToCurrent });
    },
  },
};
</script>

<style lang="scss">

</style>
