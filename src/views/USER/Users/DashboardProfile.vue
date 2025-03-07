<template>
  <div>
    <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5"
      v-if="profile"
    >
      <!-- Profile Image -->
      <div class="flex flex-col items-center">
        <div v-if="profile?.userImage.length" class="mb-4">
          <img
            :src="'data:image/png;base64,' + profile.userImage[0].imageData"
            class="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-400 shadow-lg object-cover"
            alt="User Profile"
          />
        </div>
        <ModalUploadImageUserProfile />
      </div>

      <!-- User Info -->
      <div class="mt-4 text-center">
        <h2 class="text-xl font-semibold">{{ profile.username }}</h2>
        <p class="text-gray-600">{{ profile.email }}</p>
        <div class="flex justify-center items-center gap-2 mt-2">
          <span class="font-semibold">Status:</span>
          <span class="text-blue-500">{{ profile.userStatus.statusName }}</span>
        </div>
        <div class="mt-2 flex justify-end mr-5">
          <ModalEditUser :user="profile" :userStatus="userStatus" />
        </div>
      </div>

      <!-- Profile Details -->
      <div class="mt-6 bg-gray-100 p-2 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700 p-2">
          Personal Information
        </h3>
        <div class="grid grid-cols-2 gap-2 mt-3">
          <div class="text-gray-500 text-center">Full Name:</div>
          <div class="text-gray-700">
            {{ profile.userProfile.titleName }}
            {{ profile.userProfile.fullName }}
          </div>

          <div class="text-gray-500 text-center">Nickname:</div>
          <div class="text-gray-700">{{ profile.userProfile.nickName }}</div>

          <div class="text-gray-500 text-center">Phone:</div>
          <div class="text-gray-700">{{ profile.userProfile.telPhone }}</div>

          <div class="text-gray-500 text-center">Birthday:</div>
          <div class="text-gray-700">{{ formatBirthDay }}</div>

          <div class="text-gray-500 text-center">Age:</div>
          <div class="text-gray-700">{{ formatAge }}</div>
        </div>
        <div class="flex justify-end mt-3">
          <ModalEditProfile :profile="profile.userProfile" />
        </div>
      </div>

      <!-- Profile Contact -->
      <div class="bg-gray-100 p-2 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700 p-2">Contact</h3>
        <div>
          <CardContactProfile :profileID="profile.userProfile.id" :contact="profile.profileContact" />
        </div>
      </div>
    </div>
    <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5"
      v-else
    >
      <label class="m-auto font-bold text-5xl text-red-500">
        User profile information is empty.
      </label>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import { useAuthStore } from '@/stores/auth'
import ModalUploadImageUserProfile from '@/components/ModalUploadImageUserProfile.vue'
import ModalEditUser from '@/components/Modal/EditUser.vue'
import ModalEditProfile from '@/components/Modal/EditProfile.vue'
import CardContactProfile from '@/components/CardContactProfile.vue'

const route = useRoute()
const profile = ref(null)
const userStatus = ref([])
const { apiGetUserStatus } = useAuthStore()
const { apiGetDashboardProfile } = useStoreUserProfile()

onMounted(async () => {
  profile.value = await apiGetDashboardProfile(route.params.id)

  console.log('dashboard profile', profile.value)
  userStatus.value = await apiGetUserStatus()
})

const formatBirthDay = computed(() => {
  if (!profile.value.userProfile.birthDay) {
    return 'Day-Month-Year'
  }
  const birthDate = new Date(profile.value.userProfile.birthDay)
  const day = birthDate.getDate().toString().padStart(2, '0')
  const month = (birthDate.getMonth() + 1).toString().padStart(2, '0')
  const year = birthDate.getFullYear() + 543
  return `${day} / ${month} / ${year}`
})

const formatAge = computed(() => {
  if (!profile.value.userProfile.birthDay) return 'Age not available'
  const birthDate = new Date(profile.value.userProfile.birthDay)
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
</script>
