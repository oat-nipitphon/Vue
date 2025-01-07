<script setup>
import axios from "axios";
import { ref, reactive, onMounted, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

const { errors } = storeToRefs(useAuthStore());
const { apiStoreRegister } = useAuthStore();

const userStatusID = ref(null);
const statusUser = async () => {
  const response = await axios.get("http://localhost:8000/api/status_user");
  userStatusID.value = response.data.status;
  console.log("Status user :: ", userStatusID.value);
};

const formRegis = reactive({
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  statusID: "",
});

const passwordConfirmErrorMessage = computed( () => {
  if (!formRegis.confirmPassword) {
    return "Please input confirm password"
  }
  if (formRegis.confirmPassword && formRegis.password !== formRegis.confirmPassword) {
    return "Password do not match."
  }
  return ""
})

onMounted(async () => {
  statusUser();
});

</script>
<template>
  <div class="w-full flex items-center justify-center mt-10">
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <a
          href="#"
          class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
      </div>
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Create an account
        </h1>
        <form
          class="space-y-4 md:space-y-6"
          @submit.prevent="apiStoreRegister('register', formRegis)"
        >
          <div v-if="userStatusID">
            <label
              for="status"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Select your status account</label
            >
            <select
              id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              v-model="formRegis.statusID"
            >
              <option value="" disabled selected>Select your status</option>
              <option
                v-for="status in userStatusID"
                :key="status.id"
                :value="status.id"
              >
                {{ status.status_name }}
              </option>
            </select>
            <p
              v-if="!formRegis.statusID"
              class="mt-2 text-sm text-red-600 dark:text-red-400"
            >
              Please select a status before proceeding.
            </p>
          </div>

          <div>
            <label
              for="email-address-icon"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your Email</label
            >
            <div class="relative">
              <div
                class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path
                    d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"
                  />
                  <path
                    d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"
                  />
                </svg>
              </div>
              <input
                v-model="formRegis.email"
                type="text"
                id="email-address-icon"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
              />
              <p v-if="!formRegis.email"
                class="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                Please input email your account new.
              </p>
            </div>
          </div>
          <div>
            <label
              for="website-admin"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Username</label
            >
            <div class="flex">
              <span
                class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600"
              >
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                  />
                </svg>
              </span>
              <input
                v-model="formRegis.username"
                type="text"
                id="website-admin"
                class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Bonnie Green"
              />
              <p v-if="!formRegis.username"
                class="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                Please input username your account new.
              </p>
            </div>
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              v-model="formRegis.password"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p v-if="!formRegis.password"
                class="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                Please input confirm password.
              </p>
          </div>
          <div>
            <label
              for="confirm-password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Confirm password</label
            >
            <input
              v-model="formRegis.confirmPassword"
              type="confirm-password"
              name="confirm-password"
              id="confirm-password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
            />
            <p v-if="passwordConfirmErrorMessage"
                class="mt-2 text-sm text-red-600 dark:text-red-400"
              >
                {{ passwordConfirmErrorMessage }}
              </p>
          </div>
          <div class="flex items-start">
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <label class="p-5">Create account</label>
            </button>
          </div>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <RouterLink
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              :to="{ name: 'LoginView' }"
            >
              Login here
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
