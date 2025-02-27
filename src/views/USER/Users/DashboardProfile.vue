<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, reactive, computed, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import { useAuthStore } from '@/stores/auth'
import ModalUploadImageUserProfile from '@/components/ModalUploadImageUserProfile.vue'

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
    <div class="bg-white shadow-md rounded-lg">
      <div class="grid grid-cols-[40%_auto]">
        <div class="grid grid-rows-2 p-5">
          <div class="">
            <img
              :src="'data:image/png;base64,' + profile.profileImage"
              alt="Profile"
              class="w-24 h-24 rounded-full"
            />
            <ModalUploadImageUserProfile />
          </div>
          <div>
            <div v-if="isShowDetailUser" class="p-auto">
              <h2 class="text-xl font-semibold">{{ profile.username }}</h2>
              <p class="text-gray-500">{{ profile.email }}</p>
              <p class="text-gray-500">{{ profile.statusName }}</p>
              <button @click="toggleEditDetailUser" type="submit">edit</button>
            </div>
            <div v-if="isEditDetailUser">
              <h2 class="text-xl font-semibold">
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  type="username"
                  id="username"
                  v-model="form.username"
                />
              </h2>
              <p class="text-gray-500">
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  type="email"
                  id="email"

                  v-model="form.email"
                />
              </p>
              <p class="text-gray-500">
                <select
                  v-model="form.statusID"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="null" disabled>select status</option>
                  <option
                    v-for="status in userStatus"
                    :key="status.id"
                    :value="status.id"
                  >
                    {{ status.status_name }}
                  </option>
                </select>
              </p>
              <button
                class="btn btn-sm btn-primary"
                type="submit"
                @click="onUpdateUser()"
              >
                update
              </button>
              <button @click="toggleShowDetailUser" type="submit">
                cancel
              </button>
            </div>
          </div>
        </div>
        <div class="grid">
          <div class="p-5">
            <div v-if="isShowDetailProfile">
              <p>{{ profile.titleName }}</p>
              <h3>{{ profile.fullName }}</h3>
              <p>{{ profile.nickName }}</p>
              <p>{{ profile.telPhone }}</p>
              <p>{{ profile.birthDay }}</p>
              <p>Age{{ age }}</p>
              <button @click="toggleEditDetailProfile" type="submit">
                edit
              </button>
            </div>
            <div v-if="isEditDetailProfile">
              <h3>Update profile</h3>
              <p>
                <select
                  class="form-control"

                  v-model="form.titleName"
                >
                  <option value="mr">Mr.</option>
                  <option value="miss">Miss.</option>
                  <option value="mrs">Mrs.</option>
                </select>
              </p>
              <p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="full name"

                  v-model="form.fullName"
                />
              </p>
              <p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="nick name"

                  v-model="form.nickName"
                />
              </p>
              <p>
                <input
                  class="form-control"
                  type="text"
                  placeholder="tel phone"

                  v-model="form.telPhone"
                />
              </p>
              <p>
                <input

                  v-model="form.birthDay"
                  class="form-control"
                  type="date"
                />
              </p>
              <button
                class="btn btn-sm btn-primary"
                type="submit"
                @click="onUpdateProfile()"
              >
                update
              </button>
              <button @click="toggleShowDetailProfile" type="submit">
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="mt-6 grid grid-cols-3 gap-4 text-center">
      <div class="p-4 bg-gray-100 rounded-lg">
        <h3 class="text-lg font-semibold">99 +</h3>
        <p class="text-gray-500 text-sm">Followers</p>
      </div>
      <div class="p-4 bg-gray-100 rounded-lg">
        <h3 class="text-lg font-semibold">99 +</h3>
        <p class="text-gray-500 text-sm">Following</p>
      </div>
      <div class="p-4 bg-gray-100 rounded-lg">
        <h3 class="text-lg font-semibold">99 +</h3>
        <p class="text-gray-500 text-sm">Posts</p>
      </div>
    </div>

    <!-- Settings & Actions -->
    <div class="mt-6 bg-white shadow-md rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3">Settings</h3>
      <div class="flex justify-between items-center">
        <p class="text-gray-600">Enable Notifications</p>
        <input type="checkbox" class="toggle-checkbox" />
      </div>
      <div class="flex justify-between items-center mt-3">
        <p class="text-gray-600">Dark Mode</p>
        <input type="checkbox" class="toggle-checkbox" />
      </div>
    </div>
  </div>
</template>

<style>
.toggle-checkbox {
  width: 40px;
  height: 20px;
  background: #ccc;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
}

.toggle-checkbox:before {
  content: '';
  width: 18px;
  height: 18px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 2px;
  transition: all 0.3s;
}

.toggle-checkbox:checked {
  background: #4caf50;
}

.toggle-checkbox:checked:before {
  left: 20px;
}
</style>
