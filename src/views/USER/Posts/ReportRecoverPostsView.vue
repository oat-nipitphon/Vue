<script setup>
import { ref, onMounted, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute();
const { apiRecoverGetPost, apiRecoverPost } = usePostStore();

const postID = ref(null);
const recoverPosts = ref(null);

onMounted(async () => {
  // ใช้ map เพื่อแปลงข้อมูลบางอย่างใน recoverPosts (ถ้าจำเป็น)
  //  const mappedPosts = recoverPosts.value.map(post => ({
  //         ...post,
  //         createdAt: new Date(post.createdAt), // สมมติว่า post มีฟิลด์ createdAt
  //     }));
  //     // ใช้ sort เพื่อเรียงลำดับข้อมูลตาม createdAt
  //     recoverPosts.value = mappedPosts.sort((a, b) => b.createdAt - a.createdAt);

  recoverPosts.value = await apiRecoverGetPost(route.params.userID);
  console.log("recover posts value :: ", recoverPosts.value);
});
</script>
<template>
  <div class="container">
    <div class="mt-10">
      <h1>Recover Posts</h1>
    </div>
    <div class="row flex justify-end m-5">
      <RouterLink
        type="button"
        :to="{ name: 'DashboardView' }"
        class="btn btn-sm btn-danger"
      >
        Back DashboardView
      </RouterLink>
    </div>
    <div class="mt-10">
      <div>
        <div class="flex justify-center"></div>
        <div class="row text-center">
          <div class="col-md-6">
            Status Deletetion :: {{ post.deletetion_status }}
          </div>
          <div class="col-md-6">User Profile ID :: {{ post.user_id }}</div>
        </div>
        <div class="row">
          {{ post.post_title }}
        </div>
        <div class="row">
          {{ post.post_content }}
        </div>
        <div class="row">
          <hr style="margin: 10px" />
        </div>
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
            <td scope="col" class="w-2 p-2 text-center font-semibold">count</td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">Title</td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">
              Content
            </td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">
              pop post total
            </td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">
              date time
            </td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">Event</td>
          </tr>
        </thead>
        <body v-if="recoverPosts.length > 0">
          <tr
            v-for="(post, index) in recoverPosts"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="w-2 py-2 text-center">
              {{ post.id }}
            </td>
            <td class="w-2 py-2 text-center">
              {{ index + 1 }}
            </td>
            <td class="w-2 py-2 text-center">
              {{ post.post_title }}
            </td>
            <td class="w-2 py-2 text-center">
              {{ post.post_content }}
            </td>
            <td class="w-2 py-2 text-center">sub pop post</td>
            <td class="w-2 py-2 text-center">
              {{ post.created_at }}
              {{ post.updated_at }}
            </td>
            <td class="w-2 py-2 text-center">
              <form @submit.prevent="apiRecoverPost(post.id)">
                <button type="submit" class="btn btn-sm btn-outline-success">
                  {{ post.id }}
                  <span class="text-sm"> Recover </span>
                </button>
              </form>
            </td>
          </tr>
        </body>
        <tbody v-else>
          <tr>
            <td class="flex justify-center text-lg m-5 text-red-600">
              Data posts recover false.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
