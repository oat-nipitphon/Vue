<template>
  <div class="container p-5 m-auto mt-5 shadow-lg rounded-lg" v-if="profile">
    <div
      class="flex justify-center"
      v-for="(image, index) in profile.userImage"
      :key="index"
    >
      <img
        :src="'data:image/png;base64,' + image.imageData"
        class="w-50 h-50 rounded-lg"
        alt=""
      />
    </div>
    <div class="flex justify-center">
      <ModalUploadImageUserProfile />
    </div>
    <div class="m-auto mt-3">
      <div class="flex justify-center">{{ profile.username }}</div>
      <div class="flex justify-center">{{ profile.email }}</div>
      <div class="grid grid-cols-2">
        <div class="text-right mr-1">status</div>
        <div class="ml-1">{{ profile.userStatus.statusName }}</div>
      </div>
      <div class="flex">
        <ModalEditUser :user="profile" :userStatus="userStatus" />
      </div>
    </div>
    <div class="m-auto mt-3">
      <div class="flex justify-center">
        {{ profile.userProfile.titleName }} {{ profile.userProfile.fullName }}
      </div>
      <div class="flex justify-center">
        {{ profile.userProfile.nickName }}
      </div>
      <div class="flex justify-center">
        {{ profile.userProfile.telPhone }}
      </div>
      <div class="flex justify-center">
        {{ formatBirthDay }}
      </div>
      <div class="flex justify-center">
        {{ formatAge }}
      </div>
      <div class="flex justify-end">
        <ModalEditProfile :profile="profile.userProfile" />
      </div>
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
