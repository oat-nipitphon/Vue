<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";

const { adminAPIGETuserProfile } = useAdminUserProfileStore();
const userProfiles = ref([]);
const currentPage = ref(1); // กำหนดหน้าเริ่มต้น
const itemsPerPage = ref(5); // จำนวนข้อมูลต่อหน้า

// คำนวณจำนวนหน้า
const totalPages = computed(() =>
  Math.ceil(userProfiles.value.length / itemsPerPage.value)
);

//  คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
const computedUserProfiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return userProfiles.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfile();
  console.log("user profile :: ", userProfiles.value);
});
</script>
<template>
  <div class="w-full">
    <div class="grid grid-cols-2">
      <div class="flex justify-start">
        <h2 for="AdminManagerPost" class="text-gray-900 mt-4 mb-4 p-2">
          Admin Manager user profiles.
        </h2>
      </div>
      <div class="flex">
        <!-- Event -->
      </div>
    </div>
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr class="w-full">
            <th scope="col" class="w-2 p-2 text-center font-semibold">Image</th>
            <th scope="col" class="w-2 p-2 text-center font-semibold">
              Status
            </th>
            <th scope="col" class="w-2 p-2 text-center font-semibold">Email</th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">
              Username
            </th>
            <th scope="col" class="w-3 p-3 text-center font-semibold">
              Full Name
            </th>
            <th scope="col" class="w-5 p-3 text-center font-semibold">
              Contact
            </th>
            <th scope="col" class="w-5 p-3 text-center font-semibold">Event</th>
          </tr>
        </thead>
        <tbody v-if="computedUserProfiles.length > 0">
          <tr
            v-for="(userProfile, index) in computedUserProfiles"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="w-2 py-2 text-center">
              <img
                src=""
                class="w-50 h-10 m-auto"
                alt="UserProfileImage"
              />
            </td>
            <td class="text-sm text-gray-900 text-center">
              <p
                v-if="userProfile.user.user_login.status_login === 'online'"
                class="text-sm text-center text-green-500"
              >
                online
              </p>
              <p
                v-if="userProfile.user.user_login.status_login === 'offline'"
                class="text-sm text-center text-red-500"
              >
                offline
              </p>
            </td>
            <td class="text-sm text-gray-900 text-center">
              {{ userProfile.user.email }}
            </td>
            <td class="text-sm text-gray-900 text-center">
              {{ userProfile.user.username }}
            </td>
            <td class="text-sm text-gray-900 text-center">
              {{ userProfile.full_name }}
            </td>
            <td class="text-sm text-gray-900 text-center">
              <div
                v-for="(contact, index) in userProfile.user_contact"
                :key="index"
              >
                <!-- แสดง icon ถ้ามี contact_icon_data -->
                <label for="m-auto">
                  <img
                    class="h-25 w-25 m-auto"
                    v-if="contact.contact_icon_data"
                    :src="
                    `${contact.contact_icon_data}`
                    "
                    alt="ContactIconData"
                  />
                </label>
                
                <!-- แสดง contact_name -->
                <label class="text-sm m-auto">
                  {{ contact.contact_name }}
                </label>
              </div>
            </td>
            <td class="text">
              <button class="btn-size">Event</button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td class="flex justify-center text-lg m-5 text-red-600">
              Data posts false.
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <!-- <div class="flex justify-between items-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="btn btn-primary"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-primary"
        >
          Next
        </button>
      </div> -->
    </div>
  </div>
</template>
<style>
.btn-size {
  width: auto;
  height: 30px;
}
</style>
