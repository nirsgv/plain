<template>
  <section class="spinner" v-if="active">
    <b-loading :is-full-page="isFullPage" :active="active"></b-loading>
  </section>
</template>

<script>
export default {
  name: "Spinner",
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    isFullPage: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  ::v-deep {
    .loading-overlay {
      height: inherit;
      width: inherit;
      justify-content: center;

      .loading-icon {
        &:after {
          border: 2px solid var(--emphasis);
          border-right-color: transparent;
          border-top-color: transparent;
          width: 3rem !important;
          height: 3rem !important;
          top: -1.5rem !important;
          left: -1.5rem !important;
        }
      }
    }
  }
}
</style>
