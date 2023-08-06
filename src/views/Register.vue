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
        <div class="divider-text">OR</div>
        <b-button
          native-type="submit"
          class="register-btn"
          @click="routeToRegister"
          >Login</b-button
        >
      </form>
    </section>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["submitRegisterDetails"]),
  },
};
</script>
