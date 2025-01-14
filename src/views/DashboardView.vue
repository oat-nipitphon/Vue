<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const authStore = useAuthStore();
console.log("DashboardView :: ", authStore.storeUser.user_login.id);
const { apiGetPosts, apiDeletePost } = usePostStore();
const posts = ref(null);

const btnDeletePost = async (id) => {
  await apiDeletePost(id);
}

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
            <div 
              class="flex justify-end space-x-4 mt-2"
              v-if="post.user_id === authStore.storeUser.user_login.id"
            >

              <RouterLink
               :to="{
                name: 'EditPostView',
                params: {
                  id: post.id
                }
               }"
                type="button"
                class="btn btn-sm btn-warning m-2"
              >

                Edit
              </RouterLink>
              <button
                @click="btnDeletePost(post.id)"
                type="button"
                class="btn btn-sm btn-danger m-2"
              >
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
