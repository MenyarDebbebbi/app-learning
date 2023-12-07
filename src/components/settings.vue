<template>
  <v-container fluid class="px-12 py-8">
    <v-row>
      <v-img
        src="https://picsum.photos/1600/500"
        alt="Cover Photo"
        cover
        height="200"
        class="mb-4 cover-container"
      >
        <div class="overlay"></div>

        <v-avatar
          size="80"
          class="ml-4 mb-4"
          image="https://picsum.photos/200"
          style="position: absolute; bottom: 0; left: 0; border: 2px solid white;"
        >
          <img :src="user.profilePicture" alt="Profile Picture" />
        </v-avatar>
      </v-img>
    </v-row>

    <v-row>
      <v-col class="pa-4" cols="8">
        <v-card>
          <v-card-title class="headline d-flex justify-space-between">
            Profile Information
            <v-icon
            v-if="!isEditMode"
            size="22"
            color="#a2a2a2"
            @click="toggleEditMode"
            >
              mdi-pencil
            </v-icon>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text v-if="isStudent">
            <v-list class="w-50">
              <v-list-item
              v-for="(item, index) in studentViewData"
              :key="index+item.label"
              >
                  <v-list-item-title>{{ item.label }}:</v-list-item-title>
                  <div>
                  <v-list-item-subtitle v-if="!isEditMode && item.field !== 'user_verified'">{{ user[item.field] }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!isEditMode && item.field === 'user_verified' ">{{ this.user[item.field] ? 'Yes' : 'No' }}</v-list-item-subtitle>
                  <v-text-field v-else-if="isEditMode && item.editable" v-model="editData[item.field]"></v-text-field>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-text v-if="isProfessor">
            <v-list class="w-50">
              <v-list-item
              v-for="(item, index) in professorViewData"
              :key="index+item.label"
              >
                  <v-list-item-title>{{ item.label }}:</v-list-item-title>
                  <div>
                  <v-list-item-subtitle v-if="!isEditMode && item.field !== 'user_verified'">{{ this.user[item.field] }}</v-list-item-subtitle>
                  <v-list-item-subtitle v-if="!isEditMode && item.field === 'user_verified' ">{{ this.user[item.field] ? 'Yes' : 'No' }}</v-list-item-subtitle>
                  <v-text-field v-else-if="isEditMode && item.editable" v-model="editData[item.field]"></v-text-field>
                </div>
              </v-list-item>
            </v-list>
          </v-card-text>

          <v-card-actions v-if="isEditMode">
            <v-btn @click="toggleEditMode" class="bg-grey mx-5 mb-5 rounded">Cancel</v-btn>
            <v-btn @click="patchCurrentUser" class="bg-primary mb-5 rounded">Validate</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col class="pa-4" cols="4">
        <v-card>
          <v-card-title class="headline">Sidebar</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Coming soon
          </v-card-text>
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
      isEditMode: false,
      studentViewData: [
        { label: 'Name', field: 'user_name', editable: true },
        { label: 'Email', field: 'user_email', editable: true },
        { label: 'Phone number', field: 'user_phone', editable: true },
        { label: 'Student ID', field: 'student_id', editable: false },
        { label: 'Score' ,field: 'student_score', editable: false},
        { label: 'Score GPA', field: 'student_score_gpa', editable: false },
        { label: 'Verified', field: 'user_verified', editable: false},
        { label: 'Date joined', field: 'created_at', editable: false},
      ],
      professorViewData: [
        { label: 'Name', field: 'user_name', editable: true },
        { label: 'Email', field: 'user_email' , editable: true},
        { label: 'Phone number', field: 'user_phone' , editable: true },
        { label: 'Professor ID', field: 'professor_id' },
        { label: 'Rating' ,field: 'professor_rating'},
        { label: 'Verified', field: 'user_verified' },
        { label: 'Date joined', field: 'created_at' },
      ],
      editData: {
        user_name: "",
        user_email: "",
        user_phone: ""
      },
    };
  },
  computed: {
    ...mapState(['user']),
    isStudent() {
      return this.user?.user_type === "student";
    },
    isProfessor() {
      return this.user?.user_type === "professor";
    },
  },
  methods: {
    ...mapActions(['patchUser', 'fetchUser']),
    changeProfilePicture() {},
    saveProfileChanges() {},
    toggleEditMode() {
      !this.isEditMode ? this.editData = {
        user_name: this.user.user_name,
        user_email: this.user.user_email,
        user_phone: this.user.user_phone
      }
      : null
      this.isEditMode = !this.isEditMode;
    },
    async patchCurrentUser() {
      await this.patchUser(this.editData);

      this.toggleEditMode();
    },
  },
  async created() {
    await this.fetchUser();
  }
};
</script>

<style lang="scss" scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 25%,
    rgba(0, 0, 0, 0.1) 90%
  );
}
</style>
