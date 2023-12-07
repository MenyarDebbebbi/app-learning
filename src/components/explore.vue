<template>
  <div class="px-8 py-8">
    <v-row>
      <v-col cols="12">
        <banner :banner-data="bannerData" />
      </v-col>

      <CourseFilters @apply-filters="(filters) => applyFilters(filters)" />
  
      <v-col
        v-for="course in filteredCourses"
        :key="course.title"
        cols="12"
        md="4"
      >
        <course-card :course="course" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Banner from "@/components/banner.vue";
import CourseFilters from "@/components/courseFilters.vue";
import CourseCard from "@/components/courseCard.vue";

export default {
  components: {
    CourseCard,
    CourseFilters,
    Banner,
  },
  data() {
    return {
      filteredCourses: [],
      bannerData: {
        image:
          "https://cdn.pixabay.com/photo/2023/07/28/14/53/ai-generated-8155387_1280.png",
        title: "Explore Our Latest AI Courses",
        subtitle: "Unlock the Future with Artificial Intelligence",
        discount: 20,
        action: {
          text: "Discover Courses",
          handler: () => {
            console.log("Discover Courses clicked!");
          },
        },
      },
    };
  },
  computed: {
    ...mapState(['courses']),
    getCategories() {
      return this.categories;
    }
  },
  methods: {
    ...mapActions(['getCourses']),
    applyFilters(filters) {
  if (filters) {
    this.filteredCourses = this.courses
      .filter((course) => {
        const categoryMatch =
          !filters.selectedCategory ||
          course.cat_id === filters.selectedCategory;
        const searchMatch = course.name
          .toLowerCase()
          .includes(filters?.searchQuery?.toLowerCase() || "");

        return categoryMatch && searchMatch;
      })
      .slice(); 

  } else {
    this.filteredCourses = this.courses; 
  }
},

  },
  async created() {
    await this.getCourses();
    this.applyFilters();
  },
};
</script>
