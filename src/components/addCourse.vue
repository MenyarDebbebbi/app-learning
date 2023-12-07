<template>
  <v-dialog v-model="isActive" width="40%">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        color="#575757"
        size="x-large"
        prepend-icon="mdi-plus"
      >
        <span style="font-size: 14px">Add a course</span>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card
        prepend-icon="mdi-plus-circle"
        :title="`Create a new course`"
        class="py-2 px-8"
      >
        <v-form ref="form">
          <div class="mt-5">
            <v-text-field
              v-model="name"
              label="Course Name"
              variant="outlined"
              :rules="[validationRules.required(name,'Name')]"
              required
             />
            <v-select
              v-model="categoryId"
              label="Category"
              variant="outlined"
              clearable
              :items="categoryItems"
              :rules="[validationRules.required(categoryId,'Category')]"
              item-value="cat_id"
              item-title="label"
              required
            ></v-select>
            <v-textarea
              v-model="description"
              variant="outlined"
              label="Description"
              :rules="[validationRules.required(description,'Description')]"
              required
            ></v-textarea>
            <v-text-field
              v-model="price"
              label="Price"
              type="number"
              variant="outlined"
              required
            ></v-text-field>
            <v-file-input
              v-model="image"
              label="Course Image"
              variant="outlined"
              accept="image/*"
              :multiple="false"
              :rules="[validationRules.imageRequired]"
              show-size
              @change="handleImageChange"
              required
            ></v-file-input>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="validate">Add Course</v-btn>
            <v-btn text="Close" @click="close"></v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      isActive: false,
      name: "",
      description: "",
      price: null,
      categoryId: "",
      image: [],
    };
  },
  computed: {
    ...mapState(["categories", "userId"]),
    validationRules() {
        return {
        required: (v,value) => !!v || `${value} is required!`,
        imageRequired: (v) => !!v[0] || !!v.length || `Must select an image!`
      };
    },
    categoryItems() {
      return this.categories;
    },
  },
  methods: {
    ...mapActions(["fetchCategories"]),
    async validate() {
      await this.$refs.form.validate().then((res) => {
        if (res.valid) {
          this.addCourse();
          this.isActive = false;
        }
      });
    },
    addCourse() {
      this.$emit("add-course", {
        name: this.name,
        description: this.description,
        price: this.price,
        categoryId: this.categoryId,
        image: this.image,
        professorId: this.userId,
      });

      this.name = "";
      this.description = "";
      this.price = null;
      this.categoryId = "";
      this.image = [];
    },
    handleImageChange() {},
    close() {
        this.isActive = false;
    }
  },
  async created() {
    await this.fetchCategories();
  },
};
</script>
