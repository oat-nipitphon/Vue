<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminUserProfileStore } from '@/stores/admin.user.profile'

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

const onDeleteUserProfile = async id => {
  await adminDeleteUserProfile(id)
  userProfiles.value = await adminAPIGETuserProfiles() // Refresh data after deletion
}


</script>

<template>
  <div class="container mx-auto px-6 py-10">
    <div class="block shadow-lg rounded-lg bg-white p-6">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">User Profile Manager</h2>
      </div>
      <div class="w-full">
        <table class="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
          <thead class="bg-gray-100 text-gray-800">
            <tr class="h-12">
              <th class="p-2 text-center border border-gray-300 text-sm font-semibold">Status</th>
              <th class="p-2 text-center border border-gray-300 text-sm font-semibold">Profile</th>
              <th class="p-2 text-center border border-gray-300 text-sm font-semibold">Contact</th>
              <th class="p-2 text-center border border-gray-300 text-sm font-semibold">Followers</th>
            </tr>
          </thead>
          <tbody v-if="paginateduserProfiles.length">
            <tr class="h-10" v-for="(user, index) in paginateduserProfiles" :key="index">
              <td class="text-center border border-gray-300 py-2">
                <p class="text-sm font-medium" v-if="user.userLogin?.status_login === 'online'">
                  <span class="text-green-600">Online</span>
                </p>
                <p class="text-sm font-medium" v-else>
                  <span class="text-red-600">Offline</span>
                </p>
              </td>
              <td class="border-gray-300 p-2">
                <div class="grid grid-cols-[20%_auto] gap-4">
                  <div>
                    <img
                      class="w-24 h-24 rounded-full mx-auto"
                      :src="'data:image/png;base64,' + user.userImage[0]?.imageData"
                      alt="UserImage"
                    />
                  </div>
                  <div class="space-y-2">
                    <label class="text-sm font-medium text-gray-600">
                      Status: <span class="text-gray-800">{{ user.userStatus?.status_name }}</span>
                    </label>
                    <label class="text-sm font-medium text-gray-600">
                      Full Name: <span class="text-gray-800">{{ user.userProfile.title_name }} {{ user.userProfile.full_name }}</span>
                    </label>
                    <label class="text-sm font-medium text-gray-600">
                      Nickname: <span class="text-gray-800">{{ user.userProfile.nick_name }}</span>
                    </label>
                    <label class="text-sm font-medium text-gray-600">
                      Birthday: <span class="text-gray-800">{{ user.userProfile.birth_day }}</span> 
                      <span class="text-gray-500">Age: {{ formatBrithDay(user.userProfile.birth_day) }}</span>
                    </label>
                  </div>
                </div>
              </td>
              <td class="border-gray-300 p-4">
                <div class="space-y-2">
                  <label class="text-sm text-gray-500 font-medium">
                    Tel-phone: <span class="text-gray-800">{{ user.userProfile?.tel_phone }}</span>
                  </label>
                  <label class="text-sm text-gray-500 font-medium">Social Media:</label>
                  <ul class="list-disc list-inside space-y-1 text-gray-800">
                    <!-- Add dynamic social media links if available -->
                  </ul>
                </div>
              </td>
              <td class="text-center border border-gray-300 py-2">
                <div class="dropdown m-auto">
                  <button class="btn btn-sm btn-primary mt-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Event
                  </button>
                  <ul class="dropdown-menu bg-white shadow-lg rounded-lg p-2">
                    <li class="dropdown-submenu">
                      <button class="dropdown-item dropdown-toggle text-sm font-medium py-2">✏️ Edit</button>
                      <ul class="dropdown-menu bg-gray-50 rounded-lg shadow-lg p-2">
                        <li>
                          <button
                            class="dropdown-item text-sm py-2"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditUser"
                          >
                            👤 Edit User
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item text-sm py-2"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditProfile"
                          >
                            📄 Edit Profile
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <button
                        class="dropdown-item text-sm text-red-600 py-2"
                        @click="onDeleteUserProfile(user.id)"
                      >
                        🗑️ Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal Edit User -->
      <div class="modal fade" id="modalEditUser" tabindex="-1" aria-labelledby="modalEditUserLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalEditUserLabel">Edit User</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Edit Profile -->
      <div class="modal fade" id="modalEditProfile" tabindex="-1" aria-labelledby="modalEditProfileLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalEditProfileLabel">Edit Profile</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Tailwind button styles */
.btn-primary {
  background-color: #3498db;
  color: white;
  border-radius: 8px;
  padding: 8px 16px;
  transition: background-color 0.3s ease-in-out;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.dropdown-menu {
  background-color: white;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.2s ease-in-out;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
}

.btn-delete:hover {
  background-color: #c0392b;
}
</style>
