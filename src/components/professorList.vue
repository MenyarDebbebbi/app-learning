<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pa-16 d-flex flex-column align-items-center">
    <span class="text-semibold mb-10">Professors management</span>

    <div class="d-flex filter-container">
      <div class="d-flex w-50 mr-5">
        <v-text-field
          v-model="filters.id"
          label="ID"
          variant="outlined"
          class="mr-5"
        />
        <v-text-field
          v-model="filters.nameOrEmail"
          label="Name/Email"
          variant="outlined"
          class="w-50 mr-5"
        />

        <v-btn size="x-large" color="#575757" @click="applyFilters">
          <template #default>
            <v-icon> mdi-magnify </v-icon>
          </template>
        </v-btn>
      </div>

      <Popup type="professor"/>
    </div>

    <div class="mt-10">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="professors"
        :loading="isLoading"
        item-value="id"
        class="elevation-1 student-table rounded"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-5">mdi-pencil</v-icon>
          <v-icon @click="deleteProfessor(item.user_id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Popup from "./popup.vue";
export default {
  name: "professorList",
  components: {
    Popup,
  },
  data() {
    return {
      filters: {
        id: "",
        nameOrEmail: "",
      },
      isLoading: true,
      itemsPerPage: 10,
      headers: [
        { title: "ID", align: "start", sortable: false, key: "user_id" },
        { title: "Name", align: "end", key: "user_name" },
        { title: "Email", align: "end", key: "user_email" },
        { title: "Phone Number", align: "end", key: "user_phone" },
        { title: "", align: "end", sortable: false, key: "actions" },
      ],
    };
  },
  computed: {
    ...mapState(["professorList"]),
    professors() {
      return this.professorList?.data?.data;
    },
  },
  methods: {
    ...mapActions(["fetchProfessorList", "deleteUser"]),
    applyFilters() {
      if (this.filters.id || this.filters.nameOrEmail) {
        alert(`${this.filters.id} ${this.filters.nameOrEmail}`);
      }
    },

    async deleteProfessor(Id) {
      this.isLoading = true;
      await this.deleteUser(Id);

      await this.fetchProfessorList().finally(() => {
        this.isLoading = false;
      });
    },
  },

  async created() {
    this.isLoading = true;
    await this.fetchProfessorList().finally(() => (this.isLoading = false));
  },
};
</script>

<style>
.filter-container {
  justify-content: space-between;
}
.grey-header {
  background-color: black !important;
}
</style>
