<template>
  <div class="child-tasks" :class="{ 'side-entrance': !titlesMap }">
    <div
      class="subtask-amount"
      v-if="!!subTaskAmt && !titlesMap && !loading"
      @click="fetchTasks"
    >
      <Badge :value="subTaskAmt" />
      <unicon name="list-ul" fill="currentColor"></unicon>
    </div>
    <!-- <b-skeleton size="is-small" :active="loading" v-if="loading"></b-skeleton> -->
    <b-loading
      size="is-small"
      :active="loading"
      v-if="loading"
      :is-full-page="false"
      class="child-tasks"
    >
    </b-loading>
    <div v-else-if="titlesMap" class="child-tasks side-entrance">
      <div class="icon-button" @click="titlesMap = null">
        <unicon name="arrow-left" fill="currentColor"></unicon>
      </div>

      <ul class="child-tasks-list ellipsis">
        <li v-for="(title, key) in titlesMap" :key="key" class="child-tasks-list-item ellipsis">
          <router-link :to="`/${parentUid}`"
            ><span>{{ title }}</span></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getTitles } from "@/services/service.js";
import Badge from "@/components/badge/Badge.vue";

export default {
  name: "ChildTasks",
  components: {
    Badge,
  },
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
  // watch: {
  //   uids: {
  //     handler: "fetchTasks", // Call fetchTasks whenever uids prop changes
  //     immediate: true, // Call fetchTasks immediately on component creation as well
  //   },
  // },
  computed: {
    subTaskAmt() {
      return this.uids.length;
    },
  },
  methods: {
    async fetchTasks() {
      if (this.uids.length) {
        this.loading = true;
        try {
          // await new Promise((res) => setTimeout(res, 10000));
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
<style lang="scss" scoped>
.b-skeleton {
  position: absolute;
  bottom: 0;
  height: 1.8rem;
  display: flex;
  align-items: center;
}
.b-skeleton.b-skeleton {
  width: 10rem;
  justify-content: center;
}
</style>

<style lang="scss">
.child-tasks,
.loading-overlay {
  position: absolute;
  bottom: 0;
  height: 1.8rem;
  display: flex;
  align-items: center;
}

.child-tasks {
  --margin: 0.5rem;
  width: 100%;
  font-size: 1.6rem;
  height: 4rem;
  li {
    display: inline-block;
    &:not(:first-child) {
      margin-left: var(--margin);
    }
    &:not(:last-child) {
      margin-right: var(--margin);
    }
    &.child-tasks-list-item {
      max-width: 5rem;
    }
  }
}
.subtask-amount,
.spinner {
  left: 0;
  cursor: pointer;
  font-size: 1.6rem;
}

.subtask-amount {
  position: relative;
  display: flex;
  align-items: center;
}

.side-entrance {
  animation: entrance;
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
}

.loading-overlay.is-active {
  justify-content: flex-start;
}

.child-tasks-list {
  font-size: 1.6rem;
  li a {
    color: #333;
  }
}
.unicon svg {
  color: var(--emphasis2);
}
</style>
