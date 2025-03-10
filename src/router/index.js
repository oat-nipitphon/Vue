import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import PageNotFound from '@/views/PageNotFound.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import ForgetYourPasswordView from '@/views/ForgetYourPasswordView.vue'

import DashboardView from '@/views/DashboardView.vue'

// --------------------------------- Zone ADMIN ------------------------------------------------
import AdminDashboardView from '@/views/ADMIN/AdminDashboardView.vue'
import AdminManagerPostView from '@/views/ADMIN/Posts/AdminManagerPostView.vue'
import AdminManagerUserProfileView from '@/views/ADMIN/USER/AdminManagerUserProfileView.vue'
import AdminGetUserProfileEdit from '@/views/ADMIN/USER/AdminGetUserProfileEdit.vue'

// --------------------------------- Zone USER -------------------------------------------------
// ******** User Profiles **********
import DashboardProfile from '@/views/USER/Users/DashboardProfile.vue'
import UserProfileDashboardView from '@/views/USER/Users/UserProfileDashboardView.vue'

// ******** Posts *************
import DetailPostView from '@/views/USER/Posts/DetailPostView.vue'
import CreatePostNewView from '@/views/USER/Posts/CreatePostNewView.vue'
import EditPostView from '@/views/USER/Posts/EditPostView.vue'
import ReportRecoverPostsView from '@/views/USER/Posts/ReportRecoverPostsView.vue';

// *********** Reward **************
import DashboardRewardView from '@/views/Reward/DashboardRewardView.vue'


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
    
    // ******* User Profiles **********
    {
      path: '/user_profiles/show/:id',
      name: 'DashboardProfile',
      component: DashboardProfile,
      meta: { auth: true }
    },
    {
      path: '/user_profiles/show/:id',
      name: 'UserProfileDashboardView',
      component: UserProfileDashboardView,
      meta: { auth: true }
    },

    // ******* Posts **************** 

    {
      path: '/DetailPostView',
      name: 'DetailPostView',
      component: DetailPostView,
      meta: { auth: true }
    },
    {
      path: '/CreatePostNewView',
      name: 'CreatePostNewView',
      component: CreatePostNewView,
      meta: { auth: true }
    },
    {
      path: '/posts/:id',
      name: 'EditPostView',
      component: EditPostView,
      meta: { auth: true }
    },
    {
      path: '/posts/report_recover/:userID',
      name: 'ReportRecoverPostsView',
      component: ReportRecoverPostsView,
      meta: { auth: true }
    },

    
    // ************ Reward *****************
    {
      path: '/reward/DashboardRewardView',
      name: 'DashboardRewardView',
      component: DashboardRewardView,
      meta: { auth: true }
    },



    //  ------------------------------ Zone ADMIN Views ---------------------------------------------
 
    {
      path: '/AdminDashboardView',
      name: 'AdminDashboardView',
      component: AdminDashboardView,
      meta: { auth: true } 
    },
    {
      path: '/AdminManagerPostView',
      name: 'AdminManagerPostView',
      component: AdminManagerPostView,
      meta: { auth: true }
    },
    {
      path: '/AdminManagerUserProfileView',
      name: 'AdminManagerUserProfileView',
      component: AdminManagerUserProfileView,
      meta: { auth: true }
    },
    {
      path: '/admin/userProfiles/manager/:userProfileID',
      name: 'AdminGetUserProfileEdit',
      component: AdminGetUserProfileEdit,
      meta: { auth: true }
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
