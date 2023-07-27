<template>
  <div class="login-wrap">
    <div class="tasks-wrap">
      <Tasks />
    </div>
    <dialog class="login" open>
      <form
        action="/login"
        method="POST"
        @submit.prevent="login({ email, password })"
        class="form"
      >
        <b-field label="Email" horizontal>
          <b-input
            type="email"
            maxlength="30"
            name="email"
            v-model="email"
            required
          >
          </b-input>
        </b-field>
        <b-field label="Password" horizontal>
          <b-input
            type="password"
            value="iwantmytreasure"
            password-reveal
            name="password"
            v-model="password"
            required
          >
          </b-input>
        </b-field>
        <b-button type="is-primary is-light" native-type="submit">Login</b-button>
      </form>
      <router-link to="/register">Register</router-link>
    </dialog>
  
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {Tasks} from "@/components"
export default {
  name: "Login",
  components: {
    Tasks,
  },
  data() {
    return {
      email: "",
      password: "",
      tasksDemo: {
        tasks: [{"tags":[],"parent_task_uid":"2987bcf1-6d11-4baf-9250-67589235d7c6","child_task_uids":["01372a00-587b-451b-a36e-7750a529edc3"],"resolved":false,"archived":false,"user_id":"3e8a29e2-1619-43b5-8bec-370c65e20d36","_id":"64b6a8cae42f5113afd44d25","title":"You have Some Todos","uid":"ba14a1c3-645d-46fb-8249-e7767748ee84","created_at":"2023-07-18T14:59:22.603Z","position":16609,"__v":1,"last_updated_at":"2023-07-27T10:55:35.088Z"}]
      }
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
.form {
  background-color: #ffffff;
  position: relative;
  position: relative;
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 36rem;
  margin-bottom: 1rem;
}

button {
  margin-top: 1.4rem;
}
</style>
