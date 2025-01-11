<script setup>
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import { ref, onMounted } from 'vue'
import { usePostStore } from "@/stores/post";

const { apiGetPosts } = usePostStore()
const posts = ref(null)

onMounted(async () => {
    posts.value = await apiGetPosts()
})


</script>
<template>
  <div class="w-full mt-10 flex flex-col items-center">

    <div class="flex justify-center mt-10">

    </div>


    <!-- Item 2 -->
    <div 
      class="w-full mt-10 flex justify-center"
      v-if="posts"
    >
      <div 
        style="margin: auto"
        class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        v-for="post in posts" :key="post.id"
      >
        <a href="#">
          <img
            class="rounded-t-lg"
            src="../assets/icon/keyboard.jpg"
            alt=""
          />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ post.post_title }}
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ post.post_content }}
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

    <div v-else>
      <h1>ไม่มีข้อมูล</h1>
    </div>

  </div>
</template>

