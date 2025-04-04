<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { apiStoreLogout } = useAuthStore();
const authStore = useAuthStore();
const { storeUser } = storeToRefs(authStore);

// Start Main Menu **********
const isMainDropdownOpen = ref(false);

const toggleMainDropdown = () => {
  isMainDropdownOpen.value = !isMainDropdownOpen.value;
};

const closeDropdown = (event) => {
  const menuButton = document.getElementById("user-menu-button");

  if (menuButton && !menuButton.contains(event.target)) {
    isMainDropdownOpen.value = false;
  }
};
// End Main Menu **********

// Start Mobile Menu **********
const isMoblieDropdownOpen = ref(false);

const toggleMoblieDropdown = () => {
  isMoblieDropdownOpen.value = !isMoblieDropdownOpen.value;
};

const closeDropdownMoblie = (event) => {
  const menuButtonMobile = document.getElementById("navbar-mobile-menu");

  if (menuButtonMobile && !menuButtonMobile.contains(event.target)) {
    isMoblieDropdownOpen.value = false;
  }
};
// End Mobile Menu **********

onMounted(() => {
  window.addEventListener("click", closeDropdown);
  window.addEventListener("click", closeDropdownMoblie);
});

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
  window.removeEventListener("click", closeDropdownMoblie);
});

const onLogout = async () => {
  await apiStoreLogout();
};
</script>
<template>
  <div class="header">
    <nav class="bg-gray-800">
      <div
        v-if="authStore.storeUser"
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <!-- Image icon tailwind -->
            <div class="shrink-0">
              <img
                class="size-8"
                src="../assets/icon/tailwind.png"
                alt="Your Company"
              />
            </div>

            <!-- Main Menu -->
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
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                  :to="{ name: 'DashboardView' }"
                >
                  Home
                </RouterLink>
                <RouterLink
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  :to="{ name: 'AdminDashboardView' }"
                  v-if="authStore.storeUser.user_login.status_id === 1"
                >
                  AdminDashboardView
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- View notifications hidden -->
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
                <div>
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
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
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

          <!-- Mobile menu button -->
          <div class="-mr-2 flex md:hidden">
            <button
              type="button"
              @click="toggleMoblieDropdown"
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-controls="navbar-mobile-menu"
              aria-expanded="false"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg
                class="block size-6"
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg
                class="hidden size-6"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <!-- Mobile menu, show/hide based on menu state. -->
          <div
            class="md:hidden"
            id="navbar-mobile-menu"
            v-if="isMoblieDropdownOpen"
          >
            <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <RouterLink
                class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                aria-current="page"
                :to="{ name: 'DashboardView' }"
              >
                Home
              </RouterLink>
            </div>
            <div class="border-t border-gray-700 pb-3 pt-4">
              <div class="flex items-center px-5">
                <div class="shrink-0">
                  <img
                    class="size-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <div class="text-base/5 font-medium text-white">Tom Cook</div>
                  <div class="text-sm font-medium text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  class="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
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
              </div>
              <div class="mt-3 space-y-1 px-2">
                <RouterLink
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
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
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
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
                  class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
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
      </div>
      <div
        v-else
        class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-end"
      >
        <div class="m-1">
          <RouterLink
            class="text-white m-auto p-3 btn btn-md"
            :to="{ name: 'LoginView' }"
          >
            Login
          </RouterLink>
          <RouterLink
            class="text-white m-auto p-3 btn btn-md"
            :to="{ name: 'RegisterView' }"
          >
            Register
          </RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>
<style>
.header {
  max-width: 100%;
}
</style>
