<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useAdminUserProfileStore } from '@/stores/admin.user.profile'
import { useAdminPostStore } from '@/stores/admin.posts'
import { useAdminRewardStore } from '@/stores/admin.rewards'

const route = useRoute()
const router = useRouter()

const adminRewardStore = useAdminRewardStore()
const { storeRewards } = storeToRefs(adminRewardStore)


onMounted(async () => {
  await adminRewardStore.storeAdminAPIGetRewards()
})


</script>
<template>
  <div class="container mt-10">
    <div class="grid grid-cols-2">
      <div class="block mt-10 p-5">
        <a href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="w-full">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../../assets/icon/keyboard.jpg" alt="" />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <RouterLink class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              :to="{ name: 'AdminManagerPostView' }">
              AdminManagerPostView
            </RouterLink>
          </div>
        </a>
      </div>
      <div class="block mt-10 p-5">
        <a href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="w-full">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../../assets/icon/keyboard.jpg" alt="" />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <RouterLink class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              :to="{ name: 'AdminManagerUserProfileView' }">
              AdminManagerUserProfileView
            </RouterLink>
          </div>
        </a>
      </div>
      <div class="block mt-10 p-5">
        <a href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div class="w-full">
            <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../../assets/icon/keyboard.jpg" alt="" />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <RouterLink class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              :to="{ name: 'AdminManagerReward' }">
              AdminManagerReward
            </RouterLink>
          </div>
        </a>
      </div>
    </div>
    <div class="bg-white shadow-sm mt-5 p-5">
      <div class="m-auto p-auto">
        <!-- Report Chart Data API -->
        <div v-if="rewards">
          <div v-for="(reward, index) in rewards" :key="index">
            {{ reward }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
