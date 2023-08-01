<template>
  <div class="login-wrap">
    <div class="animated-wrap flex-center-all">
      <AnimatedBkg />
    </div>
    <section class="login flex-center-all">
      <form
        action="/login"
        method="POST"
        @submit.prevent="login({ email, password })"
        class="form"
      >
        <b-field
          label="Email"
          label-position="on-border"
          label-for="email"
          message=""
        >
          <b-input
            value="johnsilver"
            maxlength="30"
            name="email"
            v-model="email"
            required
          ></b-input>
        </b-field>
        <b-field
          label="Password"
          label-position="on-border"
          label-for="password"
          message=""
        >
          <b-input
            value="johnsilver"
            maxlength="30"
            name="password"
            v-model="password"
            required
          ></b-input>
        </b-field>
        <b-button native-type="submit" class="submit-btn">Login</b-button>
      </form>
      <router-link to="/register">Register</router-link>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { AnimatedBkg } from "@/components";
export default {
  name: "Login",
  components: {
    AnimatedBkg,
  },
  data() {
    return {
      email: "",
      password: "",
      tasksDemo: {
        tasks: [
          {
            tags: [],
            parent_task_uid: "2987bcf1-6d11-4baf-9250-67589235d7c6",
            child_task_uids: ["01372a00-587b-451b-a36e-7750a529edc3"],
            resolved: false,
            archived: false,
            user_id: "3e8a29e2-1619-43b5-8bec-370c65e20d36",
            _id: "64b6a8cae42f5113afd44d25",
            title: "You have Some Todos",
            uid: "ba14a1c3-645d-46fb-8249-e7767748ee84",
            created_at: "2023-07-18T14:59:22.603Z",
            position: 16609,
            __v: 1,
            last_updated_at: "2023-07-27T10:55:35.088Z",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions("userStore", ["login"]),
  },
};
</script>
<style scoped lang="scss">
a {
  position: relative;
}
.login-wrap {
  min-height: inherit;
  display: flex;
}
.animated-wrap {
  min-height: inherit;
  position: relative;
  pointer-events: none;
}
::v-deep {
  .field-label {
    text-align: left;
  }
  .animated-bkg {
    .svg-wrap {
      height: 10rem;
      width: 10rem;

      svg {
        height: inherit;
        width: inherit;
      }
    }
  }
}

.animated-wrap,
.login {
  flex-basis: 50%;
}
.login {
  padding: 0 8rem;
}
.form {
  background-color: #ffffff;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

button {
  margin-top: 1.4rem;
  background-color: var(--emphasis);
  color: #fff;
}
</style>
