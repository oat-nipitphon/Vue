<script setup>
import axios from 'axios'
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const { errors } = storeToRefs(useAuthStore())
const { apiStoreRegister } = useAuthStore()
const userStatus = ref([])

const getStatusUser = async () => {
  try {
    const res = await fetch(`/api/status_user`, {
      method: 'GET',
    })

    const data = await res.json()
    if (res.ok) {
      userStatus.value = data.userStatus
      console.log(userStatus.value)
    }
  } catch (error) {
    console.error('register view get status user error', error)
  }
}

const form = reactive({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  statusID: "",
})

const passwordConfirmErrorMessage = computed(() => {
  if (!form.confirmPassword) return 'Please input confirm password.'
  if (form.password !== form.confirmPassword)
    return 'Passwords do not match.'
  return ''
})

onMounted(async () => {
  getStatusUser()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <div
      class="py-8 px-4 mx-auto max-w-2xl lg:py-16"
    >
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Register account
      </h2>
      <form
        class=""
        @submit.prevent="apiStoreRegister(`register`, form)"
      >
        <!-- Email Field -->
        <div>
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            type="email"
            id="email"
            required=""
            placeholder="email@gmail.com" 
            v-model="form.email"
          />
          <p v-if="!form.email" class="text-red-600 text-sm mt-2">
            Please input your email.
          </p>
          <p v-else class="text-white text-sm mt-2">
            Successfully.
          </p>
        </div>

        <!-- Username Field -->
        <div>
          <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username
          </label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            type="username"
            id="username"
            required=""
            placeholder="username" 
            v-model="form.username"
          />
          <p v-if="!form.username" class="text-red-600 text-sm mt-2">
            Please input your username.
          </p>
          <p v-else class="text-white text-sm mt-2">
            Successfully.
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            type="password"
            id="password"
            required=""
            placeholder="********" 
            v-model="form.password"
          />
          <p v-if="!form.password" class="text-red-600 text-sm mt-2">
            Please input your password.
          </p>
          <p v-else class="text-white text-sm mt-2">
            Successfully.
          </p>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label
            for="confirm-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm Password
          </label>
          <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            type="password"
            id="confirmPassword"
            required=""
            placeholder="confirmPassword" 
            v-model="form.confirmPassword"
          />
          <p
            v-if="passwordConfirmErrorMessage"
            class="text-red-600 text-sm mt-2"
          >
            {{ passwordConfirmErrorMessage }}
          </p>
          <p v-else class="text-white text-sm mt-2">
            Successfully.
          </p>
        </div>
        <!-- Status Dropdown -->
        <div class="inline-block relative w-full">
          <label
            for="User-Status"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <select
            v-model="form.statusID"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">Select status account</option>
            <option 
              v-for="status in userStatus"
              :key="status.id"
              :value="status.id"
            >
              {{ status.status_name }}
            </option>
          </select>
          <p v-if="!form.statusID" class="text-red-600 text-sm mt-2">
            Please select your status.
          </p>
          <p v-else class="text-white text-sm mt-2">
            Successfully.
          </p>
        </div>
        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-blue-700 text-white rounded-lg px-4 py-2 mt-5"
        >
          Create account
        </button>
      </form>
      <div
        class="mt-5 text-right text-sm font-medium text-gray-500 dark:text-gray-300"
      >
        Already have an account?
        <RouterLink
          class="text-blue-700 hover:underline dark:text-blue-500"
          :to="{ name: 'LoginView' }"
        >
          Login
        </RouterLink>
      </div>
    </div>
  </div>
</template>
