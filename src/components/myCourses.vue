<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pa-16 d-flex flex-column align-items-center">
    <span class="text-semibold mb-10">Courses management</span>

    <div class="d-flex filter-container">
      <div class="d-flex w-50 mr-5">
        <v-text-field
          v-model="filters.id"
          label="ID"
          variant="outlined"
          class="mr-5"
        />
        <v-text-field
          v-model="filters.name"
          label="Name"
          variant="outlined"
          class="mr-5"
        />

        <v-select
          v-model="filters.category"
          class="mr-5"
          label="Category"
          variant="outlined"
          clearable
          :items="categoryItems"
          item-title="label"
          item-value="cat_id"
        />

        <v-btn size="x-large" color="#575757" @click="applyFilters">
          <template #default>
            <v-icon> mdi-magnify </v-icon>
          </template>
        </v-btn>
      </div>

      <AddCourse @add-course="(data) => handleAddCourse(data)" />
    </div>

    <div class="mt-10">
      <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="myCoursesItems"
        item-value="id"
        class="elevation-1 rounded"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-5" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(item.c_id)">mdi-delete</v-icon>
        </template>

        <template v-slot:item.cat_id="{ item,index }">
          <p>{{ getCategoryName(item,index) }}</p>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddCourse from "./addCourse.vue";

export default {
  name: "courseList",
  data() {
    return {
      myCoursesItems: this.myCourses,
      categoryItems: [],
      filters: {
        id: "",
        name: "",
        category: "",
      },
      itemsPerPage: 10,
      headers: [
        { title: "ID", align: "start", sortable: false, key: "c_id" },
        { title: "Name", align: "end", key: "name" },
        { title: "Description", align: "start", key: "description" },
        { title: "Price", align: "end", key: "price" },
        { title: "Creation date", align: "end", key: "created_at" },
        { title: "Category", align: "start", key: "cat_id" },
        { title: "", align: "end", sortable: false, key: "actions" },
      ],
    };
  },
  computed: {
    ...mapState(["myCourses", "categories"]),
  },
  methods: {
    ...mapActions([
      "addCourse",
      "getMyCourses",
      "fetchCategories",
      "deleteCourse",
    ]),
    getCategories() {
      return JSON.parse(JSON.stringify(this.categories));
    },
    fetchMyCourses() {
      return JSON.parse(JSON.stringify(this.myCourses));
    },

    getCategoryName(item) {
      const category = this.categoryItems.filter(
        (category) => category.cat_id === item.cat_id
      );
      return category[0].label;
    },
    applyFilters() {
      if (this.filters.id || this.filters.name) {
        alert(`${this.filters.id} ${this.filters.name}`);
      }
    },
    async deleteItem(id,index) {
      await this.deleteCourse(id);
        
        this.myCoursesItems.splice(index,1);
    },
    async handleAddCourse(courseData) {
      await this.addCourse(courseData);

      console.log(courseData)
      this.myCoursesItems.push({
        c_id: 'N/A',
        cat_id: courseData.categoryId,
        name: courseData.name,
        description: courseData.description,
        price: courseData.price,
        p_id: courseData.professorId,
        created_at: new Date()
      });
    },
  },
  async created() {
    await this.getMyCourses();
    await this.fetchCategories();
    this.myCoursesItems = this.fetchMyCourses();
    this.categoryItems = this.getCategories();
  },
  components: { AddCourse },
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
