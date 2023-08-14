<template>
  <div class="login-wrap">
    <section class="login flex-center-all">
      <section class="welcome">
        <h1>{{ fields[0].value }}</h1>
        <h3>{{ fields[1].value }}</h3>
      </section>
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
<style scoped lang="scss">
</style>
