<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ tasks }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  mounted() {
    this.loadTasks();
  },
  computed: {
    ...mapGetters(["tasks"]),
  },
  methods: {
    ...mapActions(["loadTasks"]),
  },

};
</script>
