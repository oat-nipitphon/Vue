<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const authStore = useAuthStore();
const userID = ref(null);
userID.value = authStore.storeUser.user_login.id;

const { apiGetPosts, apiDeletePost, apiPostPopLike, apiPostPopDisLike } = usePostStore();
const posts = ref(null);
const postID = ref(null);
const popStatusLike = ref(null);
popStatusLike.value = "Like";
const popStatusDisLike = ref(null);
popStatusDisLike.value = "DisLike";
const postPopStatus = ref(null);
const likeCount = ref(null);
const dislikeCount = ref(null);
const userLiked = ref(null);
const userDisliked = ref(null);

// const enrichedPosts = computed(() => {
//   return posts.value.map((post) => {
//     const likeCount = post.post_popularity.filter((pop) => pop.pop_status === popStatusLike).length;
//     const dislikeCount = post.post_popularity.filter((pop) => pop.pop_status === popStatusDisLike).length;
//     const userLiked = post.post_popularity.some(
//       (pop) => pop.user_id === userID.value && pop.pop_status === popStatusLike
//     );
//     const userDisliked = post.post_popularity.some(
//       (pop) => pop.user_id === userID.value && pop.pop_status === popStatusDisLike
//     );
//     return {
//       ...post,
//       likeCount,
//       dislikeCount,
//       userLiked,
//       userDisliked,
//     };
//   });
// });

const btnDeletePost = async (id) => {
  await apiDeletePost(id);
  posts.value = posts.value.filter((post) => post.id !== id); // อัปเดตโพสต์ใน UI
};

onMounted(async () => {

  posts.value = await apiGetPosts();
  console.log("posts", posts.value);
  if (posts.value) {
      posts.value.map((post) => {
      likeCount.value = post.post_popularity.filter((pop) => pop.pop_status === popStatusLike).length;
      dislikeCount.value = post.post_popularity.filter((pop) => pop.pop_status === popStatusDisLike).length;
      userLiked.value = post.post_popularity.some(
        (pop) => pop.user_id === userID.value && pop.pop_status === popStatusLike
      );
      userDisliked.value = post.post_popularity.some(
        (pop) => pop.user_id === userID.value && pop.pop_status === popStatusDisLike
      );
    });
  }

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

      <RouterLink
        class="btn btn-sm btn-secondary mt-10 mr-20"
        :to="{
          name: 'ReportRecoverPostsView',
          params: {
            userID: authStore.storeUser.user_login.id,
          },
        }"
      >
        Recover post
      </RouterLink>
    </div>
    <div class="w-full mt-10" v-if="posts">
      <div v-for="post in posts" :key="post.id" class="post">
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <div class="row">
              <div
                class="text-start mb-2 font-semibold leading-none text-gray-900 dark:text-white"
              >
                <label class="text-md" for="UserCreatePost"> ผู้โพสต์ </label>
                <label class="text-md ml-2" for="UserName">
                  {{ post.user.name }}
                </label>
              </div>
              <div
                class="flex justify-start mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
              >
                <img
                  class="rounded-full w-8 h-8"
                  src="../assets//icon/keyboard.jpg"
                  alt="image description"
                />
              </div>
              <div
                class="text-start mb-1 font-light text-gray-500 sm:mb-5 dark:text-gray-400"
              ></div>
            </div>
            <div class="row mt-10 shadow-amber-600">
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
            </div>
            <div class="mt-10">
              <div class="grid grid-cols-2">

                <!-- Post Popularity LIKE -->
                <div class="w-50 grid grid-cols-2">
                  <div class="flex justify-center">

                 
                  <svg
                    @click="apiPostPopLike(userID, post.id, popStatusLike)"
                    class="mb-2 h-8 w-8"
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

                  </div>
                  <div class="flex text-start">
                    <span class="text-lg font-bold text-gray-900 dark:text-white">
                    <!-- Sum total Like Post -->
                      {{ post.likeCount }}
                  </span>
                  </div>
                  <div class="flex justify-center">
                    Like
                  </div>
                </div>

                <!-- Post Popularity DIS LIKE -->
                <div class="w-50 grid grid-cols-2">
                  <div class="flex justify-center">
                    <svg
                    @click="apiPostPopDisLike(userID, postID, popStatusDisLike)"
                    class="mb-2 h-8 w-8"
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
                  </div>
                  <div class="flex text-start">
                    <span class="text-lg font-bold text-gray-900 dark:text-white">
                    <!-- Sum total Dis Like Post -->
                      {{ post.disLikeCount }}
                  </span>
                  </div>
                  <div class="flex justify-center">
                    Dis Like
                  </div>
                </div>

              </div>
            </div>
            <div class="mt-10">
              <div class="flex justify-end">
                  <div
                    class="flex justify-end space-x-4 mt-2"
                    v-if="post.user_id === authStore.storeUser.user_login.id"
                  >
                    <RouterLink
                      :to="{
                        name: 'EditPostView',
                        params: {
                          id: post.id,
                        },
                      }"
                      type="button"
                      class="btn btn-sm btn-warning m-2"
                    >
                      Edit
                    </RouterLink>
                    <button
                      @click="btnDeletePost(post.id)"
                      type="button"
                      class="btn btn-sm btn-outline-danger m-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
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
