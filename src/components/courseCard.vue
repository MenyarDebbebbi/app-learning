<template>
  <v-card>
    <v-img
      src="https://via.placeholder.com/400x200"
      alt="Course Image"
      class="grey lighten-2"
      height="200px"
    ></v-img>

    <v-card-title>{{ course.name }}</v-card-title>

    <v-card-subtitle class="mb-2">{{ owner?.user_name }}</v-card-subtitle>

    <v-card-text>{{ course.description }}</v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <div class=" w-100 px-2 d-flex justify-space-between">
      <v-btn append-icon="mdi-arrow-top-right-bold-box-outline" @click="GoToDetails">
        Details
      </v-btn>

      <v-chip text color="primary">{{ `${course.price} TND` }}</v-chip>
    </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    owner: null,
    ownerId: null
    }
  },
  methods: {
    ...mapActions(['getUser']),
    GoToDetails() {
      this.$router.push(`courseDetails/${this.course.c_id}`);
    }
  },
  async created() {
    this.ownerId = this.course.p_id;
    this.owner = await this.getUser(this.ownerId);
  }
};
</script>
