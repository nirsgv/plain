<template>
  <span class="badge" :style="position">{{ value }}</span>
</template>

<script>
export default {
  name: "Badge",
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
      breadcrumbs: [],
      loading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.badge {
  align-items: center;
  display: inline-flex;
  border-radius: 1.2rem;
  font-size: 1.2rem;
  font-weight: 500;
  height: 1.6rem;
  justify-content: center;
  padding: 0px 4px;
  pointer-events: auto;
  position: absolute;
  text-align: center;
  white-space: nowrap;
  background: #fff;
  color: #222;
  font-family: monospace;
  border: 1px solid #ddd;
}
</style>
