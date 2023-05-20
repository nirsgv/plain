<template>
  <div class="tasks">
    <ul>
      <li v-for="task in tasks" :key="task.uid">
        <span>{{ task.title }}</span>
        <span>{{ task.status }}</span>
        <span>{{ task.uid }}</span>
      </li>
    </ul>
    <form>
      <Input />
      <button type="button" @click.prevent="addTask">Add Task</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "masks",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    addTask() {
      console.log('aasd')
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Login-bar {
  width: 100vw;
  background-color: #eee;
  position: fixed;
  top: 0;
  height: 3rem;
}
</style>

<!-- 
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PatternContent",
  components: {
    Bars,
    Title,
    Player,
    Instructions,
  },
  props: {
    id: [Number, String],
  },
  mounted() {
    this.loadTrack({ id: this.id });
  },
  computed: {
    ...mapGetters(["track"]),
  },
  methods: {
    ...mapActions(["loadTrack"]),
  },
  watch: {
    id: function () {
      this.loadTrack({ id: this.id });
    },
  }, -->
