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
  <div class="container">
    <div class="block shadow-lg mt-10 m-auto p-5">
      <div>
        <h2 class="text-xl font-semibold mb-4">User Profile Manager</h2>
      </div>
      <div class="w-full">
        <table class="w-full border-collapse border border-gray-300">
          <thead class="bg-gray-200 text-gray-700">
            <tr class="h-12">
              <th class="w-1/12 p-2 text-center border border-gray-300">
                Status
              </th>
              <th class="w-1/6 p-2 text-center border border-gray-300">
                Profile
              </th>
              <th class="w-1/6 p-2 text-center border border-gray-300">
                Contact
              </th>
              <th class="w-1/12 p-2 text-center border border-gray-300">
                Followers
              </th>
            </tr>
          </thead>
          <tbody v-if="paginateduserProfiles.length">
            <tr
              class="h-10"
              v-for="(user, index) in paginateduserProfiles"
              :key="index"
            >
              <td class="text-center border border-gray-300">
                <p
                  class="text-sm text-green-600 font-medium"
                  v-if="user.userLogin?.status_login === 'online'"
                >
                  {{ user.userLogin?.status_login }}
                </p>
                <p class="text-sm text-red-600 font-medium" v-else>
                  {{ user.userLogin?.status_login }}
                </p>
              </td>
              <td class="border-gray-300 p-2">
                <div class="grid grid-cols-[20%_auto]">
                  <div>
                    <p
                      class=""
                      v-for="(image, index) in user.userImage"
                      :key="index"
                    >
                      <img
                        class="size-10 rounded-full m-auto"
                        :src="'data:image/png;base64,' + image?.imageData"
                        alt="UserImage"
                      />
                    </p>
                  </div>
                  <div class="grid grid-rows-4">
                    <label class="text-sm">
                      status: {{ user.userStatus?.status_name }}
                    </label>
                    <label class="text-sm">
                      fullname: {{ user.userProfile.title_name }}
                      {{ user.userProfile.full_name }}
                    </label>
                    <label class="text-sm">
                      nickname: {{ user.userProfile.nick_name }}
                    </label>
                    <label class="text-sm">
                      brithday: {{ user.userProfile.birth_day }} Age:
                      {{ formatBrithDay(user.userProfile.birth_day) }}
                    </label>
                  </div>
                </div>
              </td>
              <td class="p-4 border border-gray-300">
                <div class="grid grid-rows-2">
                  <label class="text-sm text-gray-500 font-medium">
                    Tel-phone: {{ user.userProfile?.tel_phone }}
                  </label>
                  <div>
                    <label class="text-sm text-gray-500 font-medium">
                      Social Media:
                    </label>
                  </div>
                </div>
              </td>
              <td class="text-center border border-gray-300">
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
                    <li class="dropdown-submenu">
                      <button class="dropdown-item dropdown-toggle">
                        ✏️ Edit
                      </button>
                      <ul class="dropdown-menu">
                        <li>
                          <button
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditUser"
                          >
                            👤 User
                          </button>
                        </li>
                        <li>
                          <button
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditProfile"
                          >
                            📄 Profile
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li><hr class="dropdown-divider" /></li>
                    <li>
                      <button class="dropdown-item btn-delete"
                        @click="onDeleteUserProfile(user.id)"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div class="grid grid-cols-[auto_50%_auto]">
        <button type="submit" class="btn btn-md btn-primary">Back</button>
        <span class="m-auto text-sm text-gray-900"> 1 2 3 4 </span>
        <button type="submit" class="btn btn-md btn-primary">Next</button>
      </div> -->

      <!-- Modal Edit User -->
      <div
        class="modal fade"
        id="modalEditUser"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Edit Profile -->
      <div
        class="modal fade"
        id="modalEditProfile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
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
  background-color: #ffffff; /* สีพื้นหลังขาว */
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
  background-color: #e74c3c; /* สีแดง */
  color: white;
}

.btn-unblock {
  background-color: #2ecc71; /* สีเขียว */
  color: white;
}

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  right: 100%;
  margin-top: -5px;
  display: none;
}

.dropdown-submenu:hover .dropdown-menu {
  display: block;
}
</style>
