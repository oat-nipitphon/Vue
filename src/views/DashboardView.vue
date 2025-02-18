<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'

const authStore = useAuthStore()
const userID = ref(authStore.storeUser?.user_login?.id || null)
const {
  apiGetPosts,
  apiStorePost,
  apiDeletePost,
  apiPostPopLike,
  apiPostPopDisLike,
} = usePostStore()
const posts = ref([])
const selectedPostContent = ref([])
const selectedUserProfile = ref([])

// Compute enriched data for posts
const enrichedPosts = computed(() =>
  posts.value.map(post => {
    const likeCount = post.postPopularity.filter(
      pop => pop.status === 'Like'
    ).length
    const disLikeCount = post.postPopularity.filter(
      pop => pop.status === 'DisLike'
    ).length
    const userLiked = post.postPopularity.some(
      pop => pop.userID === userID.value && pop.status === 'Like'
    )
    const userDisliked = post.postPopularity.some(
      pop => pop.userID === userID.value && pop.status === 'DisLike'
    )
    return {
      ...post,
      likeCount,
      disLikeCount,
      userLiked,
      userDisliked,
    }
  })
)

const handleLike = async post => {
  await apiPostPopLike(userID.value, post.id, 'Like')
  const updatedPosts = await apiGetPosts()
  posts.value = updatedPosts
}

// Handle dis like
const handleDislike = async post => {
  await apiPostPopDisLike(userID.value, post.id, 'DisLike')
  const updatedPosts = await apiGetPosts()
  posts.value = updatedPosts
}

const modalValuePostContent = content => {
  selectedPostContent.value = content
}

const formatDate = dateString => {
  const date = new Date(dateString)
  return date.toLocaleString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // timeZoneName: "short",
  })
}

const onModalShowUserProfile = userProfile => {
  selectedUserProfile.value = userProfile
}

onMounted(async () => {
  posts.value = await apiGetPosts()
})
</script>

<template>
  <div class="container">
    <div class="mt-5 flex justify-end">
      <RouterLink
        class="btn btn-sm btn-primary mr-10"
        :to="{
          name: 'CreatePostNewView',
        }"
      >
        Create post
      </RouterLink>
    </div>
    <div v-if="posts">
      <div
        v-for="(post, index) in enrichedPosts"
        :key="index"
        class="container rounded overflow-hidden shadow-lg mt-5"
      >
        <div class="grid grid-cols-[15%_70%_15%] h-12 p-4">
          <div class="grid grid-cols-2">
            <p
              v-for="profileImage in authStore.storeUser.user_login
                .userProfileImage"
              :key="profileImage"
            >
              <img
                :src="profileImage.imageData"
                class="size-12 rounded-full m-auto mt-auto"
                alt="ProfileImage"
              />
            </p>
            <div class="grid grid-rows-2">
              <p>{{ authStore.storeUser.user_login.username }}</p>
              <div class="grid grid-cols-2">
                <img
                  src="../assets/icon/editor-post/heart.svg"
                  class="size-4 m-auto"
                  alt=""
                />
                <img
                  src="../assets/icon/editor-post/bell.svg"
                  class="size-4 m-auto"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-rows-2 text-center mb-3">
            <h1 class="mb-3 font-extrabold text-gray-900 dark:text-white">
              {{ post.title }}
            </h1>
            <label class="font-semibold text-sm text-gray-700">
              สร้างโพสต์ วันที่ {{ formatDate(post.createdAt) }}
            </label>
          </div>
          <div
            v-if="post.userID === authStore.storeUser.user_login.id"
            class="flex justify-end"
          >
            <div class="dropdown">
              <img
                class="size-6 mr-5 mt-3"
                src="../assets/icon/editor-post/sliders.svg"
                alt="SettingPost"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul class="dropdown-menu">
                <li>
                  <form @submit.prevent="apiStorePost(post.id)">
                    <button class="dropdown-item" type="submit">
                      <label for="Event-Store" class="text-sm ml-2 text-gray-900">
                        Store
                      </label>
                    </button>
                  </form>
                </li>
                <li>
                  <RouterLink
                    :to="{
                      name: 'EditPostView',
                      params: { id: post.id },
                    }"
                    class="dropdown-item"
                  >
                    <label for="Event-Post-Edit" class="text-sm ml-2 text-gray-900">
                      Edit
                    </label>
                  </RouterLink>
                </li>
                <li>
                  <button @click="apiDeletePost(post.id)" class="dropdown-item">
                    <label
                      for="Event-Post-Delete"
                      class="text-sm ml-2 text-gray-900"
                    >
                      Delete
                    </label>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p
          class="flex justify-center"
          v-for="postImage in post.postImage"
          :key="postImage.id"
        >
          <img
            class="size-9/12 mt-3 sm:bg-cover md:bg-contain lg:bg-auto xl:bg-cover"
            :src="'data:image/png/jpg;base64,' + postImage.imageData"
            alt="Sunset in the mountains"
          />
        </p>
        <div class="px-6 py-4">
          <p
            class="text-gray-700 text-base"
            v-html="post.content"
            :style="{
              overflow: 'hidden',
              display: '-webkit-box',
              '-webkit-line-clamp': '5',
              '-webkit-box-orient': 'vertical',
            }"
          ></p>
          <!-- Show Modal Post Content Detail -->
          <button
            v-if="post.content.length > 200"
            type="button"
            class="btn btn-sm text-primary"
            data-bs-toggle="modal"
            data-bs-target="#modalShowMovePostContents"
            @click="modalValuePostContent(post.content)"
          >
            <p class="flex justify-between text-blue-600 text-sm m-auto">
              More ...
            </p>
          </button>
          <!-- Modal Show Event Move Post Contents -->
          <div
            class="modal fade modal-lg"
            id="modalShowMovePostContents"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                  <button
                    type="button"
                    class="btn-close btn-outline-dargen"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <p
                      class="flex justify-between text-gray-500 text-sm m-auto"
                    >
                      ปิด
                    </p>
                  </button>
                </div>
                <div class="modal-body">
                  <label
                    class="text-md text-gray-500 m-1"
                    v-html="selectedPostContent"
                  >
                  </label>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-sm btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 pt-4 pb-2">
          <span
            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >#{{ post.postType.name }}</span
          >
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center mt-5">
      <p class="text-lg font-medium text-red-600">No posts available</p>
    </div>
  </div>
</template>
<style>
.image-profile-title-post {
  width: 200px;
  height: 120px;
}
</style>
