<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
const { apiGetContactProfile } = useStoreUserProfile()
const route = useRoute()
const contactProfiles = ref({
  id: '',
  name: '',
  icon: [],
})

const props = defineProps({
  contact: Object,
})
console.log("card contact profile", props.contact);

</script>
<template>
  <div
    class="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
      Connect
    </h5>
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400">
    </p>
    <ul class="my-4 " v-for="(contact, index) in props.contact" :key="index">
      <li class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
        <div class="grid grid-cols-3">
          <a :href="contact.url">
            <div>{{ contact.icon_data }}</div>
            <div>{{ contact.name }}</div>
          </a>
        </div>
      </li>
    </ul>
    <div>
      <a
        href="#"
        class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
      >
        <svg
          class="w-3 h-3 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        Why do I need to connect with my wallet?</a
      >
    </div>
  </div>
</template>
