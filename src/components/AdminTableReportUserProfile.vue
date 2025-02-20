<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminUserProfileStore } from '@/stores/admin.user.profile'

const { adminAPIGETuserProfiles, adminDeleteUserProfile } =
  useAdminUserProfileStore();

const userProfiles = ref([])

const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const currentPage = ref(1);
const itemsPerPage = ref(5);

const totalPages = computed(() => 
  Math.ceil(userProfiles.value.length / itemsPerPage.value) || 1
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

// Delete Event
const btnEventDelete = async (id) => {
  await adminDeleteUserProfile(id);
  userProfiles.value = await adminAPIGETuserProfiles(); // Refresh data after deletion
};

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfiles();
});
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-2">
      <h2 class="text-gray-900 mt-4 mb-4 p-2">Admin Manager UserProfiles</h2>
    </div>

    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700">
          <tr>
            <th scope="col" class="p-2 text-center">ID</th>
          </tr>
        </thead>

        <tbody v-if="paginateduserProfiles.length">
          <tr v-for="(userProfile, index) in paginateduserProfiles" :key="index"
            class="bg-white border-b dark:bg-gray-800">
            <td class="py-2 text-center">
              {{ userProfile.id }}
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center text-lg m-5 text-red-600">
              No user profiles found.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="btn btn-primary">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages"
          class="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
</template>
