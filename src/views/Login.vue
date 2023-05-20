<template>
  <dialog class="login" open>
    <form
      action="/login"
      method="POST"
      @submit.prevent="submitLoginDetails({ email, password })"
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
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["submitLoginDetails"]),
  },
};
</script>
<style scoped lang="scss">
dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
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
