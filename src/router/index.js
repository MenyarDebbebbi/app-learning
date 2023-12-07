import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '@/actions/auth'
import store from '@/store'


const routes = [
  {
    path: '/',
    redirect: 'explore',
    component: () => import('@/layouts/default/Default.vue'),
    beforeEnter: async (to, from, next) => {
      if (isLoggedIn()) {
        store.dispatch('fetchUser')
        next();
      } else {
        next('/auth');
      }
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/components/dashboard.vue'),
      },
      {
        path: 'explore',
        name: 'Explore',
        component: () => import('@/components/explore.vue'),
      },
      {
        path: 'mycourses',
        name: 'MyCourses',
        component: () => import('@/components/myCourses.vue'),
      },
      {
        path: 'professors',
        name: 'ProfessorList',
        component: () => import('@/components/professorList.vue'),
      },
      {
        path: 'students',
        name: 'StudentList',
        component: () => import('@/components/studentList.vue'),
      },
      {
        path: 'courses',
        name: 'CourseList',
        component: () => import('@/components/courseList.vue'),
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('@/components/payment.vue'),
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('@/components/settings.vue'),
      },
      {
        path: 'courseDetails',
        name: 'CourseDetails',
        children: [
          {
            path: ':id',
            component: () => import('@/views/CourseDetails.vue'),
            beforeEnter: async (to, from, next) => {
              const courseId = to.params.id;
      
              await store.dispatch('getCourse', courseId);
      
              next();
            },
          },
        ]
      },
    ],
  },
  {
    path: "/auth",
    name: 'Auth',
    beforeEnter: (to, from, next) => {
      if (!isLoggedIn()) {
        next();
      } else {
        // User is not logged in, redirect to the login page
        next('/dashboard');
      }
    },
    component: () => import("@/views/Auth.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes,
})

router.onError((error, to) => {
  if (error.message.includes('Failed to fetch dynamically imported module'))
  {
    if (window.confirm("A new version of the app is available, reload to continue")) {
      location.reload();
    }
  }
})

export default router
