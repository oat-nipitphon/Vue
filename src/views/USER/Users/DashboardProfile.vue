<script setup>
import { ref, reactive, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const route = useRoute()
const { apiGetDashboardProfile } = useStoreUserProfile()

const profile = ref(null)
const imageFile = ref(null)
const imageUrl = ref(null)
const form = reactive({
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

const mapProfile = user => {
  return {
    userID: user?.user_login?.id || null,
    name: user?.user_login?.name || '',
    email: user?.user_login?.email || '',
    username: user?.username || '',
    statusID: user?.userStatus?.id || null,
    statusName: user?.userStatus?.status_name || '',
    profileID: user?.userProfile?.id || null,
    titleName: user?.userProfile?.title_name || '',
    fullName: user?.userProfile?.full_name || '',
    nickName: user?.userProfile?.nick_name || '',
    telPhone: user?.userProfile?.tel_phone || '',
    birthDay: user?.userProfile?.birth_day || '',
    profileImage:
      user?.userImage?.length > 0 ? user.userImage[0].imageData : null,
  }
}

onMounted(async () => {
  const data = await apiGetDashboardProfile(route.params.id)
  console.log('Dashboard Profile', data)
  profile.value = mapProfile(data)
})

watchEffect(() => {
  if (authStore.storeUser) {
    profile.value = mapProfile(authStore.storeUser)
  }
})
</script>
<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Profile Card -->
    <div class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
      <img
          :src="'data:image/png;base64,' + profile.profileImage"
          alt="Profile"
          class="w-24 h-24 rounded-full mb-3"
        />
      <h2 class="text-xl font-semibold">Name</h2>
      <p class="text-gray-500">Email</p>
      <!-- <span class="px-3 py-1 mt-2 text-sm rounded-full" :class="user.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'">
        {{ user.status }}
      </span> -->

      <button
        @click="editProfile"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Edit Profile
      </button>
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
