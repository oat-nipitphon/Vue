<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'

const { apiRecoverGetPost, apiRecoverPost, apiDeletePost } = usePostStore()
const route = useRoute()
const posts = ref([])
const selectAll = ref([])
const selectedItems = ref([])
const isShowInputSelectAll = ref(true);
const isShowButtonDeleteAll = ref(false);
const isCancelSelectAll = ref(false);
onMounted(async () => {
  posts.value = await apiRecoverGetPost(route.params.userID)
  posts.value = posts.value.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
})

const onDelete = async id => {
  // await apiDeletePost(id)
  if (confirm('Are you sure you want to delete this contact?')) {
    try {
      await axiosAPI.delete(`/api/posts/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      posts.value = posts.value.filter(post => post.id !== id)
    } catch (error) {
      console.error('on delete function error', error)
    }
  }
}

const onDeleteSelected = async () => {
  if (confirm('Are you sure you want to delete this contact?')) {
    try {
      await axiosAPI.post(`/api/posts/selected`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: { ids: selectedItems.value },
      })

      posts.value = posts.value.filter(post => post.id !== id)
      selectedItems.value = []
      selectAll.value = false
    } catch (error) {
      console.error('on delete function error', error)
    }
  }
}

const toggleAll = () => {
  if (selectAll.value) {
    isShowInputSelectAll.value = false;
    isShowButtonDeleteAll.value = true;
    isCancelSelectAll.value = true;
    selectedItems.value = posts.value.map(post => post.id)
  } else {
    isShowButtonDeleteAll.value = false;
    selectedItems.value = []
  }
}

const toggleAllCancel = () => {
    isShowInputSelectAll.value = true;
    isShowButtonDeleteAll.value = false;
    isCancelSelectAll.value = false;
    selectedItems.value = []
}

</script>

<template>
  <div class="container mx-auto p-6">
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="w-full text-sm text-gray-700">
        <thead class="bg-gray-200 text-gray-700 uppercase">
          <tr>
            <th class="p-3 text-center">
              <input
                v-if="isShowInputSelectAll"
                type="checkbox"
                v-model="selectAll"
                @change="toggleAll"
                class="m-auto"
              />
              <button v-if="isCancelSelectAll"  @click="toggleAllCancel">cancel</button>
            </th>
            <th class="p-3 text-center">Title</th>
            <th class="p-3 text-center">Deleted At</th>
            <th class="p-3 text-center">Recover</th>
            <th class="p-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody v-if="posts">
          <tr
            v-for="post in posts"
            :key="post.id"
            class="border-b hover:bg-gray-100 transition"
          >
            <td class="p-3 text-center">
              <input
                type="checkbox"
                :value="post.id"
                v-model="selectedItems"
                class="m-auto"
              />
            </td>
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
                @click="onDelete(post.id)"
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
      <div class="flex justify-start">
        <label class="ml-1 p-2">
          <button
            v-if="isShowButtonDeleteAll"
            class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg shadow-md transition duration-300"
            type="button"
            @click="onDeleteSelected"
          >
            all delete
          </button>
        </label>
      </div>
    </div>
  </div>
</template>
