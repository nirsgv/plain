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
          >Register</b-button
        >
      </form>
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
    };
  },
  methods: {
    ...mapActions("userStore", ["login"]),
    ...mapActions("routerStore", ["routeToRegister"]),
  },
};
</script>
<style scoped lang="scss">
a {
  position: relative;
}
.divider-text {
  display: flex;
  align-items: center;
  color: var(--silver-5);
  margin: 0.4rem 0;
  &:before,
  &:after {
    flex: 1;
    content: "";
    padding: 1px;
    background-color: var(--silver-3);
    margin: 5px;
  }
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
}

.register-btn {
  background: white;
  color: var(--emphasis);
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
  width: 100%;
  max-width: 40rem;
}

button {
  background-color: var(--emphasis);
  color: #fff;
}
</style>
