<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-dialog width="40%">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="#575757"
        size="x-large"
        prepend-icon="mdi-plus"
      >
        Add {{ type }}
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-plus-circle"
        :title="`Create a ${type} account`"
        class="py-2 px-8"
      >
        <div class="mt-5">
          <v-text-field v-model="data.name" label="Name" variant="outlined" />
          <v-text-field v-model="data.email" label="Email" variant="outlined" />
          <v-text-field
            v-model="data.password"
            type="password"
            label="Password"
            variant="outlined"
          />
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" @click="isActive.value = false"></v-btn>

          <v-btn text="Add" :loading="isLoading" @click="validate(isActive)"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import { signup } from "@/actions/auth.js";

export default {
  props: {
    title: {
      default: "",
    },
    content: {
      default: "",
    },
    type: {
      default: "",
      required: true,
    },
  },
  data: () => ({
    isLoading: false,
    data: {
      name: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions(["fetchProfessorList", "fetchStudentList"]),
    async validate(isActive) {
      if (this.data.name && this.data.email && this.data.password) {
        this.isLoading = true;

        await signup({
          name: this.data.name,
          email: this.data.email,
          password: this.data.password,
          account_type: this.$props.type,
        }, false)
          .then(async () => {
             this.$props.type === 'student'
             ? await this.fetchStudentList()
             : await this.fetchProfessorList();
          }
          )
          .finally(() => {
            this.isLoading = false;
            isActive.value = false;
          });
      }
      
    },
  },
};
</script>
