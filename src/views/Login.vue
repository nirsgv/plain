<template>
  <div class="login">
    <form action="/login" method="POST" @submit.prevent="submitLoginDetails({ email, password })">
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>
      <button type="submin">Login</button>
    </form>
    <a href="/register">Register</a>
  </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(["submitLoginDetails"]),
  },
};
</script>
