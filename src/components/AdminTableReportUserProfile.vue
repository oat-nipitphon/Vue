<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";
const defaultProfileImage = "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=_8IVpzSUJz8Q7kNvgH981ad&_nc_oc=AdjwNRCxXwtMr0TUQFjkBXTSR68KItzLfOXsS06bglRQ93A4l_N8TKdv4UJtxEVVgHa4BQVpEdDKu6htxiHQdrbk&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AhlEAgeCssMinnIwKJwfgMQ&oh=00_AYBEFNyZ8w4XoptZM9dz2smOltNWG3lclgbLROlVgZYUVg&oe=67B024F1";

const { adminAPIGETuserProfile } = useAdminUserProfileStore();
const userProfiles = ref([]);

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfile();
  console.log("user profile :: ", userProfiles.value);
});

// Start button next pages
const currentPage = ref(1);
const itemsPerPage = ref(5);
const totalPages = computed(() =>
  Math.ceil(userProfiles.value.length / itemsPerPage.value)
);
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
// Stop button next pages
</script>
<template>
  <div class="w-full">
    <div class="grid grid-cols-1">
      <div class="flex justify-start">
        <h2 for="AdminManagerPost" class="text-gray-900 mt-4 mb-4 p-2">
          Table report user
        </h2>
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
              <div v-if="userProfile?.userProfileImage?.length">
                <div
                  v-for="imageProfile in userProfile.userProfileImage"
                  :key="imageProfile?.id"
                >
                  <img
                    :src="imageProfile?.image_data || defaultProfileImage"
                    class="w-40 h-20 m-auto object-cover"
                    alt="User Profile Image"
                  />
                </div>
              </div>
              <div v-else>
                <img
                  :src="defaultProfileImage"
                  class="w-40 h-20 m-auto object-cover"
                  alt="Default Profile Image"
                />
              </div>
            </td>
            <td class="text-sm text-gray-900 text-center">
              <p
                v-if="userProfile.userLogin.status_login === 'online'"
                class="text-sm text-center text-green-500"
              >
                online
              </p>
              <p
                v-if="userProfile.userLogin.status_login === 'offline' || userProfile.userLogin.status_login ==='null'"
                class="text-sm text-center text-red-500"
              >
                offline
              </p>
              <!-- <p v-else class="text-sm text-center text-red-500">offline</p> -->
            </td>
            <td class="text-sm text-gray-900 text-center">
              {{ userProfile?.email }}
            </td>
            <td class="text-sm text-gray-900 text-center">
              {{ userProfile?.username }}
            </td>
            <td class="text-sm text-gray-900 text-center">
              {{ userProfile?.full_name }}
            </td>
            <td class="text-sm text-gray-900 text-center">
              <div
                v-for="(contact, index) in userProfile?.userContact"
                :key="index"
              >
                <label for="m-auto">
                  <img
                    class="h-25 w-25 m-auto"
                    v-if="contact?.contact_icon_data"
                    :src="`${contact?.contact_icon_data}`"
                    alt="ContactIconData"
                  />
                </label>
                <label class="text-sm m-auto">
                  {{ contact?.contact_name }}
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
              Data response false.
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
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
      </div>
    </div>
  </div>
</template>
<style>
.btn-size {
  width: auto;
  height: 30px;
}
</style>
