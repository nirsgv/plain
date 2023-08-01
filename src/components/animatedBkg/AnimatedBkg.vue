<template>
  <section class="animated-bkg flex-center-all">
    <div v-html="spriter(5)" class="svg-wrap" />
  </section>
</template>

<script>
import { spriter } from "./spriter.js";
export default {
  name: "AnimativeBkg",
  props: {
    difference: {
      type: Number,
      default: 8,
    },
    value: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    position() {
      return `bottom: calc(100% - ${this.difference}px); left: calc(100% -  ${this.difference}px)`;
    },
  },
  data() {
    return {
      spriter,
    };
  },
};
</script>

<style lang="scss" scoped>
.animated-bkg {
  width: 100%;
  height: 100%;
  background: var(--emphasis);
  position: absolute;
}
</style>
