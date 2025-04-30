<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminUserProfileStore } from '@/stores/admin.user.profile'
const fallbackImage = 'https://via.placeholder.com/150?text=No+Image'

const { adminAPIGETuserProfiles, adminDeleteUserProfile } =
  useAdminUserProfileStore()

const userProfiles = ref([])

const currentPage = ref(1)
const itemsPerPage = ref(5)

const totalPages = computed(
  () => Math.ceil(userProfiles.value.length / itemsPerPage.value) || 1
)
const paginateduserProfiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return userProfiles.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const openDropdown = ref(null);

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfiles()
  console.log('admin manager user profile', userProfiles.value)
})

const formatBrithDay = brithDay => {
  const birthDate = new Date(brithDay)
  const currentDate = new Date()
  let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear()
  const monthDifference = currentDate.getMonth() - birthDate.getMonth()
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    calculatedAge--
  }
  return calculatedAge
}

const onBlockUser = async (user) => {
  console.log('function onBlockUser', user);
}

const onUnBlockUser = async (user) => {
  console.log('function onUnBlockUser', user);
}

const onEditUser = async (user) => {
  console.log('function onEditUser', user);
}

const onDeleteUser = async id => {
  await adminDeleteUserProfile(id)
  userProfiles.value = await adminAPIGETuserProfiles();
  console.log('admin manager user profile', userProfiles.value);
}

</script>

<template>
  <div class="container mx-auto px-4">
    <div class="bg-white shadow-lg rounded-lg overflow-x-auto p-5">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100 text-gray-700 uppercase tracking-wider">
          <tr>
            <th class="px-4 py-2">#</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Image</th>
            <th class="px-4 py-2">Profile Detail</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody v-if="paginateduserProfiles.length > 0">
          <tr v-for="(row, index) in paginateduserProfiles" :key="index" class="border-b hover:bg-gray-50">
            <td class="px-4 py-3">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
            <td class="px-4 py-3">
              <div class="flex flex-col">
                <span class="text-green-600 font-semibold">{{ row?.userLogin?.status_login }}</span>
                <span class="text-gray-500">{{ row?.userStatus?.status_name }}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <div v-for="image in row.userImage" :key="image.id">
                <img
                  :src="image.imageData ? 'data:image/png;base64,' + image.imageData : fallbackImage"
                  class="w-16 h-16 object-cover rounded-full border"
                  alt="Profile Image"
                />
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700">
                <span class="font-semibold">Email:</span><span>{{ row?.email }}</span>
                <span class="font-semibold">Name:</span><span>{{ row?.userProfile?.full_name }}</span>
                <span class="font-semibold">Tel:</span><span>{{ row?.userProfile?.tel_phone }}</span>
                <span class="font-semibold">Age:</span><span>{{ formatBrithDay(row?.userProfile?.birth_day) }}</span>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="relative inline-block">
                <button
                  @click="openDropdown = row.id"
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs"
                >
                  Actions
                </button>
                <div
                  v-if="openDropdown === row.id"
                  @click.outside="openDropdown = null"
                  class="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50"
                >
                  <ul class="py-1 text-sm text-gray-700">
                    <li><button @click="onBlockUser(row)" class="block w-full px-4 py-2 hover:bg-gray-100">Block</button></li>
                    <li><button @click="onUnBlockUser(row)" class="block w-full px-4 py-2 hover:bg-gray-100">Unblock</button></li>
                    <li><button @click="onEditUser(row)" class="block w-full px-4 py-2 hover:bg-gray-100">Edit</button></li>
                    <li><button @click="onDeleteUser(row)" class="block w-full px-4 py-2 text-red-600 hover:bg-gray-100">Delete</button></li>
                  </ul>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-5 text-gray-500 font-semibold">
              No user profile data available.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-center gap-4 mt-6">
        <button
          class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded disabled:opacity-50"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          Back
        </button>
        <span class="text-sm text-gray-600 self-center">Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium rounded disabled:opacity-50"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
