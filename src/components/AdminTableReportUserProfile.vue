<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminUserProfileStore } from '@/stores/admin.user.profile'

const { adminAPIGETuserProfiles, adminDeleteUserProfile } =
  useAdminUserProfileStore()

const userProfiles = ref([])

const formatDate = date => {
  if (!date) return 'N/A'
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

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

// Delete Event
const btnEventDelete = async id => {
  await adminDeleteUserProfile(id)
  userProfiles.value = await adminAPIGETuserProfiles() // Refresh data after deletion
}

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfiles();
  console.log("admin manager user profile", userProfiles.value);
})
</script>

<template>
  <div class="container">
    <div class="w-full p-4 m-auth shadow-lg">
      <div class="grid grid-rows-3">
        <div class="flex">
          <label for="">Table manager user profiles</label>
        </div>
        <div class="flex">
          <table class="w-full text-sm text-gray-500 dark:text-gray-400">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700"
            >
              <tr>
                <th scope="col" class="p-2 text-center">ID</th>
              </tr>
            </thead>

            <tbody v-if="paginateduserProfiles.length">
              <tr
                v-for="(userProfile, index) in paginateduserProfiles"
                :key="index"
                class="bg-white border-b dark:bg-gray-800"
              >
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
        </div>
        <div class="grid grid-clos-3">
          <div>
            <button type="submit" class="btn btn-md btn-primary">Back</button>
          </div>
          <div>
            <span class="text-sm text-gray-900"> 1 2 3 4 </span>
          </div>
          <div>
            <button type="submit" class="btn btn-md btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
