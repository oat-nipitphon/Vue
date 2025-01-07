<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { RouterLink } from "vue-router"
import { useAuthStore } from "@/stores/auth"
const { apiStoreLogout } = useAuthStore()
const authStore = useAuthStore()

// สถานะสำหรับ dropdown
const isDropdownOpen = ref(false)
// ฟังก์ชันเปิด/ปิด dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
// ฟังก์ชันปิด dropdown เมื่อคลิกนอก
const closeDropdown = (event) => {
  const menuButton = document.getElementById("user-menu-button")
  if (menuButton && !menuButton.contains(event.target)) {
    isDropdownOpen.value = false
  }
}
// เพิ่ม event listener เมื่อ component ถูก mount และลบออกเมื่อ unmount
onMounted(() => {
  window.addEventListener("click", closeDropdown)
})
onUnmounted(() => {
  window.removeEventListener("click", closeDropdown)
})

const btnLogout = async () => {
  await apiStoreLogout()
}

</script>
<template>
  <div class="header">
    <nav class="bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img
                class="size-8"
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div class="hidden md:block"
              v-if="authStore.storeUser"
            >
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                  aria-current="page"
                  :to="{ name: 'HomeView' }"
                >
                  Home
                </RouterLink>
                <a
                  href="#"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >Team</a
                >
              </div>
            </div>
          </div>

          <!-- Main Menu Login and Register Auth (อยู่ทางขวา) -->
          <div 
            class="ml-10 flex space-x-4"
            v-if="!authStore.storeUser"
          >
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
          <div 
            class="ml-10 flex space-x-4"
            v-if="authStore.storeUser"
          >
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
    </nav>
  </div>
</template>
<style>
.header {
  max-width: 100%;
}
</style>
