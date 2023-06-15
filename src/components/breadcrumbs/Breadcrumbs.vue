<template>
  <section class="breadcrumb-wrap container" v-if="user">
    <b-breadcrumb align="is-left" v-if="!loading">
      <b-breadcrumb-item class="breadcrumb" tag="router-link" :to="`/`">
        Hello {{ user.name }}
      </b-breadcrumb-item>
      <template v-for="(breadcrumb, index) in breadcrumbs">
        <b-breadcrumb-item
          class="breadcrumb"
          :tag="index === breadcrumbs.length - 1 ? 'span' : 'router-link'"
          :to="index !== breadcrumbs.length - 1 ? `/${breadcrumb.parent_task_uid}` : null"
          :key="breadcrumb.uid"
        >
          {{ breadcrumb.title }}
        </b-breadcrumb-item>
      </template>
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
    ...mapGetters("tasks", ["tasks"]),
    ...mapGetters("user", ["user"]),
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

<style lang="scss">
.breadcrumb {
  font-size: 1rem;
}

.breadcrumb-wrap.container {
  position: relative;
  height: 4rem;
  width: 100%;
  flex-grow: 0;
}

span {
  padding: 0 0.75em;
}
</style>
