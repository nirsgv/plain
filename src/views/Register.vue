<template>
  <dialog class="register" open>
    <form
      action="/register"
      method="POST"
      @submit.prevent="submitRegisterDetails({ name, email, password })"
    >
      <b-field label="Email" horizontal>
        <b-input
          native-type="text"
          maxlength="30"
          name="name"
          v-model="name"
          required
        >
        </b-input>
      </b-field>
      <b-field label="Name" horizontal>
        <b-input
          native-type="text"
          maxlength="30"
          name="name"
          v-model="name"
          required
        >
        </b-input>
      </b-field>
      <b-field label="Password" horizontal>
        <b-input
          native-type="text"
          maxlength="30"
          name="password"
          v-model="password"
          required
        >
        </b-input>
      </b-field>
      <button type="submit">Register</button>
    </form>
    <a href="/login">Login</a>
  </dialog>
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
