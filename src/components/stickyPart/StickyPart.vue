<template>
  <section class="sticky-part shadow-light" ref="sticky" :class="{ 'shadow': isSticky }">
    <div class="container flex">
      <Breadcrumbs :uid="uid" />
      <SortDropdown />
    </div> 
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs.vue";
import SortDropdown from "@/components/sortDropdown/SortDropdown.vue";

export default {
  name: "StickyPart",
  components: {
    Breadcrumbs,
    SortDropdown,
  },

  props: {
    uid: String,
  },
  data() {
    return {
      isSticky: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  computed: {
    ...mapGetters({
      authenticated: "userStore/authenticated",
      user: "userStore/user",
    }),
  },
  methods: {
    ...mapActions("userStore", ["deauthenticate"]),
    handleScroll() {
      const stickyElement = this.$refs.sticky;
      const stickyPosition = stickyElement.getBoundingClientRect().top;
      this.isSticky = stickyPosition <= 0;
    },
  },
};
</script>

<style scoped lang="scss">
.sticky-part {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background-color: var(--silver-1);
  padding: 1rem 0;
  transition: 0.1s ease-in-out;
  &.container {
    display: flex;
  }
}

.sort-dropdown {
}

</style>
