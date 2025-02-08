<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
const profileImageUrlNull = new URL('@/assets/icon/keyboard.jpg', import.meta.url).href;
const route = useRoute();

const { apiStoreLogout } = useAuthStore();
const authStore = useAuthStore();
const { storeUser } = storeToRefs(authStore);


const btnLogout = async () => {
  await apiStoreLogout();
};

onMounted(async () => {
  await authStore.apiAuthStore(route.params.id);
  window.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
});

const isDropdownOpen = ref(false);
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
const closeDropdown = (event) => {
  const menuButton = document.getElementById("user-menu-button");

  if (menuButton && !menuButton.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

</script>
<template>
  <div>
    <!-- <div v-if="authStore.storeUser" class="text-lg text-gray-500">
    <p
      v-for="profileImage in authStore.storeUser.user_login.userProfileImage" :key="profileImage.id"
    >
      {{ profileImage.imageData || profileImageNull }}
    </p>
  </div> -->
    <div class="header">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <!-- *********  Main Menu Login and Register Auth true **************** -->
          <div class="flex items-center">
            <div class="hidden md:block" v-if="authStore.storeUser">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                  :to="{ name: 'HomeView' }"
                >
                   Home page
                </RouterLink>

                
                <div
                  v-if="authStore.storeUser.user_login.status_id === 1 || authStore.storeUser.user_login.status_id === 2"
                >
                <RouterLink
                         class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                         :to="{
                          name: 'AdminManagerPostView'
                         }"
                      >
                        Manager Post
                      </RouterLink>
                      <RouterLink
                         class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                         :to="{
                          name: 'AdminManagerUserProfileView'
                         }"
                      >
                        Manager UserProfile
                      </RouterLink>
                </div>
                

              </div>
            </div>
          </div>
          <!-- *********  Main Menu Login and Register Auth true **************** -->

          <!-- *************** Profile dropdown Auth true************************** -->
          <div class="relative ml-3" v-if="authStore.storeUser">
            <!-- Button image profile dropdown -->
            <div
              
            >
              <button
                type="button"
                @click="toggleDropdown"
                class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full"
                  :src="profileImageUrlNull"
                  alt="userProfileImage"
                />
                
              </button>
            </div>
             <!-- item dropdown profile image   -->
            <div
              v-if="isDropdownOpen"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabindex="-1"
            >
              <RouterLink
                :to="{
                  name: 'UserProfileDashboardView',
                  params: { id: storeUser.user_login.id },
                }"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-0"
              >{{ storeUser.user_login.id }}
                Your Profile
              </RouterLink>
              <RouterLink 
                :to="{
                  name: 'ReportRecoverPostsView',
                  params: {
                    userID: storeUser.user_login.id
                  }
                }"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-1"
              >
                Recover posts
              </RouterLink>
              <a
                type="button"
                @click="btnLogout"
                class="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabindex="-1"
                id="user-menu-item-2"
                >Logout</a
              >
            </div>
            <p class="text-gray-100 text-lg">{{ authStore.storeUser.user_login.userProfileImage.imageData }}</p>
          </div>
          <!-- *************** Profile dropdown Auth true************************** -->

          <!-- *********  Main Menu Login and Register Auth false **************** -->
          <div class="ml-10 flex space-x-4" v-if="!authStore.storeUser">
            <div>
              <RouterLink
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                :to="{ name: 'LoginView' }"
              >
                Login
              </RouterLink>
            </div>
            <div>
              <RouterLink
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                :to="{ name: 'RegisterView' }"
              >
                Register
              </RouterLink>
            </div>
          </div>
          <!-- *********  Main Menu Login and Register Auth false **************** -->
        </div>
      </div>
    </nav>
  </div>
  </div>
</template>

<style>
.header {
  max-width: 100%;
}
</style>
