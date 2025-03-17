<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { apiStoreLogin } = useAuthStore()

const form = reactive({
  emailUsername: "",
  password: "",
})

const onLogin = async () => {
  console.log("on login form data", form);
  const apiRouter = "login"
  await apiStoreLogin(apiRouter, form);
}

</script>
<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        ลงชื่อเข้าใช้งานระบบ
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="(apiStoreLogin('login', form))">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >กรอกอีเมล์ หรือ ชื่อผู้ใช้</label
          >
          <div class="mt-2">
            <input
              v-model="form.emailUsername"
              type="text"
              name="emailUsername"
              id="emailUsername"
              autocomplete="emailUsername"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >รหัสผ่าน</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="form.password"
              type="password"
              name="password"
              id="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            เข้าใช้งาน
          </button>
        </div>
      </form>
      <div class="text-sm flex justify-end mt-2">
        <RouterLink
          :to="{ name: 'ForgetYourPasswordView' }"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >ลืมรหัสผ่าน?</RouterLink
        >
      </div>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        ยังไม่มีบัญชี?
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'RegisterView' }"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >ลงทะเบียน?</RouterLink
        >
      </p>
    </div>
  </div>
</template>
