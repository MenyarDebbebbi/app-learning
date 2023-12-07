<template>
  <v-container class="d-flex justify-center">
    <v-row>
      <v-col cols="2">
        <v-select
          v-model="selectedCategory"
          variant="outlined"
          :items="listCategories"
          label="Select Category"
          item-title="label"
          item-value="cat_id"
          clearable
          @click:clear="clearSearchText"
        ></v-select>
      </v-col>

      <v-col cols="3">
        <v-text-field
          v-model="searchQuery"
          variant="outlined"
          label="Search"
          clearable
          @click:clear="clearSearchText"
        ></v-text-field>
      </v-col>

      <v-col>
        <v-btn size="x-large" color="#575757" @click="applyFilters">
          <template #default>
            <v-icon> mdi-magnify </v-icon>
          </template>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState , mapActions} from 'vuex'
export default {
  data() {
    return {
      listCategories:[],
      selectedCategory: "",
      searchQuery: "",
    };
  },
  computed: {
    ...mapState(['categories']),

  },
  methods: {
    ...mapActions(['fetchCategories']),
    getCategories() {

    return JSON.parse(JSON.stringify(this.categories));
    },
    clearSearchText() {
      this.applyFilters({
        selectedCategory: "",
        searchQuery: "",
      });
    },
    applyFilters() {
      this.$emit("apply-filters", {
        selectedCategory: this.selectedCategory,
        searchQuery: this.searchQuery,
      });
    },
  },
  async created() {
    await this.fetchCategories();
    this.listCategories = this.getCategories();
  }
};
</script>
