<template>
  <div>
    <b-breadcrumb align="is-left">
      <b-breadcrumb-item tag="router-link" :to="`/${breadcrumb.parent_task_uid}`" v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.uid">{{ index ? breadcrumb.title : 'Home' }}</b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getBreadcrumbs } from "@/services/service.js"
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
    };
  },
  methods: {
    ...mapActions(["persistTaskPosition"]),
    async populateBreadcrumbs(to) {
      if (to) {
        try {
          const response = await getBreadcrumbs({
            uid: to,
          });
          this.breadcrumbs = response.data;
        } catch (error) {
          console.error(error);
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

<style lang="scss"></style>
