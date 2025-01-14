<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const authStore = useAuthStore();
console.log("DashboardView :: ", authStore.storeUser.user_login.id);
const { apiGetPosts } = usePostStore();
const posts = ref(null);

onMounted(async () => {
  posts.value = await apiGetPosts();
  console.log("posts", posts.value);
});
</script>
<template>
  <div class="container">
    <div class="w-full mt-10 flex justify-end">
      <RouterLink
        class="btn btn-sm btn-primary mt-10 mr-20"
        :to="{ name: 'CreatePostNewView' }"
      >
        Create post new.
      </RouterLink>
    </div>
    <div class="w-full mt-10" v-if="posts">
      <div v-for="post in posts" :key="post.id">
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h1
              class="mb-4 text-lg font-extrabold leading-none text-gray-900 md:text-2xl dark:text-white"
            >
              {{ post.post_title }}
            </h1>
            <p
              class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
            >
              {{ post.post_types.post_type_name }}
            </p>
            <dl>
              <dt
                class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white"
              ></dt>
              <dd
                class="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
              >
                {{ post.post_content }}
              </dd>
            </dl>
            <div class="mt-10">
              <div class="row">
                <div class="col-md-6">
                    <div
                      class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
                    >
                      ผู้โพสต์
                    </div>
                    <div
                      class="mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
                    >
                      <img
                        class="rounded-full w-7 h-7"
                        src="../assets//icon/keyboard.jpg"
                        alt="image description"
                      />
                    </div>
                    <div
                      class="mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
                    >
                      {{ post.user.name }}
                    </div>
                  </div>

                  <div class="col-md-6 justify-end">
                    <div
                      class="mb-2 font-semibold leading-none text-gray-900 dark:text-white"
                    >
                     
                    </div>
                    <div
                      class="mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
                    >

                    </div>
                    <div
                      class="mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
                    >
                     
                    </div>
                  </div>
              </div>
            </div>
            <div class="flex justify-end space-x-4 mt-2">
              <RouterLink
               :to="{
                name: 'EditPostView',
                params: {
                  id: post.id
                }
               }"
                type="button"
                class="text-back inline-flex justify-end bg-yellow-300 hover:bg-yellow-300 focus:ring-4 
                focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-300 dark:focus:ring-yellow-300"
              >
                <svg
                  aria-hidden="true"
                  class="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Edit
              </RouterLink>
              <button
                type="button"
                class="inline-flex justify-end text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-1.5 -ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
    <div
      class="w-full mt-10 inline-flex items-center justify-center text-lg font-medium text-center pt-10"
      v-else
    >
      <p>ไม่มีข้อมูล</p>
    </div>
  </div>
</template>
