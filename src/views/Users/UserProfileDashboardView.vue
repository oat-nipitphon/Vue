<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStoreUserProfile } from "@/stores/user.profile";

const route = useRoute();
const { apiGetAllUserProfile } = useStoreUserProfile();
const userProfile = ref(null);

onMounted(async () => {
  userProfile.value = await apiGetAllUserProfile(route.params.id);
});

</script>
<template>
  <div v-if="userProfile">
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
      <div class="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <!-- Start Menu Pages View -->
        <nav class="mb-4 flex" aria-label="Breadcrumb">
          <ol
            class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse"
          >
            <li class="inline-flex items-center">
              <a
                href="#"
                class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  class="me-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                  />
                </svg>
                Home
              </a>
            </li>
            <li>
              <div class="flex items-center">
                <svg
                  class="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
                <a
                  href="#"
                  class="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                  >My account</a
                >
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <svg
                  class="mx-1 h-4 w-4 text-gray-400 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
                <span
                  class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ms-2"
                  >Account</span
                >
              </div>
            </li>
          </ol>
        </nav>
        <!-- End Menu Pages View -->

        <!-- Start Card User Profile -->
        <div class="py-4 md:py-8">
          <h2
            class="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6"
          >
            General overview
          </h2>
          <div class="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <!-- Card Profile left -->
            <div class="space-y-4">
              <div class="flex space-x-4">
                <img
                  width="100%" height="100%"
                  class="rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                  alt="Helene avatar"
                />
              </div>
            </div>

            <!-- Card Profile Rigth -->
            <div class="space-y-4">
              <dl class="font-semibold text-gray-500 dark:text-white">
                <span
                    class="mb-2 inline-block rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                  >
                    {{ userProfile.status_user.status_name }}
                  </span>
                  <h2
                    class="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl"
                  >
                    {{ userProfile.user_profile.title_name }}
                    {{ userProfile.user_profile.full_name }}
                  </h2>
              </dl>
              <dl>
                <dt class="font-semibold text-gray-900 dark:text-white">
                  Email Address
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  {{ userProfile.email }}
                </dd>
              </dl>
              <dl>
                <dt class="font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  +1234 567 890 / +12 345 678
                </dd>
              </dl>
            </div>
          </div>
          <button
            type="button"
            data-modal-target="accountInformationModal2"
            data-modal-toggle="accountInformationModal2"
            class="inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:w-auto"
          >
            <svg
              class="-ms-0.5 me-1.5 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              ></path>
            </svg>
            Edit your data
          </button>
        </div>
        <!-- End Card User Profile -->

        <!-- Start Card Followers -->
        <div>
          <div
            class="grid grid-cols-2 gap-6 border-b border-t border-gray-200 py-4 dark:border-gray-700 
            md:py-1 lg:grid-cols-4 xl:gap-16"
          >
            <div>
              <svg
                class="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                />
              </svg>
              <h3 class="mb-2 text-gray-500 dark:text-gray-400">Orders made</h3>
              <span
                class="flex items-center text-2xl font-bold text-gray-900 dark:text-white"
                >24
                <span
                  class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                >
                  <svg
                    class="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  10.3%
                </span>
              </span>
              <p
                class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base"
              >
                <svg
                  class="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                vs 20 last 3 months
              </p>
            </div>
            <div>
              <svg
                class="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-width="2"
                  d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                />
              </svg>
              <h3 class="mb-2 text-gray-500 dark:text-gray-400">
                Reviews added
              </h3>
              <span
                class="flex items-center text-2xl font-bold text-gray-900 dark:text-white"
                >16
                <span
                  class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                >
                  <svg
                    class="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  8.6%
                </span>
              </span>
              <p
                class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base"
              >
                <svg
                  class="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                vs 14 last 3 months
              </p>
            </div>
            <div>
              <svg
                class="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
              <h3 class="mb-2 text-gray-500 dark:text-gray-400">
                Favorite products added
              </h3>
              <span
                class="flex items-center text-2xl font-bold text-gray-900 dark:text-white"
                >8
                <span
                  class="ms-2 inline-flex items-center rounded bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"
                >
                  <svg
                    class="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  12%
                </span>
              </span>
              <p
                class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base"
              >
                <svg
                  class="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                vs 10 last 3 months
              </p>
            </div>
            <div>
              <svg
                class="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9h13a5 5 0 0 1 0 10H7M3 9l4-4M3 9l4 4"
                />
              </svg>
              <h3 class="mb-2 text-gray-500 dark:text-gray-400">
                Product returns
              </h3>
              <span
                class="flex items-center text-2xl font-bold text-gray-900 dark:text-white"
                >2
                <span
                  class="ms-2 inline-flex items-center rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"
                >
                  <svg
                    class="-ms-1 me-1 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v13m0-13 4 4m-4-4-4 4"
                    ></path>
                  </svg>
                  50%
                </span>
              </span>
              <p
                class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:text-base"
              >
                <svg
                  class="me-1.5 h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                vs 1 last 3 months
              </p>
            </div>
          </div>
        </div>
        <!-- End Card Followers -->
      </div>
    </section>
  </div>
  <div v-else>
    <h1>Account false.</h1>
  </div>
</template>
