<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'

const route = useRoute()
const { apiRecoverGetPost, apiRecoverPost, apiDeletePost } = usePostStore()

const recoverPosts = ref([])

onMounted(async () => {
  recoverPosts.value = await apiRecoverGetPost(route.params.userID)
  recoverPosts.value = recoverPosts.value.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
})

function formatDate(date) {
  if (!date) return ''
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss')
}

const btnOnDelete = async id => {
  await apiDeletePost(id)
}
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="mt-10 ">
      <h1 class="text-2xl font-semibold text-gray-800">Recover Posts</h1>
    </div>

    <div class="flex justify-end my-5">
      <RouterLink
        type="button"
        :to="{ name: 'DashboardView' }"
        class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
      >
        Back to Dashboard
      </RouterLink>
    </div>

    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="w-full text-sm text-gray-700">
        <thead class="bg-gray-200 text-gray-700 uppercase">
          <tr>
            <th class="p-3 text-center">ID</th>
            <th class="p-3 text-center">Title</th>
            <th class="p-3 text-center">Deleted At</th>
            <th class="p-3 text-center">Recover</th>
            <th class="p-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody v-if="recoverPosts">
          <tr
            v-for="post in recoverPosts"
            :key="post.id"
            class="border-b hover:bg-gray-100 transition"
          >
            <td class="p-3 text-center">{{ post.id }}</td>
            <td class="p-3 text-center">{{ post.post_title }}</td>
            <td class="p-3 text-center text-gray-500">
              {{ post.date_time_delete }}
            </td>
            <td class="p-3 text-center">
              <form @submit.prevent="apiRecoverPost(post.id)">
                <button
                  type="submit"
                  class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg shadow-md transition duration-300"
                >
                  Recover
                </button>
              </form>
            </td>
            <td class="p-3 text-center">
              <button
                @click="btnOnDelete(post.id)"
                type="button"
                class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg shadow-md transition duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center py-5 text-red-600 font-medium">
              No posts available for recovery.
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
