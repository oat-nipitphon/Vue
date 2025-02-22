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
  userProfiles.value = await adminAPIGETuserProfiles()
  console.log('admin manager user profile', userProfiles.value)
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
                <th scope="col" class="p-2 text-center">Status</th>
                <th scope="col" class="p-2 text-center">Profile</th>
                <th scope="col" class="p-2 text-center">Contact</th>
                <th scope="col" class="p-2 text-center">List Post</th>
                <th scope="col" class="p-2 text-center">Event</th>
              </tr>
            </thead>

            <tbody v-if="paginateduserProfiles.length">
              <tr
                v-for="(user, index) in paginateduserProfiles"
                :key="index"
                class="bg-white border-b dark:bg-gray-800"
              >
                <td class="py-2 text-sm">
                  <div class="grid grid-rows-3">
                    <div class="text-center">
                      {{ user.userLogin?.status_login }}
                    </div>
                    <div v-if="user.userImage">
                      <p
                        class="flex justify-items-center"
                        v-for="(image, index) in user.userImage"
                        :key="index"
                      >
                        <img
                          class="size-8 rounded-full m-auto"
                          :src="'data:image/png;base64,' + image?.imageData"
                          alt="UserImage"
                        />
                      </p>
                    </div>
                    <div class="text-center">
                      {{ user.userStatus?.status_name }}
                    </div>
                  </div>
                </td>
                <td class="py-2 text-sm">
                  <div class="grid grid-rows-3">
                    <div class="p-2">
                      <div class="grid grid-cols-[10%_auto]">
                        <label class="m-auto">
                          {{ user.userProfiles?.title_name }}
                        </label>
                        <label class="m-auto">
                          {{ user.userProfiles?.full_name }}
                        </label>
                      </div>
                    </div>
                    <div class="p-2">
                      {{ user.userProfiles?.nick_name }}
                    </div>
                    <div class="p-2">
                      {{ user.userProfiles?.birth }}
                    </div>
                  </div>
                </td>
                <td class="py-2 text-sm">
                  <div
                    v-for="(contact, index) in user?.userProfileContact"
                    :key="index"
                  >
                    <label class="m-auto">{{ contact }}</label>
                  </div>
                </td>
                <td class="py-2 text-sm">
                  <div>sum post all where user id</div>
                </td>
                <td class="flex text-center">
                  <div class="dropdown m-auto">
                    <button
                      class="dropdown-toggle btn btn-sm btn-event mt-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Event
                    </button>
                    <ul class="dropdown-menu">
                      <li>block</li>
                      <li>un block</li>
                      <li>
                        <button
                          class="dropdown-toggle btn btn-sm btn-event mt-2"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Edit
                        </button>
                        <ul>
                          <li>user</li>
                          <li>profile</li>
                        </ul>
                      </li>
                      <li>
                        <button
                          class="dropdown-toggle btn btn-sm btn-event mt-2"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Delete
                        </button>
                        <ul>
                          <li>user</li>
                          <li>profile</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
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
<style>
.btn-event {
  background-color: #3498db; /* สีฟ้า */
  color: white;
  border-radius: 5px;
}

.dropdown-menu {
  background-color: #f8f9fa; /* สีพื้นหลังเทาอ่อน */
  border-radius: 8px;
  padding: 8px 0;
}

.dropdown-item {
  padding: 5px 5px;
  border-radius: 5px;
}

.btn-block {
  background-color: #f31212; /* สีส้ม */
  color: white;
}

.btn-unblock {
  background-color: #27ae60; /* สีเขียว */
  color: white;
}

.btn-delete {
  background-color: #ffffff; /* สีแดง */
  color: black;
}
</style>
