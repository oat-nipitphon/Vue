<template>
  <div>
    <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5"
      v-if="profile"
    >
      <!-- Profile Image -->
      <div class="bg-green-100">
        <div class="flex justify-center">
          <div v-if="profile?.userImage.length" class="mb-4 mt-4">
            <img
              :src="'data:image/png;base64,' + profile?.userImage[0].imageData"
              class="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-400 shadow-lg object-cover"
              alt="User Profile"
            />
          </div>
          <div v-else class="mb-4 mt-4">
            <img
              src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=Zj9f6Ykgj_MQ7kNvwHns_A6&_nc_oc=Adkw6MZae6jHpAbUcZe99HG3hVwiidVrscZ94RN0Jo4wvbaz0NOpEkzDZ4W76euYEF3rRTNjR5GrTmNdk-4KkMr0&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=yJdfy8i-yAtqoGkditV2CQ&oh=00_AYFvOH4bJXulmE7_72_EuN91LvW9S-6o-gDqcpBWqLCTpg&oe=67F6E571"
              class="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-400 shadow-lg object-cover"
              alt="User Profile"
            />
          </div>
          <div class="flex justify-end">
              <ModalUploadImageUserProfile />
          </div>
        </div>
      </div>

      <!-- User Point -->
      <div class="bg-white mt-3 p-2 rounded-lg">
        <CardUserPoint :profile="profile" />
      </div>

      <!-- User Detail -->
      <div class="mt-6 bg-gray-100 p-2 rounded-lg">
        <div class="p-3">
          <h2 class="text-xl font-semibold">{{ profile?.username }}</h2>

          <div class="grid grid-cols-2">
            <div>
              <p class="font-semibold">Status:</p>
              <p class="text-blue-500">{{
                profile?.userStatus.statusName
              }}</p>
            </div>
            <div>
              <p class="text-gray-600">{{ profile?.email }}</p>
            </div>
          </div>
          <ModalEditUser :user="profile" :userStatus="userStatus" />
        </div>
      </div>

      <!-- Profile Details -->
      <div class="mt-6 bg-gray-100 p-2 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700 p-2">
          Personal Information
        </h3>
        <div>
          <div class="grid grid-cols-[30%_auto] gap-2 mt-3">
            <div class="text-gray-500 text-right">Full Name:</div>
            <div class="text-gray-700">
              {{ profile?.userProfile?.titleName }}
              {{ profile?.userProfile?.fullName }}
            </div>

            <div class="text-gray-500 text-right">Nickname:</div>
            <div class="text-gray-700">
              {{ profile?.userProfile?.nickName }}
            </div>

            <div class="text-gray-500 text-right">Phone:</div>
            <div class="text-gray-700">
              {{ profile?.userProfile?.telPhone }}
            </div>

            <div class="text-gray-500 text-right">Birthday:</div>
            <div class="text-gray-700">{{ formatBirthDay }}</div>

            <div class="text-gray-500 text-right">Age:</div>
            <div class="text-gray-700">{{ formatAge }}</div>
          </div>
          <div class="flex justify-end mt-3">
            <ModalEditProfile :profile="profile?.userProfile" />
          </div>
        </div>
      </div>

      <!-- Profile Contact -->
      <div class="bg-white mt-3 p-2 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-700 p-2">Contact</h3>
        <div>
          <CardContactProfile
            :profileID="profile?.userProfile?.id"
            :contact="profile?.profileContact"
          />
        </div>
      </div>
    </div>
    <!-- <div
      class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-5"
      v-else
    >
      <label class="m-auto font-bold text-5xl text-red-500">
        User profile information is empty.
      </label>
    </div> -->
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
