<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const { apiStoreRegister, apiGetUserStatus } = useAuthStore()
const userStatus = ref([])

const emailError = ref('ตัวอย่าง example@gmail.com')
const usernameError = ref('ตัวอย่าง example1234')

const form = reactive({
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  statusID: '',
})


// ตรวจสอบรูปแบบ Email + เช็คซ้ำ
const checkEmail = async () => {
  if (!form.email.includes('@')) {
    emailError.value = 'รูปแบบอีเมลไม่ถูกต้อง เช่น example@gmail.com'
    return
  }

  try {
    const response = await axiosAPI.post('/api/register/check_email', { email: form.email })
    if (response.data.exists) {
      emailError.value = 'อีเมลนี้ถูกใช้งานแล้ว กรุณาใช้อีเมลอื่น'
    } else {
      emailError.value = 'อีเมลนี้สามารถใช้งานได้'
    }

  } catch (error) {
    console.error(error)
    emailError.value = 'เกิดข้อผิดพลาดในการตรวจสอบอีเมล'
    
  }
}

// ตรวจสอบ Username ซ้ำ
const checkUsername = async () => {
  if (!form.username) {
    usernameError.value = 'โปรดกรอกชื่อผู้ใช้'
    return
  }

  try {
    const response = await axiosAPI.post('/api/register/check_username', { username: form.username })
    if (response.data.exists) {
      usernameError.value = 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว'
    } else {
      usernameError.value = 'ชื่อผู้ใช้นี้สามารถใช้งานได้'
    }
  } catch (error) {
    console.error(error)
    usernameError.value = 'เกิดข้อผิดพลาดในการตรวจสอบชื่อผู้ใช้'
  }
}

const passwordCheck = computed(() => {
  if (!form.password) {
    return `<p class="text-red-600 text-sm mt-2">
      โปรดกรอกรหัสผ่าน สำหรับลงทะเบียน.
    </p>`
  }
  if (form.password.length < 6) {
    return `
      <p class="text-red-600 text-sm mt-2">
        รหัสผ่านต้องมีจำนวนมากกว่า 5 ตัว
        </p>
    `
  }

  return `<p class="text-green-600 text-sm mt-2">
    รหัสผ่านถูกต้อง สามารถใช้งานได้.
  </p>`

})

const passwordConfirmErrorMessage = computed(() => {
  if (!form.confirmPassword) {
    return `<p class="text-red-600 text-sm mt-2">
      โปรดยืนยันรหัสผ่านอีกครั้ง สำหรับลงทะเบียน.
    </p>`
  }
  if (form.password !== form.confirmPassword) {
    return `<p class="text-red-600 text-sm mt-2">
      รหัสผ่านไม่ตรงกัน โปรดตรวจสอบรหัสผ่านของท่านอีกครั้ง
    </p>`
  }

  return `<p class="text-green-600 text-sm mt-2">
    รหัสผ่านตรงกัน สามารถใช้งานได้.
  </p>`
})

const getUserStatus = async () => {
  try {
    const response = await axiosAPI.get('/api/status_user');

    if (response.ok) {
      // console.log('response false', response);
    } else {
      return response.data.userStatus
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  userStatus.value = await getUserStatus()
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        ลงทะเบียน
      </h2>

      <form class="" @submit.prevent="apiStoreRegister(`register`, form)">
        <div class="inline-block relative w-full">
          <label for="User-Status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            สถานะบัญชี
          </label>
          <select v-model="form.statusID"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="">เลือกสถานะ</option>
            <option v-for="status in userStatus || []" :key="status.id" :value="status.id">
              {{ status.status_name }}
            </option>
          </select>
          <p v-if="!form.statusID" class="text-red-600 text-sm mt-2">
            โปรดเลือกสถานะบัญชี เข้าใช้งานระบบ.
          </p>
          <p v-else class="text-green-600 text-sm mt-2">
            เลือกสถานะบัญชีสำเร็จ.
          </p>
        </div>

        <div class="grid grid-cols-2">
          <div class="p-2">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              อีเมล์
            </label>
            <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            type="email" id="email" required placeholder="example@gmail.com" v-model="form.email"
              @blur="checkEmail" />
            <p :class="emailError.includes('สามารถ') ? 'text-green-600' : 'text-red-600'" class="text-sm mt-2">
              {{ emailError }}
            </p>
          </div>


          <div class="p-2">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ชื่อผู้ใช้
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            type="text" id="username" required placeholder="example" v-model="form.username"
              @blur="checkUsername" />
            <p :class="usernameError.includes('สามารถ') ? 'text-green-600' : 'text-red-600'" class="text-sm mt-2">
              {{ usernameError }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div class="p-2">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              รหัสผ่าน
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="password" id="password" required="" placeholder="password" v-model="form.password" />
            <p v-html="passwordCheck"></p>
            <p>
              {{ }}
            </p>
          </div>

          <div class="p-2">
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              โปรดยืนยันรหัสผ่านอีกครั้ง.
            </label>
            <input
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              type="password" id="confirmPassword" required placeholder="confirm password"
              v-model="form.confirmPassword" />
            <p v-html="passwordConfirmErrorMessage"></p>
            <p>{{ }}</p>
          </div>

        </div>

        <!-- Submit Button -->
        <button type="submit" class="bg-blue-700 text-white rounded-lg px-4 py-2 mt-5">
          ลงทะเบียน
        </button>
      </form>
      <div class="mt-5 text-right text-sm font-medium text-gray-500 dark:text-gray-300">
        มีบัญชีอยู่แล้ว?
        <RouterLink class="text-blue-700 hover:underline dark:text-blue-500" :to="{ name: 'LoginView' }">
          ล็อคอิน
        </RouterLink>
      </div>
    </div>
  </div>
</template>
