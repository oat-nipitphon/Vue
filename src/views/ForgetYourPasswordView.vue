<script setup>
import { reactive, ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

const { apiStoreResetPassword } = useAuthStore();

const formData = reactive({
  emailUsername: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  emailUsername: "",
  password: "",
  confirmPassword: "",
});

const validateForm = () => {
  errors.emailUsername = !formData.emailUsername
    ? "Please input email or username login."
    : "";

  errors.password = !formData.password ? "Please input password login." : "";

  errors.confirmPassword =
    !formData.confirmPassword || formData.password !== formData.confirmPassword
      ? "Passwords do not match."
      : "";

  return !errors.emailUsername && !errors.password && !errors.confirmPassword;
};

const btnResetPassword = async (event) => {
  event.preventDefault();

  if (validateForm()) {
    try {
      await apiStoreResetPassword(formData);
      // alert("Password updated successfully!");
    } catch (error) {
      alert("Failed to update password. Please try again.");
    }
  }
};
</script>

<template>
  <div class="w-full flex items-center justify-center mt-10">
    <div
      class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <h5 class="text-xl font-medium text-gray-900 dark:text-white">
        Reset password.
      </h5>
      <div>
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email or username
        </label>
        <input
          type="text"
          v-model="formData.emailUsername"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="emailUsername@company.com"
        />
        <p v-if="errors.emailUsername" class="text-red-600 text-sm mt-2">
          {{ errors.emailUsername }}
        </p>
      </div>
      <div>
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          v-model="formData.password"
          type="password"
          placeholder="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        <p v-if="errors.password" class="text-red-600 text-sm mt-2">
          {{ errors.password }}
        </p>
      </div>
      <div>
        <label
          for="confirmPassword"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          v-model="formData.confirmPassword"
          type="password"
          placeholder="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        <p v-if="errors.confirmPassword" class="text-red-600 text-sm mt-2">
          {{ errors.confirmPassword }}
        </p>
      </div>
      <button
        @click="btnResetPassword"
        type="button"
        class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Password Update
      </button>
    </div>
  </div>
</template>
