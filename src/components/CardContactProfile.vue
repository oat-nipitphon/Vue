<script setup>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import ModalFormContactProfile from './ModalFormContactProfile.vue'

const route = useRoute()
const { apiGetContactProfile } = useStoreUserProfile()

const props = defineProps({
  profileID: Number,
  contact: Object,
})
console.log('card contact profile ', props)

const contacts = ref([])
const form = reactive({
  contactID: '',
  name: '',
  url: '',
  icon: [],
})
</script>
<template>
  <div
    class="w-full max-w-md m-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="grid grid-cols-2">
      <div class="p-2">
        <h5
          class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white"
        >
          Contact Profile
        </h5>
      </div>
      <div class="flex justify-end">
        <ModalFormContactProfile :profileID="props.profileID" />
      </div>
    </div>
    <ul class="my-4 space-y-3" v-if="props.contact">
      <li v-for="(contact, index) in props.contact" :key="index">
        <a
          class="flex items-center mt-2 p-2 text-base font-bold text-gray-900 shadow-lg rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
          :href="contact.url"
        >
          <img :src="'data:image/png;base64,' + contact.icon" class="w-10 h-10 rounded-sm m-auto" alt="ContactProfile" />
          <span class="flex-1 ms-3 whitespace-nowrap">{{ contact.name }}</span>
          <span
            class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded-sm dark:bg-gray-700 dark:text-gray-400"
          >
          {{ contact.name }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>
