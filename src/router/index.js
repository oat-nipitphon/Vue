import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import PostDashboardView from '@/views/Posts/PostDashboardView.vue'
import UserProfileDashboardView from '@/views/Users/UserProfileDashboardView.vue'
import ForgetYourPasswordView from '@/views/ForgetYourPasswordView.vue'
import FileImageUpload from '@/components/FileImageUpload.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: PageNotFound
    },
    {
      path: '/testCodeView',
      component: () => import('../views/TestCode/TestCodeView.vue')
    },
    {
      path: '/FileImageUpload',
      name: 'FileImageUpload',
      component: FileImageUpload
    },
    {
      path: '/cards',
      name: 'CardsView',
      component: () => import('../views/CardsView.vue')
    },
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
      meta: { guest: true }
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
      meta: { guest: true }
    },
    {
      path: '/forget_your_password',
      name: 'ForgetYourPasswordView',
      component: ForgetYourPasswordView,
      meta: { guest: true }
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: { guest: true }
    },
    {
      path: '/dashboard',
      name: 'DashboardView',
      component: DashboardView,
      meta: { auth: true }
    },
    {
      path: '/user_profile/show/:id',
      name: 'UserProfileDashboardView',
      component: UserProfileDashboardView,
      meta: { auth: true }
    },
    {
      path: '/postprofile_dashboard',
      name: 'PostDashboardView',
      component: PostDashboardView,
      meta: { auth: true }
    },
    {
      path: '/ReportUserProfilesView',
      name: 'ReportUserProfilesView'
    },
    {
      path: '/ReportPostsView',
      name: 'ReportPostsView'
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
