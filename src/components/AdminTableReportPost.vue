<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAdminPostStore } from "@/stores/admin.posts";
import AdminModalShowDetailPost from "./AdminModalShowDetailPost.vue";
import AdminModalShowDetailUserProfile from "./AdminModalShowDetailUserProfile.vue";

const { adminAPIGETposts } = useAdminPostStore();
const posts = ref([]);

const onDeletePost = async (postID) => {
  console.log("on delete post ", postID);
};

const onBlockPost = async (postID) => {
  console.log("on block post ".postID);
};

onMounted(async () => {
  posts.value = await adminAPIGETposts();
});
</script>
<template>
  <div class="container">
    <div class="grid grid-cols-2">
      <div class="flex justify-start">
        <label for="AdminManagerPost" class="text-md m-5">
          Admin Manager posts.
        </label>
      </div>
      <div class="flex">
        <!-- Event -->
      </div>
    </div>
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3 text-center">No.</th>
            <th scope="col" class="px-6 py-3 text-center">Post ID</th>
            <th scope="col" class="px-6 py-3 text-center">Detail Post</th>
            <th scope="col" class="px-6 py-3 text-center">Status Post</th>
            <th scope="col" class="px-6 py-3 text-center">User Create Post</th>
            <th scope="col" class="px-6 py-3 text-center">
              event post deletetion
            </th>
            <th scope="col" class="px-6 py-3 text-center">event post block</th>
          </tr>
        </thead>
        <tbody v-if="posts && posts.length > 0">
          <tr
            v-for="(post, index) in posts"
            :key="post.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 text-center m-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </th>
            <td class="px-6 py-4 text-center m-1">
              {{ post.id }}
            </td>
            <td class="px-6 py-4 text-center m-1">
              <!-- Modal post show detail -->
              <AdminModalShowDetailPost />
            </td>
            <td class="px-6 py-4 text-center m-1">
              <p
                v-if="post.deletetion_status === 1"
                class="text-green-400 text-sm text-center"
              >
                true
              </p>
              <p
                v-if="post.deletetion_status === 0"
                class="text-red-500 text-sm text-center"
              >
                false
              </p>
              <p v-else class="text-sm text-center text-gray-500">null</p>
            </td>
            <td class="px-6 py-4 text-center m-1">
              <!-- Modal show user profile create post -->
              <AdminModalShowDetailUserProfile />
            </td>
            <td class="px-6 py-4 text-center m-1">
              <button
                @click="onDeletePost(post.id)"
                class="btn btn-sm btn-danger"
              >
                Delete.
              </button>
            </td>
            <td class="px-6 py-4 text-center m-1">
              <button
                @click="onBlockPost(post.id)"
                class="btn btn-sm btn-secondary"
              >
                Block.
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="flex justify-center text-lg m-5 text-red-600">
              Data posts false.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style>
.btn-size {
  width: auto;
  height: 30px;
}
</style>
