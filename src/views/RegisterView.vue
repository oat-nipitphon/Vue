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
  <div class="w-full flex items-center justify-center mt-12">
    <div
      class="w-full bg-white rounded-lg shadow sm:max-w-md p-6 space-y-6 mt-12"
    >
      <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900">
        Create an account
      </h1>
      <form
        class="space-y-4"
        @submit.prevent="apiStoreRegister(`register`, form)"
      >
        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
            placeholder="name@flowbite.com"
          />
          <p v-if="!form.email" class="text-red-600 text-sm mt-2">
            Please input your email.
          </p>
        </div>

        <!-- Username Field -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            v-model="form.username"
            type="text"
            id="username"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
            placeholder="Your username"
          />
          <p v-if="!form.username" class="text-red-600 text-sm mt-2">
            Please input your username.
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
          />
          <p v-if="!form.password" class="text-red-600 text-sm mt-2">
            Please input your password.
          </p>
        </div>

        <!-- Confirm Password Field -->
        <div>
          <label
            for="confirm-password"
            class="block text-sm font-medium text-gray-900"
          >
            Confirm Password
          </label>
          <input
            v-model="form.confirmPassword"
            type="password"
            id="confirm-password"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
          />
          <p
            v-if="passwordConfirmErrorMessage"
            class="text-red-600 text-sm mt-2"
          >
            {{ passwordConfirmErrorMessage }}
          </p>
        </div>
        <!-- Status Dropdown -->
        <div class="inline-block relative w-full">
          <label
            for="User-Status"
            class="block text-sm font-medium text-gray-900"
          >
            Status
          </label>
          <select
            v-model="form.statusID"
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select status account</option>
            <option 
              v-for="status in userStatus"
              :key="status.id"
              :value="status.id"
            >
              {{ status.name }} {{ status.id }}
            </option>
          </select>
        </div>
        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-blue-700 text-white rounded-lg px-4 py-2"
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
