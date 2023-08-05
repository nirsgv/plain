<template>
  <section class="animated-bkg flex-center-all">
    <div v-html="spriter(displayedIcon)" class="svg-wrap" @animationiteration="go"/>
  </section>
</template>

<script>
import { spriter } from "./spriter.js";
export default {
  name: "AnimativeBkg",
  data() {
    return {
      spriter,
      displayedIcon: 5,
    };
  },
  methods: {
    go() {
      console.log('go');
      this.displayedIcon = Math.floor(Math.random() * 30) + 1;
    }
  },
};
</script>

<style lang="scss" scoped>
.animated-bkg {
  width: 100%;
  height: 100%;
  background: var(--emphasis);
  position: absolute;
  .svg-wrap {
    animation: beat 10s ease-in-out infinite;
    height: 10rem;
    width: 10rem;

    svg {
      height: inherit;
      width: inherit;
    }
  }
}
</style>
