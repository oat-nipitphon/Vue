<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAdminPostStore } from "@/stores/admin.posts";
import AdminModalShowDetailPost from "./AdminModalShowDetailPost.vue";
import AdminModalShowDetailUserProfile from "./AdminModalShowDetailUserProfile.vue";

const authStore = useAuthStore();

const { adminAPIGETposts } = useAdminPostStore();
// const items = ref(Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)); // ตัวอย่างข้อมูล 100 รายการ

const posts = ref([]);
const currentPage = ref(1); // กำหนดหน้าเริ่มต้น
const itemsPerPage = ref(5); // จำนวนข้อมูลต่อหน้า

const onDeletePost = async (postID) => {
  console.log("on delete post ", postID);
};

const onBlockPost = async (postID) => {
  console.log("on block post ".postID);
};

// คำนวณจำนวนหน้า
const totalPages = computed(() =>
  Math.ceil(posts.value.length / itemsPerPage.value)
);

//  คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return posts.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(async () => {
  posts.value = await adminAPIGETposts();
});
</script>
<template>
  <div class="w-full">
    <div class="grid grid-cols-2">
      <div class="flex justify-start">
        <h2 for="AdminManagerPost" class=" text-gray-900 mt-4 mb-4 p-2">
          Admin Manager posts.
        </h2>
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
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr class="w-full">
            <!-- <th
              scope="col"
              class="w-2 p-3 text-center font-semibold text-gray-900"
            >
              No.
            </th> -->
            <th scope="col" class="w-2 p-2 text-center font-semibold">
              Post ID
            </th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">
              Detail Post
            </th>
            <th scope="col" class="w-3 p-3 text-center font-semibold">
              Status Post
            </th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">
              User Create Post
            </th>
            <th scope="col" class="w-5 p-3 text-center font-semibold">
              Events
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedPosts.length > 0">
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <!-- <th
              scope="row"
              class="w-4 p-3 text-center m-1 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ index + 1 }}
            </th> -->
            <td class="w-2 py-2 text-center">
              {{ post.id }}
            </td>
            <td class="w-5 p-3 text-start m-1">
              <!-- trigger modal -->
              <label
                class="m-1 text-md"
                for="TitlePost"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalDetailPost"
              >
                {{ post.post_title }}
              </label>
              <!-- Modal post show detail -->
              <AdminModalShowDetailPost />
            </td>
            <td class="w-4 p-3 text-center m-1">
              <p
                v-if="post.deletetion_status === 0"
                class="text-green-600 text-sm text-center"
              >
                Normal
              </p>
              <p
                v-if="post.deletetion_status === 1"
                class="text-red-600 text-sm text-center"
              >
                Deletetion
              </p>
            </td>
            <td class="w-4 p-3 text-center m-1">
              <!-- trigger modal -->
              <label
                for="UserProfileName"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalUserProfile"
              >
                {{ post.user.user_profile.full_name }}
              </label>

              <!-- Modal show user profile create post -->
              <AdminModalShowDetailUserProfile />
            </td>
            <td class="w-4 p-3 flex justify-items-center">
              <button
                @click="onDeletePost(post.id)"
                class="m-1 btn btn-size btn-sm btn-danger text-sm"
              >
                Delete.
              </button>

              <button
                @click="onBlockPost(post.id)"
                class="m-1 btn btn-size btn-sm btn-secondary text-sm"
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
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="btn btn-primary"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.btn-size {
  width: auto;
  height: 30px;
}
</style>
