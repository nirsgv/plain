<template>
  <div class="Login-bar">
    <div v-if="authenticated" class="logout">logout</div>
    <div v-else class="login">login</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LoginBar",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["authenticated"]),
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
