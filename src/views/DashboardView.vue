<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import { ref, onMounted } from 'vue'

// const authStore = useAuthStore()
// const { storeUser } = storeToRefs(authStore)
// const user = ref(null)

// // console.log(authStore)

// onMounted(async () => {
//   await authStore.apiAuthStore()
//   // console.log(storeUser.value.id)
// })

</script>
<template>
  <div class="w-full mt-10">
    <div class="w-full m-auto mt-10">
      <a
        href="#"
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=DSSWt2M27C4Q7kNvgFEQ9s0&_nc_oc=AdhObFZIdl30dzCgy382lXYzrpz9QT_AigSY4olSX6HeF57OzIBMoLXAEAZUbv-My1HLH4pfbzppUByTEqQ4W56z&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=A-MCF4FJxAAyevGTWLeS9Vf&oh=00_AYCTUXKIuux-lIHpIBiif3OifLfTaOMkgHNGob1mYOGeiw&oe=6783C271"
          alt=""
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Noteworthy technology acquisitions 2021
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
        </div>
      </a>
    </div>

    <div class="w-full m-auto mt-10">
      <div
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <a href="#">
          <img
            class="rounded-t-lg"
            src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=DSSWt2M27C4Q7kNvgFEQ9s0&_nc_oc=AdhObFZIdl30dzCgy382lXYzrpz9QT_AigSY4olSX6HeF57OzIBMoLXAEAZUbv-My1HLH4pfbzppUByTEqQ4W56z&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=A-MCF4FJxAAyevGTWLeS9Vf&oh=00_AYCTUXKIuux-lIHpIBiif3OifLfTaOMkgHNGob1mYOGeiw&oe=6783C271"
            alt=""
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Noteworthy technology acquisitions 2021
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.
          </p>
          <a
            href="#"
            class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
            <svg
              class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
