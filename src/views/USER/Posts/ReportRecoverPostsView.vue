<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'
import Swal from 'sweetalert2'
import axiosAPI from '@/services/axiosAPI'
const { apiRecoverGetPost, apiRecoverPost, apiDeletePost } = usePostStore()
const route = useRoute()
const posts = ref([])
const selectedItems = ref([])
const isShowButtonDeleteAll = ref(false)
const isCancelSelectAll = ref(false)

onMounted(async () => {
  posts.value = await apiRecoverGetPost(route.params.userID)
  posts.value = posts.value.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )
})

const selectAll = computed({
  get: () =>
    posts.value.length > 0 && selectedItems.value.length === posts.value.length,
  set: value => {
    selectedItems.value = value ? posts.value.map(post => post.id) : []
  },
})

const onDelete = async id => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await apiDeletePost(id)
      posts.value = posts.value.filter(post => post.id !== id)
    } catch (error) {
      console.error('Error deleting post', error)
    }
  }
}

const onDeleteSelected = async () => {
  try {
    const result = await Swal.fire({
      title: 'Confirm Delete!',
      text: 'Are you sure you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm delete',
      cancelButtonText: 'Cancel',
    })

    if (result.isConfirmed) {
      const token = localStorage.getItem('token')

      if (token) {
        await axiosAPI.post(
          `/api/posts/deleteSelected`,
          { ids: selectedItems.value },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        posts.value = posts.value.filter(
          post => !selectedItems.value.includes(post.id)
        )
      }
    } else {
      selectedItems.value = []
      selectAll.value = false
    }
  } catch (error) {
    console.error('delect select function error', error)
  }
}

const toggleAllCancel = () => {
  selectedItems.value = []
  isShowButtonDeleteAll.value = false
  isCancelSelectAll.value = false
}
</script>

<template>
  <div class="container bg-white shadow-lg rounded-lg mx-auto p-6">
    <div class="w-full">
      <h2 class="ml-2 p-2">Recover store posts</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-gray-700">
        <thead class="bg-gray-200 text-gray-700 uppercase">
          <tr>
            <th class="p-3 text-center">
              <input
                v-if="posts.length"
                type="checkbox"
                :checked="selectAll"
                @change="selectAll = !selectAll"
                class="m-auto"
              />
              <!-- <button v-if="selectedItems.length" @click="toggleAllCancel" class="ml-2 text-red-600 hover:underline text-xs">
                Cancel
              </button> -->
            </th>
            <th class="p-3 text-center">Title</th>
            <th class="p-3 text-center">Deleted At</th>
            <th class="p-3 text-center">Recover</th>
            <th class="p-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody v-if="posts.length">
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
              <button
                @click="apiRecoverPost(post.id)"
                class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg shadow-md transition duration-300"
              >
                Recover
              </button>
            </td>
            <td class="p-3 text-center">
              <button
                @click="onDelete(post.id)"
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
      <div class="flex justify-start mt-4">
        <button
          v-if="selectedItems.length"
          class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md transition duration-300"
          @click="onDeleteSelected"
        >
          Delete Selected
        </button>
      </div>
    </div>
  </div>
</template>
