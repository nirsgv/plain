<template>
  <section class="breadcrumb-wrap">
    <b-breadcrumb align="is-centered" v-if="!loading">
      <b-breadcrumb-item
        class="breadcrumb"
        tag="router-link"
        :to="`/${breadcrumb.parent_task_uid}`"
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.uid"
        >{{ index ? breadcrumb.title : "Home" }}</b-breadcrumb-item
      >
    </b-breadcrumb>
    <b-loading v-else :is-full-page="false" :active="loading"> </b-loading>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getBreadcrumbs } from "@/services/service.js";
export default {
  name: "Breadcrumbs",
  props: {
    uid: {
      type: String,
    },
  },
  computed: {
    ...mapGetters(["tasks", "user"]),
  },
  data() {
    return {
      breadcrumbs: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions(["persistTaskPosition"]),
    async populateBreadcrumbs(to) {
      if (to) {
        try {
          this.loading = true;
          const response = await getBreadcrumbs({
            uid: to,
          });
          this.breadcrumbs = response.data;
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  watch: {
    uid(to, from) {
      console.log({ to, from });
      this.populateBreadcrumbs(to);
    },
  },
};
</script>

<style lang="scss">
.breadcrumb {
  font-size: 1rem;
}

.breadcrumb-wrap {
  height: 4rem;
  position: relative;

}
</style>
