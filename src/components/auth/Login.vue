<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="login-class">
    <v-card title="Sign in to Smarteducation" min-width="25%">
      <form @submit.prevent="submit">
        <v-text-field
          v-model="email"
          variant="outlined"
          label="E-mail"  
        ></v-text-field>

        <v-text-field
          v-model="password"
          variant="outlined"
          label="Password"
          type="password"
        />

        <v-btn
          class="me-4 bg-primary w-100 mb-4 rounded-xl"
          type="submit"
          :loading="isLoading"
          :disabled="!email && !password"
        >
          Sign in
        </v-btn>

        <div v-if="message"
        class="text-red mb-2 py-1 align-middle rounded-lg border border-error w-100 text-center"
        >
          {{ message }}
        </div>

        <span class="text-grey mb-2 text-12">
          Don't have an account?
          <a href="#" @click="toggleMode">Register</a>
        </span>
      </form>
    </v-card>
  </div>
</template>

<script>
import { signin } from "@/actions/auth.js";

export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      message: "",
    };
  },
  methods: {
    toggleMode() {
      this.$emit("toggleMode", false);
    },
    submit() {
          this.isLoading = true;
          signin({ email: this.email, password: this.password })
            .then((message) => {
              this.isLoading = false;
              this.message = message || 'something went wrong';
            })
            .catch((error) => {
              console.error(error);
              this.isLoading = false;
              this.message = "An error occurred during sign in.";
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
