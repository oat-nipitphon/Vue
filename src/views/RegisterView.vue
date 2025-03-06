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
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  statusID: '',
})

const passwordConfirmErrorMessage = computed(() => {
  if (!form.confirmPassword) return 'โปรดกรอกรหัสผ่านอีกครั้ง.'
  if (form.password !== form.confirmPassword) return 'รหัสผ่านของท่านไม่ตรงกัน.'
  return ''
})

onMounted(async () => {
  getStatusUser()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ลงทะเบียน
      </h2>
      <form class="" @submit.prevent="apiStoreRegister(`register`, form)">
        <!-- Status Dropdown -->
        <div class="inline-block relative w-full">
          <label
            for="User-Status"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            สถานะบัญชี
          </label>
          <select
            v-model="form.statusID"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          >
            <option value="">เลือกสถานะ</option>
            <option
              v-for="status in userStatus"
              :key="status.id"
              :value="status.id"
            >
              {{ status.status_name }}
            </option>
          </select>
          <p v-if="!form.statusID" class="text-red-600 text-sm mt-2">
            โปรดเลือกสถานะบัญชีเข้าใช้งานระบบ.
          </p>
          <p v-else class="text-green-600 text-sm mt-2">
            สถานะถูกต้อง สามารถใช้งานได้.
          </p>
        </div>

        <div class="grid grid-cols-2">
          <!-- Email Field -->
          <div class="p-2">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              อีเมล์
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="email"
              id="email"
              required
              placeholder="example@gmail.com"
              v-model="form.email"
            />
            <p v-if="!form.email" class="text-red-600 text-sm mt-2">
              โปรดกรอกอีเมล์ สำหรับลงทะเบียน.
            </p>
            <p v-else class="text-green-600 text-sm mt-2">
              อีเมล์ถูกต้อง สามารถใช้งานได้.
            </p>
          </div>

          <!-- Username Field -->
          <div class="p-2">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ชื่อผู้ใช้
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="username"
              id="username"
              required
              placeholder="example"
              v-model="form.username"
            />
            <p v-if="!form.username" class="text-red-600 text-sm mt-2">
              โปรดกรอกชื่อผู้ใช้ สำหรับลงทะเบียน.
            </p>
            <p v-else class="text-green-600 text-sm mt-2">
              ชื่อผู้ใช้ถูกต้อง สามารถใช้งานได้.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <!-- Password Field -->
          <div class="p-2">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              รหัสผ่าน
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="password"
              id="password"
              required=""
              placeholder="password"
              v-model="form.password"
            />
            <p v-if="!form.password" class="text-red-600 text-sm mt-2">
              โปรดกรอกรหัสผ่าน.
            </p>
            <p v-else class="text-green-600 text-sm mt-2">
              รหัสผ่านถูกต้อง สามารถใช้งานได้
            </p>
          </div>

          <!-- Confirm Password Field -->
          <div class="p-2">
            <label
              for="confirm-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ยืนยันรหัสผ่านอีกครั้ง
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="password"
              id="confirmPassword"
              required=""
              placeholder="confirm password"
              v-model="form.confirmPassword"
            />
            <p
              v-if="passwordConfirmErrorMessage"
              class="text-red-600 text-sm mt-2"
            >
              {{ passwordConfirmErrorMessage }}
            </p>
            <p v-else class="text-green-600 text-sm mt-2">
              รหัสผ่านตรงกัน สามารถใช้งานได้
            </p>
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="bg-blue-700 text-white rounded-lg px-4 py-2 mt-5"
        >
        ลงทะเบียน
        </button>
      </form>
      <div
        class="mt-5 text-right text-sm font-medium text-gray-500 dark:text-gray-300"
      >
          มีบัญชีอยู่แล้ว?
        <RouterLink
          class="text-blue-700 hover:underline dark:text-blue-500"
          :to="{ name: 'LoginView' }"
        >
          ล็อคอิน
        </RouterLink>
      </div>
    </div>
  </div>
</template>
