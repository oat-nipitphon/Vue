<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute();
const { apiRecoverGetPost, apiRecoverPost, apiDeletePost } = usePostStore();

const recoverPosts = ref(null);

onMounted(async () => {
  recoverPosts.value = await apiRecoverGetPost(route.params.userID);
  recoverPosts.value = recoverPosts.value.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
});

function formatDate(date) {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

const btnOnDelete = async (id) => {
  await apiDeletePost(id);
};

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
    <div class="overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr class="w-full">
            <td scope="col" class="w-2 p-2 text-center font-semibold">id</td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">title</td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">date time recover</td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">recover</td>
            <td scope="col" class="w-2 p-2 text-center font-semibold">delete</td>
          </tr>
        </thead>
        <tbody v-if="recoverPosts">
          <tr
            v-for="post in recoverPosts"
            :key="post.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="w-2 py-2 text-center">
              {{ post.id }}
            </td>
            <td class="w-2 py-2 text-center">
              {{ post.post_title }}
            </td>
            <td class="w-2 py-2 text-center">
              {{ post.date_time_delete }}
            </td>
            <td class="w-2 py-2 text-center">
              <form @submit.prevent="apiRecoverPost(post.id)">
                <button type="submit" class="btn btn-sm btn-success m-auto">
                  <span class="text-sm"> Recover </span>
                </button>
              </form>
            </td>
            <td class="w-2 py-2 text-center">
                <button
                @click="btnOnDelete(post.id)"
                type="button"
                class="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
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
<style scoped>
/* Add your styles here */
</style>
