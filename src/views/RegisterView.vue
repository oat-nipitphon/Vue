<script setup>
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());
const { apiStoreRegister } = useAuthStore();

const userStatusID = ref(null);
const statusUser = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/status_user");
    userStatusID.value = response.data.status;
  } catch (error) {
    console.error("Error fetching user status:", error);
  }
};

const formData = reactive({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  statusID: "",
});

const passwordConfirmErrorMessage = computed(() => {
  if (!formData.confirmPassword) return "Please input confirm password.";
  if (formData.password !== formData.confirmPassword)
    return "Passwords do not match.";
  return "";
});

onMounted(statusUser);
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
        @submit.prevent="apiStoreRegister(`register`, formData)"
      >
        <!-- Status Dropdown -->
        <div v-if="userStatusID">
          <label for="status" class="block text-sm font-medium text-gray-900">
            Select your status account
          </label>
          <select
            id="status"
            v-model="formData.statusID"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
          >
            <option value="null" disabled>Select your status</option>
            <option
              v-for="status in userStatusID"
              :key="status.id"
              :value="status.id"
            >
              {{ status.status_name }}
            </option>
          </select>
          <p v-if="!formData.statusID" class="text-red-600 text-sm mt-2">
            Please select a status before proceeding.
          </p>
        </div>

        <!-- Email Field -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
            placeholder="name@flowbite.com"
          />
          <p v-if="!formData.email" class="text-red-600 text-sm mt-2">
            Please input your email.
          </p>
        </div>

        <!-- Username Field -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-900">
            Username
          </label>
          <input
            v-model="formData.username"
            type="text"
            id="username"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
            placeholder="Your username"
          />
          <p v-if="!formData.username" class="text-red-600 text-sm mt-2">
            Please input your username.
          </p>
        </div>

        <!-- Password Field -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-900">
            Password
          </label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="bg-gray-50 border text-sm rounded-lg block w-full p-2.5"
          />
          <p v-if="!formData.password" class="text-red-600 text-sm mt-2">
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
            v-model="formData.confirmPassword"
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
