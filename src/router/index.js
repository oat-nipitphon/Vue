import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PageNotFound from '@/views/PageNotFound.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ForgetYourPasswordView from '@/views/ForgetYourPasswordView.vue'

import DashboardView from '@/views/DashboardView.vue'

// --------------------------------- Zone USER -------------------------------------------------

// ******** View users
import UserProfileDashboardView from '@/views/USER/Users/UserProfileDashboardView.vue'

// ******** View posts
import PostDashboardView from '@/views/USER/Posts/PostDashboardView.vue'
import CreatePostNewView from '@/views/USER/Posts/CreatePostNewView.vue'


// --------------------------------- Zone ADMIN ------------------------------------------------

// ******* View users
import Admin_ReportUsersView from '@/views/ADMIN/USER/Admin_ReportUsersView.vue'

// ******* View posts
import Admin_ReportPostsView from '@/views/ADMIN/Posts/Admin_ReportPostsView.vue'


// --------------------------------- Zone Test Code ------------------------------------------------
import FileImageUpload from '@/components/FileImageUpload.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    },

    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { guest: true }
    },
    {
      path: '/RegisterView',
      name: 'RegisterView',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/LoginView',
      name: 'LoginView',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/ForgetYourPasswordView',
      name: 'ForgetYourPasswordView',
      component: ForgetYourPasswordView,
      meta: { guest: true }
    },

    {
      path: '/DashboardView',
      name: 'DashboardView',
      component: DashboardView,
      meta: { auth: true }
    },

    //  ----------------------------- Zone USER Views  ---------------------------------------------
    
    // ******* View users
    {
      path: '/user_profile/show/:id',
      name: 'UserProfileDashboardView',
      component: UserProfileDashboardView,
      meta: { auth: true }
    },

    // ******* View posts 
    {
      path: '/CreatePostNewView',
      name: 'CreatePostNewView',
      component: CreatePostNewView,
      meta: { auth: true }
    },


    //  ------------------------------ Zone ADMIN Views ---------------------------------------------
 
    // ******* View users
    {
      path: '/Admin_ReportUsersView',
      name: 'Admin_ReportUsersView',
      component: Admin_ReportUsersView,
      meta: { auth: true }
    },

    // ******* View posts 
    {
      path: '/Admin_ReportPostsView',
      name: 'Admin_ReportPostsView',
      component: Admin_ReportPostsView,
      meta: { auth: true }
    },




    //  ------------------------------ Zone Test Views ---------------------------------------------
    {
      path: '/testCodeView',
      component: () => import('../views/TestCode/TestCodeView.vue')
    },
    {
      path: '/cards',
      name: 'CardsView',
      component: () => import('../views/CardsView.vue')
    },
    {
      path: '/FileImageUpload',
      name: 'FileImageUpload',
      component: FileImageUpload
    },

  ],
})

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.apiAuthStore();

  if (!authStore.storeUser && to.meta.auth) {
    // Redirect unauthenticated users trying to access protected routes
    return { name: 'HomeView' };
  }

  if (authStore.storeUser && to.meta.guest) {
    // Redirect authenticated users trying to access guest routes
    return { name: 'DashboardView' };
  }
});


export default router
