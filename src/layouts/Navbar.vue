<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute, routeLocationKey, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
const route = useRoute()
const router = useRouter()
const { apiStoreLogout } = useAuthStore()
const authStore = useAuthStore()
const { storeUser } = storeToRefs(authStore)

const isAdmin = computed(() => {
  return authStore.storeUser.user_login.status_id === 1
})

const isActive = name => (route.name === name ? 'page' : null)

const navClass = name =>
  route.name === name
    ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
    : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'

const isMainDropdownOpen = ref(false)
const toggleMainDropdown = event => {
  event.stopPropagation()
  isMainDropdownOpen.value = !isMainDropdownOpen.value
}

const isMobileDropdownOpen = ref(false)
const toggleMobileDropdown = event => {
  event.stopPropagation()
  isMobileDropdownOpen.value = !isMobileDropdownOpen.value
}

const closeDropdown = event => {
  if (!event.target.closest('#navbar-main-menu')) {
    isMainDropdownOpen.value = false
  }
  if (
    !event.target.closest('#navbar-mobile-menu') &&
    !event.target.closest('#mobile-menu-button')
  ) {
    isMobileDropdownOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  window.removeEventListener('click', closeDropdown)
})

const onHome = () => {
  router.push({ name: 'DashboardView' })
  isMobileDropdownOpen.value = false
}
const onAdminManager = () => {
  router.push({ name: 'AdminDashboardView' })
  isMobileDropdownOpen.value = false
}

const onUserProfile = async () => {
  router.push({
    name: 'DashboardProfile',
    params: { id: authStore.storeUser.user_login.id },
  })
  isMobileDropdownOpen.value = false
}

const onRecoverPost = async () => {
  router.push({
    name: 'ReportRecoverPostsView',
    params: { userID: authStore.storeUser.user_login.id },
  })
  isMobileDropdownOpen.value = false
}

const onLogout = async () => {
  await apiStoreLogout()
  isMobileDropdownOpen.value = false
}
</script>
<template>
  <div>
    <nav class="bg-gray-800">
      <div
        v-if="authStore.storeUser"
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div class="flex h-16 items-center justify-between">
          <!-- Navbar Left -->
          <div class="flex items-center">
            <!-- Image icon tailwind -->
            <div class="shrink-0">
              <img
                class="size-8"
                src="../assets/icon/tailwind.png"
                alt="Your Company"
              />
            </div>

            <!-- Navbar Main Left -->
            <div class="hidden md:block">
              <div
                class="ml-10 flex items-baseline space-x-4 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                <!-- 
                Current:   "bg-gray-900 text-white", 
                Default:   "text-gray-300 hover:bg-gray-700 hover:text-white"
                            "ml-10 flex items-baseline space-x-4"
                 -->
                <RouterLink
                  :aria-current="isActive('DashboardView')"
                  :class="navClass('DashboardView')"
                  :to="{ name: 'DashboardView' }"
                >
                  หน้าหลัก
                </RouterLink>

                <RouterLink
                  :aria-current="isActive('DashboardProfile')"
                  :class="navClass('DashboardProfile')"
                  :to="{
                    name: 'DashboardProfile',
                    params: { id: authStore.storeUser.user_login.id },
                  }"
                >
                  โปรไฟล์
                </RouterLink>

                <RouterLink
                  :aria-current="isActive('ReportRecoverPostsView')"
                  :class="navClass('ReportRecoverPostsView')"
                  :to="{
                    name: 'ReportRecoverPostsView',
                    params: { userID: authStore.storeUser.user_login.id },
                  }"
                >
                  กู้คืนโพสจัดเก็บ
                </RouterLink>

                <RouterLink
                  :aria-current="isActive('AdminDashboardView')"
                  :class="navClass('AdminDashboardView')"
                  :to="{ name: 'AdminDashboardView' }"
                  v-if="isAdmin"
                >
                  แผงควบคุมผู้ดูแล
                </RouterLink>
              </div>
            </div>
          </div>

          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Notifications -->
              <button
                type="button"
                class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <svg
                  class="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                  />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <!-- Button image profile dropdown -->
                
                <div
                  class="text-white text-center"
                  v-for="(image, index) in authStore.storeUser.user_login
                    .userImage"
                  :key="index"
                >
                  <div v-if="image.imageData !== null">
                    <button
                      type="button"
                      @click="toggleMainDropdown"
                      class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="navbar-main-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span class="absolute -inset-1.5"></span>
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="size-8 rounded-full"
                        :src="'data:image/png;base64,'+image.imageData"
                        alt=""
                      />
                    </button>
                  </div>
                  <div v-else>
                    <button
                      type="button"
                      @click="toggleMainDropdown"
                      class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="navbar-main-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span class="absolute -inset-1.5"></span>
                      <span class="sr-only">Open user menu</span>
                      <img
                        class="size-8 rounded-full"
                        src="../assets/icon/icon-user-default.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <!-- Menu image profile dropdown -->
                <div
                  v-if="isMainDropdownOpen"
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="navbar-main-menu"
                  tabindex="-1"
                >
                  <!--Dropdown menu, show/hide based on menu state.
                  Entering: "transition ease-out duration-100"
                    From: "transform opacity-0 scale-95"
                    To: "transform opacity-100 scale-100"
                    Leaving: "transition ease-in duration-75"
                    From: "transform opacity-100 scale-100"
                    To: "transform opacity-0 scale-95"
                -->

                  <!-- Active: "bg-gray-100 outline-none", Not Active: "" -->
                  <RouterLink
                    class="block px-4 py-2 text-sm text-gray-700"
                    :to="{
                      name: 'UserProfileDashboardView',
                      params: {
                        id: authStore.storeUser.user_login.id,
                      },
                    }"
                  >
                    User Profile
                  </RouterLink>
                  <RouterLink
                    class="block px-4 py-2 text-sm text-gray-700"
                    :to="{
                      name: 'ReportRecoverPostsView',
                      params: {
                        userID: authStore.storeUser.user_login.id,
                      },
                    }"
                  >
                    Recover post
                  </RouterLink>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                    >Settings</a
                  >
                  <button
                    type="submit"
                    class="block px-4 py-2 text-sm text-gray-700 btn btn-sm"
                    @click="onLogout"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Navbar Mobile Button Menu -->
          <div class="-mr-2 flex md:hidden">
            <button
              id="mobile-menu-button"
              @click="toggleMobileDropdown"
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!isMobileDropdownOpen"
                class="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                v-else
                class="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!-- Navbar Mobile Dropdown Menu -->
          <div
            v-if="isMobileDropdownOpen"
            id="navbar-mobile-menu"
            class="md:hidden absolute top-16 left-0 w-full bg-gray-800"
          >
            <!-- <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <RouterLink
                class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                :to="{ name: 'DashboardView' }"
                >Home</RouterLink
              >
              <RouterLink
                class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                :to="{ name: 'AdminDashboardView' }"
                v-if="authStore.storeUser.user_login.status_id === 1"
              >
                AdminDashboardView
              </RouterLink>
            </div> -->
            <div class="border-t border-gray-700 pb-3 pt-4">
              <div class="flex items-center px-5">
                <div>
                  <div
                    v-for="(image, index) in authStore.storeUser.user_login
                      .userImage"
                    :key="index"
                  >
                    111
                    <p v-if="image.imageData">
                      <img
                        :src="'data:image/png;base64,' + image.imageData"
                        class="size-8 rounded-full"
                        alt="UserImage"
                      />
                    </p>
                    <p v-else>image null</p>
                  </div>
                </div>
                <div class="ml-3">
                  <div class="text-base font-medium text-white">
                    {{ storeUser.user_login.username }}
                  </div>
                  <div class="text-sm font-medium text-gray-400">
                    {{ storeUser.user_login.email }}
                  </div>
                </div>
              </div>
              <div class="mt-3 space-y-1 px-2">
                <span
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  @click="onAdminManager"
                  v-if="isAdmin"
                >
                  แผงควบคุมผู้ดูแล
                </span>
                <span
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  @click="onHome"
                  >หน้าหลัก</span
                >

                <span
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  @click="onUserProfile"
                  >โปรไฟล์</span
                >
                <span
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  @click="onRecoverPost"
                  >กู้คืนโพสจัดเก็บ</span
                >
                <span
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  @click="onLogout"
                >
                  ออกจากระบบ
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-end"
      >
        <div class="m-1">
          <RouterLink
            class="text-white m-auto p-3 btn btn-md"
            :to="{ name: 'LoginView' }"
            >เข้าใช้งาน</RouterLink
          >
          <RouterLink
            class="text-white m-auto p-3 btn btn-md"
            :to="{ name: 'RegisterView' }"
            >ลงทะเบียน</RouterLink
          >
        </div>
      </div>
    </nav>
  </div>
</template>
