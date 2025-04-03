<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import defaultImage from '@/assets/icon/icon-user-default.png'
import QuickViewProfileCard from '@/components/QuickViewProfileCard.vue';


const authStore = useAuthStore()
const { storeUser } = storeToRefs(authStore)
const props = defineProps({
  title: String,
  content: String,
})

const {
  apiGetPosts,
  apiStorePost,
  apiDeletePost,
  apiPostPopLike,
  apiPostPopDisLike,
} = usePostStore()
const userID = ref(authStore.storeUser?.user_login?.id || null)
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
        class="max-w-sm rounded overflow-hidden shadow-lg"
        v-for="(post, index) in posts"
        :key="index"
      >
        <div class="grid grid-cols-2">
          <div>
            <figure
              class="flex flex-col items-start justify-start p-2 m-auto text-start bg-white border-gray-200 md:rounded-es-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <figcaption class="flex items-start justify-start ml-5 mt-3">
                <div v-for="(image, index) in post.userImage" :key="index">
                  <div v-if="image.imageData !== null">
                    <!-- <img
                      class="size-8 rounded-full"
                      :src="'data:image/png;base64,' + image.imageData"
                      alt=""
                    /> -->
                    <QuickViewProfileCard :imageProfile="'data:image/png;base64,' + image.imageData" />
                  </div>
                  <div v-else>
                    <img
                        class="size-8 rounded-full"
                        src="../assets/icon/icon-user-default.png"
                        alt=""
                      />
                  </div>
                </div>

                <div
                  class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3"
                >
                  <div>{{ post.userProfile?.fullName }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ post.user?.email }}
                  </div>
                </div>
              </figcaption>
            </figure>
            <label class="font-semibold text-sm text-gray-700 mt-2 ml-5">
              สร้างโพสต์ วันที่ {{ formatDate(post.createdAt) }}
            </label>
          </div>
          <div class="grid grid-cols-2">
            <div class="grid grid-cols-2"></div>
            <div
              class="flex justify-end"
              v-if="post.userID === authStore.storeUser.user_login.id"
            >
              <div class="dropdown mr-5 mt-3">
                <img
                  class="size-6 mr-5 mt-3"
                  src="../assets/icon/sliders.svg"
                  alt="SettingPost"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />
                <ul class="dropdown-menu">
                  <li>
                    <form @submit.prevent="apiStorePost(post.id)">
                      <button class="dropdown-item" type="submit">
                        <label
                          for="Event-Store"
                          class="text-sm ml-2 text-gray-900"
                        >
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
                      <label
                        for="Event-Post-Edit"
                        class="text-sm ml-2 text-gray-900"
                      >
                        Edit
                      </label>
                    </RouterLink>
                  </li>
                  <li>
                    <button
                      @click="apiDeletePost(post.id)"
                      class="dropdown-item"
                    >
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
        </div>
        <div
          class="w-full p-4 m-auto flex justify-center"
          v-for="postImage in post.postImage"
          :key="postImage.id"
        >
          <img
            class="size-9/12 mt-3 sm:bg-cover md:bg-contain lg:bg-auto xl:bg-cover"
            :src="'data:image/png/jpg;base64,' + postImage.imageData"
            alt="Sunset in the mountains"
          />
        </div>
        <div class="p-5">
          <blockquote
            class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ post.title }}
            </h3>
            <p class="my-4 post-content" v-html="post.content"></p>
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
            <div
              class="modal fade"
              id="modalShowMovePostContents"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">เนื้อหาทั้งหมด</h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <p
                      class="text-md text-gray-700"
                      v-html="selectedPostContent"
                    ></p>
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
          </blockquote>
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

.post-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  line-clamp: 5;
  box-orient: vertical;
  word-break: break-word;
  max-height: 120px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
