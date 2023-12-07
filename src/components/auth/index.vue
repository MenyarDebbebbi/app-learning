<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Login v-if="isLogin" @toggle-mode="(value) => toggleLoginMode(value)" />
  <Register v-else @toggle-mode="(value) => toggleLoginMode(value)" />
</template>

<script>
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  components: {
    Login,
    Register,
  },
  data: () => ({
    isLogin: true,
  }),

  methods: {
    toggleLoginMode(value) {
      this.isLogin = value;
    },
  },
};
</script>
