<script setup>
import { reactive, onMounted } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const { apiStoreLogin } = useAuthStore();

const formData = reactive({
  emailUsername: "",
  password: "",
});
</script>
<template>
  <div class="w-full flex items-center justify-center mt-10">
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form 
        class="space-y-6" 
        @submit.prevent="apiStoreLogin(`login`, formData)"
      >
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to system.
        </h5>
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your email or username</label
          >
          <input
            type="text"
            v-model="formData.emailUsername"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="emailUsername@company.com"
            required
          />
          <p v-if="!formData.emailUsername" class="text-red-600 text-sm mt-2">
            Please input email or username login.
          </p>
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Your password</label
          >
          <input
            v-model="formData.password"
            type="password"
            placeholder="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
          <p
            v-if="!formData.password"
            class="text-red-600 text-sm mt-2"
          >
            Pelase input password login.
          </p>
        </div>
        <div class="flex items-start">
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value="null"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Remember me</label
            >
          </div>
        </div>
        <button
          type="submit"
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
      </form>
      <div class="mt-5 text-right">
        <a
          href="#"
          class="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >Forgot your password?</a
        >
      </div>
      <div class="mt-5 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
        Not registered?
        <RouterLink 
          class="text-blue-700 hover:underline dark:text-blue-500"
          :to="{ name: 'RegisterView' }"
        >
          Create account
        </RouterLink>
      </div>
    </div>
  </div>
</template>
