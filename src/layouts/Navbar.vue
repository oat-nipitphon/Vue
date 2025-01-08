<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from 'pinia'

const route = useRoute()

const { apiStoreLogout } = useAuthStore();
const authStore = useAuthStore();
const { storeUser } = storeToRefs(authStore)



// สถานะสำหรับ dropdown
const isDropdownOpen = ref(false);
// ฟังก์ชันเปิด/ปิด dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
// ฟังก์ชันปิด dropdown เมื่อคลิกนอก
const closeDropdown = (event) => {
  const menuButton = document.getElementById("user-menu-button");
  if (menuButton && !menuButton.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};
// เพิ่ม event listener เมื่อ component ถูก mount และลบออกเมื่อ unmount
onMounted(async () => {
  
  await authStore.apiAuthStore()
  console.log(storeUser.value.id)
  
  window.addEventListener("click", closeDropdown);
});
onUnmounted(() => {
  window.removeEventListener("click", closeDropdown);
});

const btnLogout = async () => {
  await apiStoreLogout();
};
</script>
<template>
  <div class="header">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <RouterLink
                class="p-auto"
                :to="{ name: 'HomeView' }"
              >
                <img
                class="size-8"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              </RouterLink>
            </div>
            <div class="hidden md:block" v-if="authStore.storeUser">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                  :to="{ name: 'HomeView' }"
                >
                  Home
                </RouterLink>
                <RouterLink
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  :to="{ name: 'CardsView' }"
                >
                  Cards
                </RouterLink>
                <RouterLink
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  :to="{ name: 'PostProfile_Dashboard' }"
                >
                  Post
                </RouterLink>
                <RouterLink
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  :to="{ 
                    name: 'UserProfile_Dashboard',
                    params: { id: storeUser.id }
                    }"
                >
                  User {{ storeUser.id }}
                </RouterLink>
              </div>
            </div>
          </div>

          <!-- Main Menu Login and Register Auth (อยู่ทางขวา) -->
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
          <div class="ml-10 flex space-x-4" v-if="authStore.storeUser">
            <div>
              <img
                id="avatarButton"
                type="button"
                class="w-10 h-10 rounded-full cursor-pointer"
                src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=DSSWt2M27C4Q7kNvgGQVKfy&_nc_oc=AdisSrInbCNx_3y5lkLGZFeAEZ2KoAMvTSnKJ3n4xtYta08GKAMcJzqbSAsnf6Cgknf3cL1XGP0cdoo9ntJEYyPt&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AmyLpAS1WEakULAAHJ3oXUQ&oh=00_AYAEBViyG_Rjn1VZBmKXFj02XgpmCGriFdRFLr-cG4mxgA&oe=678351F1"
                alt="User dropdown"
              />

              <!-- Dropdown Menu -->
              <div
                id="userDropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>Bonnie Green</div>
                  <div class="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Dashboard</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Settings</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >Earnings</a
                    >
                  </li>
                </ul>
                <div class="py-1">
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Sign out</a
                  >
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                @click="btnLogout"
              >
                logout
              </button>
            </div>
          </div>
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
