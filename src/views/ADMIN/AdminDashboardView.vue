<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="container mt-10">
    <div class="grid grid-cols-2">
      <div class="block mt-10 p-5">
        <a
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div class="w-full">
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../../assets/icon/keyboard.jpg"
              alt=""
            />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <RouterLink
              class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              :to="{ name: 'AdminManagerPostView' }"
            >
              AdminManagerPostView
            </RouterLink>
          </div>
        </a>
      </div>
      <div class="block mt-10 p-5">
        <a
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div class="w-full">
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../../assets/icon/keyboard.jpg"
              alt=""
            />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <RouterLink
              class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              :to="{ name: 'AdminManagerUserProfileView' }"
            >
              AdminManagerUserProfileView
            </RouterLink>
          </div>
        </a>
      </div>
      <div class="block mt-10 p-5">
        <a
          href="#"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div class="w-full">
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="../../assets/icon/keyboard.jpg"
              alt=""
            />
          </div>
          <div class="flex flex-col justify-between p-4 leading-normal">
            <RouterLink
              class="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white"
              :to="{ name: 'AdminManagerReward' }"
            >
              AdminManagerReward
            </RouterLink>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
