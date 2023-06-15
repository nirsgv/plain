<template>
  <div class="child-tasks" :class="{'side-entrance': !titlesMap}">
    <b-title size="is-6"
      class="subtask-amount"
      v-if="!!subTaskAmt && !titlesMap && !loading"
      @click="fetchTasks"
    >
      {{ subTaskAmt }} subtasks
    </b-title>
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

      <ul>
        <li v-for="(title, key) in titlesMap" :key="key">
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
  font-size: 1.2rem;
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
.subtask-amount,
.spinner {
  left: 0;
  cursor: pointer;
  font-size: 1rem;
}

.side-entrance {
  animation: entrance;
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
}

@keyframes entrance {
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.loading-overlay.is-active {
  justify-content: flex-start;
}
</style>
