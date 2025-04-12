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
const likeCount = ref(null)
const disLikeCount = ref(null)
const isLoading = ref(false)

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

const handleLike = async (postID, userID) => {
  if (isLoading.value) return
  isLoading.value = true
  await apiPostPopLike(userID, postID, 'Like');
  const updatedPosts = await apiGetPosts()
  posts.value = updatedPosts
  isLoading.value = false
}

const handleDislike = async (postID, userID) => {
  if (isLoading.value) return
  isLoading.value = true
  await apiPostPopDisLike(userID, postID, 'DisLike');
  const updatedPosts = await apiGetPosts()
  posts.value = updatedPosts
  isLoading.value = false
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
      <RouterLink class="btn btn-sm btn-primary mr-10" :to="{
        name: 'CreatePostNewView',
      }">
        Create post
      </RouterLink>
    </div>
    <div v-if="enrichedPosts.length > 0">
      <div class="max-w-full rounded-sm m-10 shadow-lg" v-for="(post, index) in enrichedPosts" :key="index">
        <div class="grid grid-cols-2">
          <div>
            <figure
              class="flex flex-col items-start justify-start p-2 m-auto text-start bg-white border-gray-200 md:rounded-es-lg dark:bg-gray-800 dark:border-gray-700">
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
                    <img class="size-8 rounded-full" src="../assets/icon/icon-user-default.png" alt="" />
                  </div>
                </div>

                <div class="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
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
            <div class="flex justify-end" v-if="post.userID === authStore.storeUser.user_login.id">
              <div class="dropdown mr-5 mt-3">
                <img class="size-6 mr-5 mt-3" src="../assets/icon/sliders.svg" alt="SettingPost"
                  data-bs-toggle="dropdown" aria-expanded="false" />
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
                    <RouterLink :to="{
                      name: 'EditPostView',
                      params: { id: post.id },
                    }" class="dropdown-item">
                      <label for="Event-Post-Edit" class="text-sm ml-2 text-gray-900">
                        Edit
                      </label>
                    </RouterLink>
                  </li>
                  <li>
                    <button @click="apiDeletePost(post.id)" class="dropdown-item">
                      <label for="Event-Post-Delete" class="text-sm ml-2 text-gray-900">
                        Delete
                      </label>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full p-4 m-auto flex justify-center" v-for="postImage in post.postImage" :key="postImage.id">
          <img class="size-9/12 mt-3 sm:bg-cover md:bg-contain lg:bg-auto xl:bg-cover"
            :src="'data:image/png/jpg;base64,' + postImage.imageData" alt="Sunset in the mountains" />
        </div>
        <div class="p-2 ml-5 mr-5">
          <blockquote class="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ post.title }}
            </h3>
            <p class="my-4 post-content" v-html="post.content"></p>
            <button v-if="post.content.length > 200" type="button" class="btn btn-sm text-primary"
              data-bs-toggle="modal" data-bs-target="#modalShowMovePostContents"
              @click="modalValuePostContent(post.content)">
              <p class="flex justify-between text-blue-600 text-sm m-auto">
                More ...
              </p>
            </button>
            <div class="modal fade" id="modalShowMovePostContents" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">เนื้อหาทั้งหมด</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <p class="text-md text-gray-700" v-html="selectedPostContent"></p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </blockquote>
        </div>

        <div class="grid grid-cols-2 bg-white p-3">
          <div class="flex justify-center">

            <button v-if="post.postPopularity.some(pop => pop.userID === authStore.storeUser.user_login.id && pop.status === 'Like')" :disabled="isLoading"
              type="button" class="btn btn-lg" @click="handleLike(post.id, authStore.storeUser.user_login?.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-hand-thumbs-up-fill text-blue-600" viewBox="0 0 16 16">
                <path
                  d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
              </svg>
            </button>
            <button v-else :disabled="isLoading" type="button" class="btn btn-lg"
              @click="handleLike(post.id, authStore.storeUser.user_login?.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-hand-thumbs-up-fill text-white" viewBox="0 0 16 16">
                <path
                  d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
              </svg>
            </button>
            <p class="m-auto font-bold">
              {{post.postPopularity.filter(pop => pop.status === 'Like').length || 0}}
            </p>
          </div>
          <div class="flex justify-center">
            <button v-if="post.postPopularity.some(pop => pop.userID === authStore.storeUser.user_login.id && pop.status === 'DisLike')" :disabled="isLoading"
              type="button" class="btn btn-lg" @click="handleDislike(post.id, authStore.storeUser.user_login?.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-hand-thumbs-up-fill text-red-600" viewBox="0 0 16 16">
                <path
                  d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
              </svg>
            </button>
            <button v-else :disabled="isLoading" type="button" class="btn btn-lg"
              @click="handleDislike(post.id, authStore.storeUser.user_login?.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-hand-thumbs-up-fill text-white" viewBox="0 0 16 16">
                <path
                  d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
              </svg>
            </button>
            <p class="m-auto font-bold">
              <!-- {{post.postPopularity.filter(pop => pop.status === 'DisLike').length || 0}} -->
              {{ post.disLikeCount }}
            </p>
          </div>
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
