<template>
  <b-skeleton size="is-small" :active="loading" v-if="loading"></b-skeleton>
  <ul v-else class="child-tasks">
    <li v-for="(title, key) in titlesMap" :key="key">
      <router-link :to="`/${parentUid}`"
        ><span>{{ title }}</span></router-link
      >
    </li>
  </ul>
</template>

<script>
import { getTitles } from "@/services/service.js";
export default {
  name: "ChildTasks",
  data() {
    return {
      titlesMap: null,
      loading: false,
    };
  },
  props: {
    uids: {
      type: Array,
      default: () => [],
    },
    parentUid: {
      type: String,
      default: "",
    },
  },
  watch: {
    uids: {
      handler: "fetchTasks", // Call fetchTasks whenever uids prop changes
      immediate: true, // Call fetchTasks immediately on component creation as well
    },
  },
  methods: {
    async fetchTasks() {
      if (this.uids.length) {
        this.loading = true;
        try {
          // await new Promise((res) => setTimeout(res, 100000));
          const response = await getTitles({
            uids: this.uids.filter((uid) => !!uid),
          });
          this.titlesMap = response.data;
        } catch (error) {
          console.error(error);
        }
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
.b-skeleton,
.child-tasks {
  position: absolute;
  bottom: 0;
  height: 2.4rem;
  display: flex;
  align-items: center;
}

.b-skeleton.b-skeleton {
  width: 10rem;
  justify-content: center;
}

.child-tasks {
  --margin: 0.5rem;
  li {
    display: inline-block;
    &:not(:first-child) {
      margin-left: var(--margin);
    }
    &:not(:last-child) {
      margin-right: var(--margin);
    }
  }
}
</style>
