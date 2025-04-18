<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import { useAuthStore } from '@/stores/auth'
import ModalUploadImageUserProfile from '@/components/ModalUploadImageUserProfile.vue'
import ModalEditUser from '@/components/Modal/EditUser.vue'
import ModalEditProfile from '@/components/Modal/EditProfile.vue'
import CardContactProfile from '@/components/CardContactProfile.vue'
import CardUserPoint from '@/components/UserPoint/CardUserPoint.vue'

const route = useRoute()
const profile = ref(null)
const userStatus = ref([])
const { apiGetUserStatus } = useAuthStore()
const { apiGetDashboardProfile } = useStoreUserProfile()

onMounted(async () => {
  profile.value = await apiGetDashboardProfile(route.params.id)
  userStatus.value = await apiGetUserStatus()
})

const formatBirthDay = computed(() => {
  if (!profile.value.userProfile?.birthDay) {
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
<template>
  <div>
    <div class="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-8 border border-gray-200" v-if="profile">
      <!-- Header Grid -->
      <div class="grid grid-cols-[250px_1fr] gap-6">
        <!-- User Image -->
        <div class="flex flex-col items-center justify-between bg-gray-50 rounded-xl p-4">
          <div v-if="profile?.userImage.length" class="w-48 h-48 overflow-hidden rounded-full shadow-md">
            <img :src="'data:image/png;base64,' + profile?.userImage[0].imageData" alt="User Profile"
              class="w-full h-full object-cover" />
          </div>
          <div class="mt-6">
            <ModalUploadImageUserProfile />
          </div>
        </div>

        <!-- Profile Details -->
        <div>
          <div class="bg-gray-50 p-6 rounded-xl shadow-inner">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-xl font-semibold text-gray-700">รายละเอียด</h3>
              <ModalEditUser :user="profile" :userStatus="userStatus" />
            </div>

            <div class="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div class="text-gray-500">ชื่อผู้ใช้:</div>
              <div class="text-gray-800 font-medium">{{ profile?.username }}</div>

              <div class="text-gray-500">อีเมล์:</div>
              <div class="text-gray-800 font-medium">{{ profile?.email }}</div>

              <div class="text-gray-500">ชื่อ-นามสกุล:</div>
              <div class="text-gray-800 font-medium">
                {{ profile?.userProfile?.titleName }}
                {{ profile?.userProfile?.fullName }}
              </div>

              <div class="text-gray-500">ชื่อเล่น:</div>
              <div class="text-gray-800 font-medium">{{ profile?.userProfile?.nickName }}</div>

              <div class="text-gray-500">เบอร์โทรศัพท์:</div>
              <div class="text-gray-800 font-medium">{{ profile?.userProfile?.telPhone }}</div>

              <div class="text-gray-500">วัน เดือน ปีเกิด:</div>
              <div class="text-gray-800 font-medium">{{ formatBirthDay }}</div>

              <div class="text-gray-500">อายุ:</div>
              <div class="text-gray-800 font-medium">{{ formatAge }}</div>
            </div>

            <div class="flex justify-end mt-6">
              <ModalEditProfile :profile="profile?.userProfile" />
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="bg-white mt-6 p-6 rounded-xl border-t border-gray-200 shadow-sm">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">ช่องทางติดต่อ</h3>
        <CardContactProfile :profileID="profile?.userProfile?.id" :contact="profile?.profileContact" />
      </div>
    </div>
  </div>
</template>
