<template>
  <div class="register">
    <form action="/register" method="POST" @submit.prevent="submitRegisterDetails({ name, email, password })">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name" v-model="name" required>
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" name="password" v-model="password" required>
      </div>
      <button type="submit">Register</button>
    </form>
    <a href="/login">Login</a>
  </div>
</template>

<script>

import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(["submitRegisterDetails"]),
  },

};
</script>
