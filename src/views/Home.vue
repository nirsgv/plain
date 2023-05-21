<template>
  <div class="home">
    <div v-if="user">
      <ul class="tasks">
        <li v-for="task in tasks" :key="task.uid" class="task container ">
          <input
            type="text"
            class="title is-1 task__title"
            @click="logTasks"
            v-model="task.title"
            @change="
              (e) => editTask({ taskUid: task.uid, value: e.target.value })
            "
          />
          <div class="actions">
            <button>Resolve</button>
            <button>Archive</button>
          </div>
        </li>
      </ul>
      <form class="add-task" @submit.prevent="null">
        <b-input type="text" v-model="newTaskTitle" maxlength="30" />
        <button
          native-type="submit"
          type="button"
          @click.prevent="
            addTask({ userId: user.data.uid, title: newTaskTitle })
          "
          class="add-task__button"
        >
          Add Task
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Tasks from "@/components";

export default {
  name: "Home",
  component: {
    Tasks,
  },
  mounted() {
    this.authenticated &&
      this.user?.data &&
      this.loadTasks({ userId: this.user.data.uid });
  },
  data() {
    return {
      newTaskTitle: "",
    };
  },
  computed: {
    ...mapGetters(["tasks", "authenticated", "user"]),
  },
  methods: {
    ...mapActions(["loadTasks", "announce", "editTask", "addTask"]),
    logTasks() {
      console.log(this.tasks);
    },
  },
};
</script>
<style lang="scss">
.tasks {
  .task {
    border-bottom: 1px solid #00000022;
    display: block;
    height: 10rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &__title {
      margin-bottom: 0!important;
      border: none;
      text-align: center;
      height: -webkit-fill-available;
    }
    &:hover .actions {
      display: block;
    }
    .actions {
      position: absolute;
      bottom: 0;
      right: 0;
      /* display: none; */
    }
  }
}
.add-task {
  display: flex;
  margin: 2rem 5rem 0;
  .control {
    flex-grow: 1;
    input {
      height: 100%;
    }
  }
  &__button {
  }
}

.container {
  max-width: 34em;
  margin: 0 auto;
  padding: 2em;
  font-size: 24px;
  font-family: Baskerville, Georgia, serif;
  line-height: 1.6em;
}

/* Strikethrough */


.strikethrough {
  display: inline-block;
  position: relative;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.strikethrough:after {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  box-shadow: 0 1px rgba(255, 255, 255, 0.6);
  background: black;
  transform-origin: center left;
  animation: strikethrough .5s 0.5s cubic-bezier(0.55, 0, 0.1, 1) 1;
  animation-fill-mode: backwards;
  transition: transform 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* Little hover effect */

.strikethrough:hover {
  /* color: rgba(200, 0, 0, 1);
  background: rgba(255, 189, 182, 0.3); */
}

.strikethrough:hover:after {
  transform: scaleX(0);
  transform-origin: center right;
}

/* Keyframes for initial animation */

@keyframes strikethrough {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
