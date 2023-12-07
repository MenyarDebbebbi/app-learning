<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <v-navigation-drawer>
      <div class="pa-4">
        <div
        class="border px-2 py-2 rounded"
        >
          <div>
            <div class="w-100 d-flex items-center align-center mb-4">
              <div
              class="rounded-circle border d-flex items-center justify-center mr-3"
              style="height: 30px; width: 30px;"
              >
                <v-icon
                color="grey"
                >
                  mdi-account-outline
                </v-icon>
              </div>
  
              <span
              style="font-size: 14px; font-weight: 500;"
              >{{ getUserName }}</span>
            </div>
          </div>
  
          <v-chip
          style="background-color: #7804eca9; color: #ffffff; border: 1px solid #b152ff;font-size: 12px;"
          size="small"
          >{{ fetchUserType?.toUpperCase() }}</v-chip>
        </div>
      </div>
  
      <v-divider></v-divider>
  
      <v-list
      class="pa-4"
      density="compact"
      color="#4C10FA"
      nav
      >
      <v-list-item
      v-for="item in navigationItems"
      :key="item.value"
      :title="item.title"
      :value="item.value"
      :prepend-icon="item.icon"
      @click="redirect(item.route)"
      >

      </v-list-item>
      </v-list>
  
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
          block
          variant="outlined"
          style="background-color: #4C10FA; color: white;"
          @click="logout"
          >
          Logout
        </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import { logout } from '@/actions/auth';
  import { getCurrentUser } from '@/actions/user';

  export default {
    data: () => ({
      navigationItems: [
        {title:'Explore',value:'explore',icon:'mdi-compass-outline',route:'/explore'},
        {title:'Payments',value:'payments',icon:'mdi-credit-card-outline',route:'/payment'},
        {title:'Settings',value:'settings',icon:'mdi-cog',route:'/settings'},
    ],
    adminNavItems: [
        {title:'Dashboard',value:'dashboard',icon:'mdi-view-dashboard-outline',route:'/dashboard'},
        {title:'Professors',value:'professors',icon:'mdi-account-school-outline',route:'/professors'},
        {title:'Students',value:'students',icon:'mdi-account-school-outline',route:'/students'},
        {title:'Courses',value:'courses',icon:'mdi-book-education-outline',route:'/courses'},
    ],
    studentNavItems: [
        {title:'My courses',value:'my-courses',icon:'mdi-book-education-outline',route:'/mycourses'},
    ],
    professorNavItems: [
        {title:'Students',value:'students',icon:'mdi-account-school-outline',route:'/students'},
        {title:'My Courses',value:'mycourses',icon:'mdi-book-education-outline',route:'/mycourses'},
    ],
    }),
    computed: {
      ...mapState(['user','userType']),
      getUserName() { 
      return this.user?.user_name;
      },
      fetchUserType() {
      return this.userType;
      },
    },
    methods: {
      ...mapActions(['getUserType']),
      logout,
      getCurrentUser,
      redirect(page) {
        this.$router.push(page);
      },
      setNavigationItems() {
        this.fetchUserType === 'admin'
        ? this.navigationItems = [...this.adminNavItems, ...this.navigationItems]
        : this.fetchUserType === 'student'
        ? this.navigationItems = [...this.studentNavItems, ...this.navigationItems]
        : this.navigationItems = [...this.professorNavItems, ...this.navigationItems]
      },
    },
    async created() {
      await this.getUserType();
      this.setNavigationItems();
    },
  }
  </script>
