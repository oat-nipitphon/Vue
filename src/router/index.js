import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
