<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <!-- Logo & Heading -->
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
  
      <!-- Form -->
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="(apiStoreLogin('login', form))" class="space-y-6">
          <BaseInput
            v-model="form.emailUsername"
            label="Email address OR Username"
            type="text"
            name="emailUsername"
            id="emailUsername"
            autocomplete="username"
            placeholder="Enter your email address or username"
          />
  
          <BaseInput
            v-model="form.password"
            label="Password"
            type="password"
            name="password"
            id="password"
            autocomplete="current-password"
            placeholder="Enter your password"
          />
  
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
  
        <!-- Forgot Password -->
        <div class="text-sm flex justify-end mt-2">
          <RouterLink
            :to="{ name: 'ForgetYourPasswordView' }"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </RouterLink>
        </div>
  
        <!-- Register Link -->
        <p class="mt-10 text-center text-sm text-gray-500">
          ยังไม่มีบัญชี?
          {{ ' ' }}
          <RouterLink
            :to="{ name: 'RegisterView' }"
            class="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            ลงทะเบียน
          </RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from 'vue'
  import BaseInput from '@/components/NewComponents/BaseInput.vue'
  import { useAuthStore } from '@/stores/auth'
  
  const { apiStoreLogin } = useAuthStore()
  
  const form = reactive({
    emailUsername: '',
    password: '',
  })
  
  function handleSubmit() {
    console.log('Email/Username:', form.emailUsername)
    console.log('Password:', form.password)
  
    // เรียก API login (ถ้าพร้อมใช้งาน)
    apiStoreLogin('login', form)
  }
  </script>
  