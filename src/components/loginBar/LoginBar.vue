<template>
  <div class="Login-bar">
    <div v-if="authenticated" class="logout">
      <button @click="deauthenticate">Sign out</button>
    </div>
    <div v-else class="login">
      <router-link to="/login">Login</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginBar",
  props: {
    msg: String,
  },
  computed: {
    ...mapGetters(["authenticated"]),
  },
  methods: {
    ...mapActions(["deauthenticate"])
  }

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
