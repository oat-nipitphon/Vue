<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, reactive, computed, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import { useAuthStore } from '@/stores/auth'
import ModalUploadImageUserProfile from '@/components/ModalUploadImageUserProfile.vue'
import CardAddForm from '@/components/CardAddFrom.vue'

const isShowDetailUser = ref(true)
const isShowDetailProfile = ref(true)
const isEditDetailUser = ref(false)
const isEditDetailProfile = ref(false)

const toggleShowDetailUser = () => {
  isShowDetailUser.value = true
  isEditDetailUser.value = false
}
const toggleShowDetailProfile = () => {
  isShowDetailProfile.value = true
  isEditDetailProfile.value = false
}

const toggleEditDetailUser = () => {
  isShowDetailUser.value = false
  isEditDetailUser.value = true
}
const toggleEditDetailProfile = () => {
  isShowDetailProfile.value = false
  isEditDetailProfile.value = true
}

const age = computed(() => {
  if (!profile.value.birthDay) return 'Age not available'
  const birthDate = new Date(profile.value.birthDay)
  const currentDate = new Date()
  let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear()
  const monthDifference = currentDate.getMonth() - birthDate.getMonth()
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    calculatedAge-- // ลดอายุถ้ายังไม่ถึงวันเกิดในปีนี้
  }
  return `Age ${calculatedAge} years`
})

const route = useRoute()
const authStore = useAuthStore()
const profile = ref(null)
const userStatus = ref([])
const { apiGetDashboardProfile, apiUpdateUser } = useStoreUserProfile()

const form = reactive({
  userID: '',
  name: '',
  email: '',
  username: '',
  statusID: '',
  statusName: '',
  profileID: '',
  titleName: '',
  fullName: '',
  nickName: '',
  telPhone: '',
  birthDay: '',
})

const mapProfile = user => {
  return {
    userID: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    statusID: user?.userStatus?.id || '',
    statusName: user?.userStatus?.status_name || '',

    profileID: user?.userProfile?.id || '',
    titleName: user?.userProfile?.title_name || '',
    fullName: user?.userProfile?.full_name || '',
    nickName: user?.userProfile?.nick_name || '',
    telPhone: user?.userProfile?.tel_phone || '',
    birthDay: user?.userProfile?.birth_day || '',
    profileImage:
      user?.userImage?.length > 0 ? user.userImage[0].imageData : '',
  }
}
const getStatusUser = async () => {
  try {
    const res = await fetch(`/api/status_user`, {
      method: 'GET',
    })

    const data = await res.json()
    if (res.ok) {
      userStatus.value = data.userStatus
      console.log(userStatus.value)
    }
  } catch (error) {
    console.error('register view get status user error', error)
  }
}
onMounted(async () => {
  const data = await apiGetDashboardProfile(route.params.id)
  profile.value = mapProfile(data)
  getStatusUser()
  if (profile.value) {
    form.userID = profile.value.userID
    form.email = profile.value.email
    form.name = profile.value.name
    form.username = profile.value.username
    form.statusID = profile.value.statusID
    form.statusName = profile.value.statusName
    form.profileID = profile.value.profileID
    form.titleName = profile.value.titleName
    form.fullName = profile.value.fullName
    form.nickName = profile.value.nickName
    form.telPhone = profile.value.telPhone
    form.birthDay = profile.value.birthDay
  }
})

watchEffect(() => {
  if (authStore.storeUser) {
    profile.value = mapProfile(authStore.storeUser)
  }
})

const onUpdateUser = async () => {
  const formData = new FormData()
  formData.append('userID', form.userID)
  formData.append('email', form.email)
  formData.append('username', form.username)

  try {
    const response = await axiosAPI.post('/api/update/user', formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    if (response.ok) {
      console.log('update success', response)
    }
  } catch (error) {
    console.error('on update user function error ', error)
  }
}

const onUpdateProfile = async () => {
  const formData = new FormData()
  formData.append('profileID', form.profileID)
  formData.append('titleName', form.titleName)
  formData.append('fullName', form.fullName)
  formData.append('nickName', form.nickName)
  formData.append('telPhone', form.telPhone)
  formData.append('birthDay', form.birthDay)

  try {
    const response = await axiosAPI.post(
      '/api/update/user_profiles',
      formData,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    if (response.ok) {
      console.log('update success', response)
    }
  } catch (error) {
    console.error('on update profile function error ', error)
  }
}
</script>
<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white shadow-lg rounded-lg">
      <div class="mt-5 gap-6">
        <div class="grid grid-cols-2">
          <!-- Profile Image -->
          <!-- <div class="flex justify-center">
            <div class="grid gird-rows-2">
              <img
                class="w-24 h-24 rounded-full object-cover mt-5"
                :src="'data:image/png;base64,' + profile.profileImage"
                alt="Profile"
              />
              <ModalUploadImageUserProfile class="m-auto" />
            </div>
          </div> -->
          <div class="w-full max-w-sm">
            <div class="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span class="sr-only">Open dropdown</span>
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path
                    d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
                  />
                </svg>
              </button>
              <!-- Dropdown menu -->
              <div
                id="dropdown"
                class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
              >
                <ul class="py-2" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Edit</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Export Data</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Delete</a
                    >
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col items-center pb-10">
              <img
                class="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="/docs/images/people/profile-picture-3.jpg"
                alt="Bonnie image"
              />
              <h5
                class="mb-1 text-xl font-medium text-gray-900 dark:text-white"
              >
                Bonnie Green
              </h5>
              <span class="text-sm text-gray-500 dark:text-gray-400"
                >Visual Designer</span
              >
              <div class="flex mt-4 md:mt-6">
                <a
                  href="#"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >Add friend</a
                >
                <a
                  href="#"
                  class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >Message</a
                >
              </div>
            </div>
          </div>
          <div>
            <!-- Statistics Section -->
            <div class="grid grid-rows-3">
              <div class="p-2 mt-4">
                <h3 class="m-auto ml-2 text-lg font-semibold">99 +</h3>
                <p class="text-sm">Followers</p>
              </div>
              <div class="p-2 mt-4">
                <h3 class="m-auto ml-2 text-lg font-semibold">99 +</h3>
                <p class="text-sm">Following</p>
              </div>
              <div class="p-2 mt-4">
                <h3 class="m-auto ml-2 text-lg font-semibold">99 +</h3>
                <p class="text-sm">Posts</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Profile Info / Edit Form -->
        <div class="p-5">
          <div v-if="isShowDetailUser">
            <h2 class="text-2xl font-semibold text-gray-800">
              {{ profile.username }}
            </h2>
            <p class="text-gray-500">{{ profile.email }}</p>
            <p class="text-gray-500">{{ profile.statusName }}</p>
            <button
              @click="toggleEditDetailUser"
              type="button"
              class="mt-4 text-sm text-blue-600"
            >
              Edit
            </button>
          </div>
          <div v-if="isEditDetailUser" class="space-y-4">
            <h2 class="text-2xl font-semibold text-gray-800">
              <input
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
                type="text"
                id="username"
                v-model="form.username"
                placeholder="Enter username"
              />
            </h2>
            <p>
              <input
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
                type="email"
                id="email"
                v-model="form.email"
                placeholder="Enter email"
              />
            </p>
            <p>
              <select
                v-model="form.statusID"
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
              >
                <option value="null" disabled>Select Status</option>
                <option
                  v-for="status in userStatus"
                  :key="status.id"
                  :value="status.id"
                >
                  {{ status.status_name }}
                </option>
              </select>
            </p>
            <div class="flex gap-3">
              <button
                class="btn btn-sm btn-primary w-full"
                type="submit"
                @click="onUpdateUser()"
              >
                Update
              </button>
              <button
                @click="toggleShowDetailUser"
                type="button"
                class="w-full text-red-500 border border-red-500 p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <!-- Right Column: Additional Profile Info -->
        <div class="p-5">
          <div v-if="isShowDetailProfile">
            <p>{{ profile.titleName }}</p>
            <h3 class="text-2xl font-semibold text-gray-800">
              {{ profile.fullName }}
            </h3>
            <p class="text-gray-500">{{ profile.nickName }}</p>
            <p class="text-gray-500">{{ profile.telPhone }}</p>
            <p class="text-gray-500">{{ profile.birthDay }}</p>
            <p class="text-gray-500">Age: {{ age }}</p>
            <button
              @click="toggleEditDetailProfile"
              type="button"
              class="mt-4 text-sm text-blue-600"
            >
              Edit
            </button>
          </div>
          <div v-if="isEditDetailProfile" class="space-y-4">
            <h3 class="text-2xl font-semibold text-gray-800">Update Profile</h3>
            <p>
              <select
                v-model="form.titleName"
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
              >
                <option value="mr">Mr.</option>
                <option value="miss">Miss.</option>
                <option value="mrs">Mrs.</option>
              </select>
            </p>
            <p>
              <input
                v-model="form.fullName"
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
                type="text"
                placeholder="Full Name"
              />
            </p>
            <p>
              <input
                v-model="form.nickName"
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
                type="text"
                placeholder="Nick Name"
              />
            </p>
            <p>
              <input
                v-model="form.telPhone"
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
                type="text"
                placeholder="Tel Phone"
              />
            </p>
            <p>
              <input
                v-model="form.birthDay"
                class="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-gray-900"
                type="date"
              />
            </p>
            <div class="flex gap-3">
              <button
                class="btn btn-sm btn-primary w-full"
                type="submit"
                @click="onUpdateProfile()"
              >
                Update
              </button>
              <button
                @click="toggleShowDetailProfile"
                type="button"
                class="w-full text-red-500 border border-red-500 p-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Settings & Actions Section -->
    <div class="mt-6 bg-white shadow-md rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3">Settings</h3>
      <div class="flex justify-between items-center mb-3">
        <p class="text-gray-600">Enable Notifications</p>
        <input type="checkbox" class="toggle-checkbox" />
      </div>
      <div class="flex justify-between items-center">
        <p class="text-gray-600">Dark Mode</p>
        <input type="checkbox" class="toggle-checkbox" />
      </div>
    </div>

    <!-- Card add profile contacts -->
    <div class="mt-6 flex justify-center shadow-lg">
      <div class="m-auto w-max-lg p-5">
        <CardAddForm />
      </div>
    </div>
  </div>
</template>
