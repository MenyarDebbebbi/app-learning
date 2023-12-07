<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pa-16 d-flex flex-column align-items-center">
    <span class="text-semibold mb-10">Students management</span>

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

      <Popup type="student"/>
    </div>

    <div class="mt-10">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="students"
        :loading="isLoading"
        item-value="id"
        class="elevation-1 student-table rounded"
      >
      <template v-slot:item.phoneNumber="{ item }">
         <div v-if="item.phoneNumber">
            {{ item.phoneNumber }}
         </div>

         <div v-else>
            -
         </div>
        </template>

        <template v-slot:item.ville="{ item }">
         <div v-if="item.ville">
            {{ item.ville }}
         </div>

         <div v-else>
            -
         </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-5">mdi-pencil</v-icon>
          <v-icon @click="deleteStudent(item.user_id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Popup from "./popup.vue";
export default {
  name: "professor-students",
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
        { title: "Name", align: "center", key: "user_name" },
        { title: "Email", align: "start", key: "user_email" },
        { title: "Phone Number", align: "center", key: "user_phone" },
        { title: "City", align: "center", key: "ville" },
        { title: "", align: "end", sortable: false, key: "actions" },
      ],
    };
  },
  computed: {
    ...mapState(['studentList']),
    students() {
        return this.studentList?.data?.data;
    },
  },
  methods: {
    ...mapActions(["fetchStudentList", "deleteUser"]),
    applyFilters() {
      if (this.filters.id || this.filters.nameOrEmail) {
        alert(`${this.filters.id} ${this.filters.nameOrEmail}`);
      }
    },

    async deleteStudent(Id) {
        this.isLoading = true;
        await this.deleteUser(Id);

        await this.fetchStudentList().finally(() => this.isLoading = false)
    },
  },

  async created() {
    await this.fetchStudentList().finally(() => this.isLoading = false)
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
