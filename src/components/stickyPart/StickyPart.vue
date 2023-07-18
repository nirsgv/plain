<template>
  <section class="sticky-part">
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
  computed: {
    ...mapGetters({
      authenticated: "userStore/authenticated",
      user: "userStore/user",
    }),
  },
  methods: {
    ...mapActions("userStore", ["deauthenticate"]),
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
  &.container {
    display: flex;
  }
}

.shodow {
  box-shadow: 0px 2px 7px 2px rgba(100, 100, 100, .2);
}
.sort-dropdown {
}

</style>
