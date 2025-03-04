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
    <div class="bg-white shadow-md rounded-lg">
      <div class="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6">
        <!-- Left Column: Profile Image and Info -->
        <div class="grid grid-rows-2 gap-4 p-5">
          <!-- Profile Image -->
          <div class="flex flex-col items-center">
            <img
              :src="'data:image/png;base64,' + profile.profileImage"
              alt="Profile"
              class="w-24 h-24 rounded-full object-cover mb-4"
            />
            <ModalUploadImageUserProfile />
          </div>
          <!-- Profile Info / Edit Form -->
          <div>
            <div v-if="isShowDetailUser" class="p-auto">
              <h2 class="text-2xl font-semibold text-gray-800">{{ profile.username }}</h2>
              <p class="text-gray-500">{{ profile.email }}</p>
              <p class="text-gray-500">{{ profile.statusName }}</p>
              <button @click="toggleEditDetailUser" type="button" class="mt-4 text-sm text-blue-600">Edit</button>
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
                  <option v-for="status in userStatus" :key="status.id" :value="status.id">
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
        </div>

        <!-- Right Column: Additional Profile Info -->
        <div class="p-5">
          <div v-if="isShowDetailProfile">
            <p>{{ profile.titleName }}</p>
            <h3 class="text-2xl font-semibold text-gray-800">{{ profile.fullName }}</h3>
            <p class="text-gray-500">{{ profile.nickName }}</p>
            <p class="text-gray-500">{{ profile.telPhone }}</p>
            <p class="text-gray-500">{{ profile.birthDay }}</p>
            <p class="text-gray-500">Age: {{ age }}</p>
            <button @click="toggleEditDetailProfile" type="button" class="mt-4 text-sm text-blue-600">Edit</button>
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

    <!-- Statistics Section -->
    <div class="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold">99 +</h3>
        <p class="text-gray-500 text-sm">Followers</p>
      </div>
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold">99 +</h3>
        <p class="text-gray-500 text-sm">Following</p>
      </div>
      <div class="p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 class="text-lg font-semibold">99 +</h3>
        <p class="text-gray-500 text-sm">Posts</p>
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

<style scoped>
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

