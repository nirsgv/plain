<template>
  <div class="login-wrap">
    <section class="login flex-center-all">
      <form
        action="/login"
        method="POST"
        @submit.prevent="
          register({
            name: fields[0].value,
            email: fields[1].value,
            password: fields[2].value,
          })
        "
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
        <b-button native-type="submit" class="submit-btn" type=""
          >Register</b-button
        >
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

export default {
  name: "Register",
  components: {},
  data() {
    return {
      fields: [
        {
          label: "Name",
          labelPosition: "on-border",
          name: "name",
          message: "",
          maxLength: 30,
          value: "",
        },
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
    ...mapActions("userStore", ["register"]),
    ...mapActions("routerStore", ["routeToLoginPage"]),
  },
};
</script>
