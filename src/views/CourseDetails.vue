<template>
  <v-container fluid class="px-12 py-8">
    <v-img src="https://via.placeholder.com/1600x600" alt="Course Image" height="400" />

    <v-row class="mt-4">
    <v-col md="8">
      <v-row>
        <v-col md="10">
          <v-card>
            <v-card-title class="headline">{{ course.name || '-' }}</v-card-title>
            <v-card-subtitle class="grey--text">{{
              owner?.user_name || '-'
            }}</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>{{ course.description || '-' }}</v-card-text>
            <v-card-actions>
              <div class="d-flex justify-space-between w-100">
                <div>
                  <v-chip class="mr-2">{{ course.price }} TND</v-chip>
                  <v-chip>{{ course.rating || '-' }} Ratings</v-chip>
                </div>

                <v-btn
                  @click="enroll"
                  color="success"
                  variant="outlined"
                  class="rounded-xl px-4"
                  >Enroll</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row mt-4>
        <v-col md="10">
          <v-card>
            <v-card-title class="headline">Community Comments</v-card-title>
            <v-divider></v-divider>

            <!-- Iterate through comments -->
            <v-list>
              <template v-if="course.comments">
                <v-list-item
                  v-for="comment in course.comments"
                  :key="comment.id"
                >
                  <div>
                    <v-list-item-title>{{ comment.user }}</v-list-item-title>
                    <v-list-item-subtitle>{{
                      comment.text
                    }}</v-list-item-subtitle>
                  </div>
                </v-list-item>
              </template>
              <v-list-item v-else>
                <div>No comments yet.</div>
              </v-list-item>
            </v-list>

            <!-- Add Comment Section -->
            <v-card-text>
              <v-textarea
                v-model="newComment"
                label="Your Comment"
                outlined
                rows="4"
              ></v-textarea>
              <v-btn @click="addComment" color="primary">Add Comment</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-col md="4">
      <!-- Keywords -->
      <v-card class="px-4">
        <v-card-title class="headline">Keywords</v-card-title>
        <v-divider></v-divider>
        <v-chip-group v-if="course.keywords" class="my-4">
          <v-chip v-for="keyword in course.keywords" :key="keyword">{{
            keyword
          }}</v-chip>
        </v-chip-group>

        <div v-else class="my-4"> 
          Coming soon
        </div>
      </v-card>

      <!-- Instructor Details -->
      <v-card v-if="owner" class="px-4 mt-5">
        <v-card-title class="headline">Instructor Details</v-card-title>
        <v-divider></v-divider>
        <div class="my-2">
          <v-avatar>
            <v-icon>mdi-account-circle-outline</v-icon>
          </v-avatar>
          <span>{{ owner.user_name || '-'}}</span>
          <v-card-text>{{ owner.bio || '-' }}</v-card-text>
        </div>
      </v-card>

      <!-- Course Duration -->
      <v-card class="px-4 mt-5">
        <v-card-title class="headline">Course Duration</v-card-title>
        <v-divider></v-divider>
            <v-chip color="secondary" class="my-4">{{ course.duration || '8 Weeks' }}</v-chip>
      </v-card>

      <!-- Progress Tracker -->
      <v-card class="px-4 mt-5">
        <v-card-title class="headline">Progress Tracker</v-card-title>
        <v-divider></v-divider>
        <div class="my-4">Coming soon</div>
      </v-card>
    </v-col>
</v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      owner: null,
      newComment: "",
    };
  },
  computed: {
    ...mapState(['course']),
  },
  methods: {
    ...mapActions(['getUser']),
    addComment() {
      console.log(this.course)
    },
    enroll() {
      console.log("Enrolling user in the course");
    },
  },
  async created() {
     this.owner = await this.getUser(this.course.p_id);
  }
};
</script>

<style scoped>
.headline {
  font-size: 18px;
  font-weight: 600;
}
.subtitle {
    font-size: 18px;
  font-weight: 600;
}
</style>
