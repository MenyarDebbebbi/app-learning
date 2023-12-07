<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-class">
    <v-card title="Create a smarteducation account" min-width="25%">
      <form @submit.prevent="submit">
        <v-text-field
          v-model="name"
          variant="outlined"
          maxLength="30"
          label="Name"
          :counter="30"
        ></v-text-field>

        <v-text-field
          v-model="email"
          variant="outlined"
          label="E-mail"
        ></v-text-field>

        <v-select
          v-model="accountType"
          variant="outlined"
          label="Account type"
          item-value="value"
          item-title="label"
          :items="accountTypes"
        ></v-select>

        <v-text-field
          v-model="password"
          variant="outlined"
          label="Password"
          type="password"
        />

        <v-text-field
          v-model="confirmPassword"
          variant="outlined"
          label="Confirm password"
          name="confPass"
          type="password"
        />

        <v-btn
          class="me-4 bg-primary w-100 mb-4 rounded-xl"
          type="submit"
          variant="outlined"
          :loading="isLoading"
        >
          Register
        </v-btn>

        <div v-if="message"
        class="text-red mb-2 py-1 align-middle rounded-lg border border-error w-100 text-center"
        >
          {{ message }}
        </div>

        <span class="text-grey mb-2 text-12"
          >Have an account? <a href="#" @click="toggleMode">Login</a></span
        >
      </form>
    </v-card>
  </div>
</template>

<script>
import { signup } from "@/actions/auth.js";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "professor",
      isLoading: false,
      message: "",
      accountTypes: [
      {value: 'professor', label: 'Professor'},
      {value: 'student', label: 'Student'}
    ]
    };
  },
  methods: {
    toggleMode() {
      this.$emit("toggleMode", true);
    },
    submit() {
          this.isLoading = true;
          signup({
             name: this.name,
             email: this.email,
             password: this.password,
             account_type: this.accountType,
            },true)
            .then((message) => {
              this.isLoading = false;
              this.message = message;
            })
            .catch((error) => {
              console.error(error);
              this.isLoading = false;
              this.message = "An error occurred during sign up.";
            });
        }
    }
};
</script>

<style lang="scss">
.login-class {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .v-card {
    padding: 1.2rem;
  }
}
</style>
