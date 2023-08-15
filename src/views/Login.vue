<template>
  <div class="login-wrap">
    <section class="login flex-center-all flex-column">
      <header class="welcome">
        <h1>Welcome Back to <span class="app-title">TODO</span>.</h1>
        <ul class="bullets">
          <li>Explore endless organization with lists within lists within lists.</li>
          <li>Get back to what matters most with TODO's intuitive interface.</li>
          <li>Unlock the power of TODO to supercharge your daily efficiency.</li>
        </ul>
      </header>
      <form
        action="/login"
        method="POST"
        @submit.prevent="login({ email: fields[0].value, password: fields[1].value })"
        class="form"
      >
        <b-field
          v-for="(field, idx) in fields"
          :key="field.name"
          :label="field.label"
          :label-position="field.labelPosition"
          :label-for="field.name"
          :message="field.message"
        >
          <b-input
            :maxlength="field.maxLength"
            :name="field.name"
            :value="field.value"
            @input="updateFieldValue(idx, $event)"
            required
          />
        </b-field>

        <b-button native-type="submit" class="submit-btn">Login</b-button>
        <div class="divider-text">OR</div>
        <b-button
          native-type="submit"
          type="is-text"
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
export default {
  name: "Login",
  components: {
  },
  data() {
    return {
      fields: [
        {
          label: "Email",
          labelPosition: "on-border",
          name: "email",
          message: "",
          maxLength: 30,
          value: "",
        },
       {
          label: "Password",
          labelPosition: "on-border",
          name: "password",
          message: "",
          maxLength: 30,
          value: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions("userStore", ["login"]),
    ...mapActions("routerStore", ["routeToRegister"]),
    updateFieldValue(idx, value) {
      this.fields[idx].value = value;
    },
  },
};
</script>
<style lang="scss">
.welcome {
  max-width: 40rem;
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 1.4rem;
  h1 {
    font-size: 3rem;
    margin-bottom: .4rem;
  }
  h3 {

  }
  .app-title {
    font-weight: 800;
  }
  .bullets {
    list-style: disc;
    padding-left: 1.2em;
    margin-top: 1.4rem;
    li {
      margin-bottom: 1rem;
    }
  }
}
</style>
