<template>
  <div class="login-wrap">
    <div class="animated-wrap flex-center-all">
      <AnimatedBkg />
    </div>
    <section class="login flex-center-all">
      <form
        action="/login"
        method="POST"
        @submit.prevent="register({ name, email, password })"
        class="form"
      >
      <b-field
        label="User name"
        label-position="on-border"
        label-for="name"
        message=""
      >
        <b-input
          value="johnsilver"
          maxlength="30"
          name="email"
          v-model="name"
          required
        ></b-input>
      </b-field>
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
        <b-button native-type="submit" class="submit-btn" type="">Register</b-button>
        <div class="divider-text">OR</div>
        <b-button
          native-type="submit"
          type="is-text"
          class="register-btn"
          @click="routeToLoginPage"
          >Login</b-button
        >
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { AnimatedBkg } from "@/components";

export default {
  name: "Register",
  components: {
    AnimatedBkg,
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("userStore", ["register"]),
    ...mapActions("routerStore", ["routeToLoginPage"]),
  },
};
</script>
