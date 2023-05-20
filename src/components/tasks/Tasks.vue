<template>
  <div class="tasks">
  </div>
</template>

<script>

export default {
  name: "tasks",
  props: {
    msg: String,
  },
  methods: {
    addTask() {
      console.log('aasd')
    },
  },
};
</script>

<style scoped lang="scss">
.Login-bar {
  width: 100vw;
  background-color: #eee;
  position: fixed;
  top: 0;
  height: 3rem;
}
</style>