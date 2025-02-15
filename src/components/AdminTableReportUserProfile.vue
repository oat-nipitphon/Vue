<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";
const defaultProfileImage =
  "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=_8IVpzSUJz8Q7kNvgH981ad&_nc_oc=AdjwNRCxXwtMr0TUQFjkBXTSR68KItzLfOXsS06bglRQ93A4l_N8TKdv4UJtxEVVgHa4BQVpEdDKu6htxiHQdrbk&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AhlEAgeCssMinnIwKJwfgMQ&oh=00_AYBEFNyZ8w4XoptZM9dz2smOltNWG3lclgbLROlVgZYUVg&oe=67B024F1";

const { adminAPIGETuserProfiles, deleteUserProfile } =
  useAdminUserProfileStore();
const userProfiles = ref([]);

const currentPage = ref(1);
const itemsPerPage = ref(5);

const totalPages = computed(() =>
  Math.ceil(userProfiles.value.length / itemsPerPage.value)
);

const paginateduserProfiles = computed(() => {
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

const btnEventDelete = async (userID) => {
  console.log("Deleting user:", userID);
  await deleteUserProfile(userID);
};

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfiles();
  console.log("userProfile value", userProfiles.value);
});

function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-2">
      <div class="flex justify-start">
        <h2 for="AdminManagerPost" class="text-gray-900 mt-4 mb-4 p-2">
          Admin Manager UserProfiles.
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
            <!-- <th
              scope="col"
              class="w-2 p-3 text-center font-semibold text-gray-900"
            >
              No.
            </th> -->
            <th scope="col" class="w-2 p-2 text-center font-semibold">
              Status
            </th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">Image</th>
            <th scope="col" class="w-3 p-3 text-center font-semibold">Name</th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">
              Tel phone
            </th>
            <th scope="col" class="w-5 p-3 text-center font-semibold">
              Events
            </th>
          </tr>
        </thead>
        <tbody v-if="paginateduserProfiles.length > 0">
          <tr
            v-for="(userProfile, index) in paginateduserProfiles"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="w-2 py-2 text-center">
              <p
                class="text-green-500 text-sm text-center"
                v-if="userProfile.userLogin.status_login === 'online'"
              >
                {{ userProfile.userLogin.status_login }}
              </p>
              <!-- <p 
                class="text-red-600 text-sm text-center"
                v-if="userProfile.userLogin.status_login === 'offline'"
              >
                {{ userProfile.userLogin.status_login }}
              </p> -->
              <p v-else class="text-red-600 text-sm text-center">offline</p>
            </td>
            <td class="w-5 p-3 text-start m-1">
              <div
                v-for="image in userProfile.userProfileImage"
                :key="image.id"
              >
                <img
                  :src="image.image_data"
                  alt="Profile-Image"
                  class="size-8 rounded-full m-auto"
                />
              </div>
            </td>
            <td class="w-4 p-3 text-center m-1">
              <label
                v-for="profile in userProfile.userProfile"
                :key="profile.id"
                class="text-sm text-gray-900"
              >
                {{ profile.full_name }}
              </label>
            </td>
            <td class="w-4 p-3 text-center m-1">
              <label
                v-for="profile in userProfile.userProfile"
                :key="profile.id"
                class="text-sm text-gray-900"
              >
                {{ formatDate(profile.birth_day) }}
              </label>
            </td>
            <td class="flex text-center">
              <div class="dropdown m-auto">
                <button
                  class="btn btn-sm btn-primary mt-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Event
                </button>
                <ul
                  class="dropdown-menu"
                  v-for="user in userProfile"
                  :key="user.id"
                >
                  <li>
                    <label
                      type="button"
                      @click="btnEventEdit(user.id)"
                      class="btn btn-delete dropdown-item m-2"
                    >
                      Edit
                    </label>
                  </li>
                  <li>
                    <label
                      type="button"
                      @click="btnEventDelete(user.id)"
                      class="btn btn-delete dropdown-item m-2"
                    >
                      Delete
                    </label>
                  </li>
                </ul>
              </div>
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
