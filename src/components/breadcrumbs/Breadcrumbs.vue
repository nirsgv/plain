<template>
  <section class="breadcrumb-wrap">
    <b-breadcrumb align="is-left" v-if="!loading">
      <b-breadcrumb-item class="breadcrumb" tag="router-link" :to="`/`">
        Hello {{ user.name }}
      </b-breadcrumb-item>
      <b-breadcrumb-item
        v-for="(breadcrumb, index) in breadcrumbs"
        class="breadcrumb"
        :tag="index === breadcrumbs.length - 1 ? 'span' : 'router-link'"
        :to="index !== breadcrumbs.length - 1 ? `/${breadcrumb.uid}` : null"
        :key="breadcrumb.uid"
      >
        {{ breadcrumb.title }}
      </b-breadcrumb-item>
    </b-breadcrumb>
    <b-loading v-else :is-full-page="false" :active="loading"></b-loading>
  </section>
</template>


<script>
import { mapGetters } from "vuex";
import { getBreadcrumbs } from "@/services/service.js";
export default {
  name: "Breadcrumbs",
  props: {
    uid: {
      type: String,
    },
  },
  computed: {
    ...mapGetters({
      authenticated: "userStore/authenticated",
      user: "userStore/user",
    }),
    ...mapGetters("tasksStore", ["tasks"]),
  },
  data() {
    return {
      breadcrumbs: [],
      loading: false,
    };
  },
  methods: {
    async populateBreadcrumbs(to) {
      if (!to) return this.breadcrumbs = [];
      else {
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

<style lang="scss" scoped>

.breadcrumb-wrap {
  position: relative;
  flex-grow: 1;
  a {
    color: #222;
   }
   .breadcrumb {
    font-size: 1.4rem;
    margin-bottom: 0;
  }
}

span {
  padding: 0 0.75em;
}
</style>
