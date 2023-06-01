<template>
  <ul v-if="titlesMap" class="child-tasks">
    <li v-for="(title, key) in titlesMap" :key="key">
      <router-link :to="`/${parentUid}`"><span>{{ title }}</span></router-link>
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
    }
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
        try {
          const response = await getTitles({
            uids: this.uids.filter((uid) => !!uid),
          });
          this.titlesMap = response.data;
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>
