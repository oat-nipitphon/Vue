<script setup>
import { reactive, ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import ModalUploadImageUserProfile from '@/components/ModalUploadImageUserProfile.vue'
import CardFollowers from '@/components/CardFollowers.vue'
import CardContactProfile from '@/components/CardAddFrom.vue'
const defaultProfileImage =
  'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=_8IVpzSUJz8Q7kNvgH981ad&_nc_oc=AdjwNRCxXwtMr0TUQFjkBXTSR68KItzLfOXsS06bglRQ93A4l_N8TKdv4UJtxEVVgHa4BQVpEdDKu6htxiHQdrbk&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AhlEAgeCssMinnIwKJwfgMQ&oh=00_AYBEFNyZ8w4XoptZM9dz2smOltNWG3lclgbLROlVgZYUVg&oe=67B024F1'

const route = useRoute()
const statusUser = ref(null)
const userProfile = ref(null)
const userProfileImage = ref(null)
const isEventSpanDetailProfile = ref(true)
const isEventInputDetailProfile = ref(false)
const isEventButtonEditDetailProfile = ref(true)
const isEventButtonUpdateDetailProfile = ref(false)
const isEventButtonCencelUpdateDetailProfile = ref(false)

const toggleEventInputDetailProfile = async () => {
  isEventInputDetailProfile.value = true
  isEventSpanDetailProfile.value = false
  isEventButtonUpdateDetailProfile.value = true
  isEventButtonCencelUpdateDetailProfile.value = true
  isEventButtonEditDetailProfile.value - false
}

const toggleEventCencelUpdateProfile = async () => {
  isEventInputDetailProfile.value = false
  isEventSpanDetailProfile.value = true
  isEventButtonUpdateDetailProfile.value = false
  isEventButtonCencelUpdateDetailProfile.value = false
  isEventButtonEditDetailProfile.value - true
}

const {
  apiGetAllUserProfile,
  apiGetStatusUser,
  apiUpdateDetailUserProfile,
  apiUploadImageUserProfile,
} = useStoreUserProfile()

const imageFile = ref(null)
const imageUrl = ref(null)
const formData = reactive({
  userID: '',
  name: '',
  email: '',
  userName: '',
  statusID: '',
  statusName: '',
  profileID: '',
  titleName: '',
  fullName: '',
  nickName: '',
  telPhone: '',
  birthDay: '',
})

const age = computed(() => {
  if (!formData.birthDay) return 'Age not available'
  const birthDate = new Date(formData.birthDay)
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

onMounted(async () => {
  userProfile.value = await apiGetAllUserProfile(route.params.id)
  if (userProfile.value) {
    formData.userID = userProfile.value.id || ''
    formData.name = userProfile.value.name || ''
    formData.email = userProfile.value.email || ''
    formData.userName = userProfile.value.username || ''
    formData.statusID = userProfile.value.userStatus.id || ''
    formData.statusName = userProfile.value.userStatus.status_name || ''
    formData.profileID = userProfile.value.userProfile.id || ''
    formData.titleName = userProfile.value.userProfile.title_name || ''
    formData.fullName = userProfile.value.userProfile.full_name || ''
    formData.nickName = userProfile.value.userProfile.nick_name || ''
    formData.telPhone = userProfile.value.userProfile.tel_phone || ''
    formData.birthDay = userProfile.value.userProfile.birth_day || ''
    if (userProfile.value.userProfileImage) {
      imageFile.value =
        userProfile.value.userProfileImage?.map(imageProfile => ({
          id: imageProfile.id,
          imageData: imageProfile.imageData,
        })) || []
    }
  }
  statusUser.value = await apiGetStatusUser()
})

const btnUpdateProfile = async () => {
  await apiUpdateDetailUserProfile(formData)
}
</script>
<template>
  <div v-if="userProfile">
    <div class="grid grid-cols-2">
      <!-- Image Profile -->
      <div v-if="userProfile.userImage" class="p-5">
        <div v-for="(image, index) in userProfile.userImage" :key="index">
          <img
            class="ibox-image-profile rounded-full"
            :src="
              'data:image/png;base64,' + image.imageData ||
              'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png'
            "
            alt="User-Image"
          />
          <span class="flex justify-end">
            <ModalUploadImageUserProfile />
          </span>
        </div>
      </div>
      <!-- Detail Profile -->
      <div class="p-5">
        <!-- Card Show Detail Profile -->
        <div class="space-y-4" v-if="isEventSpanDetailProfile">
          <div class="font-semibold text-gray-500 dark:text-white">
            <div class="font-semibold text-gray-900 dark:text-white">
              Status account
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ userProfile.userStatus.status_name }}
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <div class="font-semibold text-gray-900 dark:text-white">
              Full name
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ userProfile.userProfile.title_name }}
              {{ userProfile.userProfile.full_name }}
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <div class="font-semibold text-gray-900 dark:text-white">
              Nick Name
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ userProfile.userProfile.nick_name }}
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <div class="font-semibold text-gray-900 dark:text-white">
              Email Address
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ userProfile.email }}
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <div class="font-semibold text-gray-900 dark:text-white">
              Tel phone
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ userProfile.userProfile.tel_phone }}
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <div class="font-semibold text-gray-900 dark:text-white">
              Birth day
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              {{ age }}
            </div>
          </div>
          <div class="flex justify-end ml-5">
            <button
              v-if="isEventButtonEditDetailProfile"
              @click="toggleEventInputDetailProfile"
              type="button"
              class="btn btn-danger btn-md"
            >
              Edit
            </button>
          </div>
        </div>

        <!-- Card Edit Detail Profile -->
        <div class="space-y-4" v-if="isEventInputDetailProfile">
          <div class="font-semibold text-gray-500 dark:text-white">
            <div v-if="userProfile.userStatus">
              <label
                for="status"
                class="block text-sm font-medium text-gray-900"
              >
                Status account
              </label>
              <select
                v-if="userProfile.status_id === '1'"
                id="status"
                v-model="formData.statusID"
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              >
                <option value="null" disabled>select status</option>
                <option
                  v-for="status in userProfile.userStatus"
                  :key="status.id"
                  :value="status.id"
                >
                  {{ status.status_name }}
                </option>
              </select>
              <label v-else class="text-gray-500 dark:text-gray-400">
                {{ userProfile.userStatus.status_name }}
              </label>
            </div>
            <div v-else>
              <h4>ไม่มีข้อมูล</h4>
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <label
              for="titleName"
              class="block text-sm font-medium text-gray-900"
            >
              Title name
            </label>
            <div class="font-semibold text-gray-500 dark:text-white">
              <select
                v-model="formData.titleName"
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              >
                <option value="mr">Mr.</option>
                <option value="miss">Miss.</option>
                <option value="mrs">Mrs.</option>
              </select>
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-900"
            >
              full name
            </label>
            <div class="text-gray-500 dark:text-gray-400">
              <input
                v-model="formData.fullName"
                type="text"
                id="fullName"
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
          </div>

          <div class="font-semibold text-gray-500 dark:text-white">
            <label
              for="nickName"
              class="block text-sm font-medium text-gray-900"
            >
              Nick Name
            </label>
            <div class="text-gray-500 dark:text-gray-400">
              <input
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                type="text"
                v-model="formData.nickName"
              />
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <label class="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <div class="text-gray-500 dark:text-gray-400">
              <input
                v-model="formData.email"
                type="email"
                id="email"
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
              />
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <label class="block text-sm font-medium text-gray-900">
              Phone Number
            </label>
            <div class="text-gray-500 dark:text-gray-400">
              <input
                type="text"
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                v-model="formData.telPhone"
              />
            </div>
          </div>
          <div class="font-semibold text-gray-500 dark:text-white">
            <div>
              <label class="block text-sm font-medium text-gray-900">
                Birth day
              </label>
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              <input
                type="date"
                class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
                v-model="formData.birthDay"
              />
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button
              style="margin: 10px"
              v-if="isEventButtonUpdateDetailProfile"
              @click="btnUpdateProfile"
              type="button"
              class="btn btn-primary btn-sm"
            >
              <i class="update"></i> update
            </button>
            <button
              style="margin: 10px"
              v-if="isEventButtonCencelUpdateDetailProfile"
              @click="toggleEventCencelUpdateProfile"
              class="btn btn-sm btn-outline-danger"
              type="button"
            >
              cencel
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            data-modal-target="accountInformationModal2"
            data-modal-toggle="accountInformationModal2"
            class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
          >
            <svg
              class="-ms-0.5 me-1.5 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              ></path>
            </svg>
            Edit your data
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <!-- Followers Profile  -->
      <div class="p-5">
        <CardContactProfile />
      </div>

      <!-- Contact Profile -->
      <div class="p-5">
        <div>
          <CardFollowers />
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center">
    <h1 class="text-red-500">Account false.</h1>
  </div>
</template>
