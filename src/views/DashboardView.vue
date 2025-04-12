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
  console.log('function handleLike', postID, userID);
  await apiPostPopLike(userID, postID, 'Like');
  const updatedPosts = await apiGetPosts()
  posts.value = updatedPosts
}

const handleDislike = async (postID, userID) => {
  console.log('function dis like ', postID, userID);
  await apiPostPopDisLike(userID, postID, 'DisLike');
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

            <button type="button" class="btn btn-lg" @click="handleLike(post.id, authStore.storeUser.user_login?.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
                <path
                  d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
              </svg>
            </button>
            <p class="m-auto font-bold">
              {{ post.postPopularity.filter(pop => pop.status === 'Like').length || null}}
            </p>
          </div>
          <div class="flex justify-center">

            <button type="button" class="btn btn-lg" @click="handleDislike(post.id, authStore.storeUser.user_login?.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-hand-thumbs-down" viewBox="0 0 16 16">
                <path
                  d="M8.864 15.674c-.956.24-1.843-.484-1.908-1.42-.072-1.05-.23-2.015-.428-2.59-.125-.36-.479-1.012-1.04-1.638-.557-.624-1.282-1.179-2.131-1.41C2.685 8.432 2 7.85 2 7V3c0-.845.682-1.464 1.448-1.546 1.07-.113 1.564-.415 2.068-.723l.048-.029c.272-.166.578-.349.97-.484C6.931.08 7.395 0 8 0h3.5c.937 0 1.599.478 1.934 1.064.164.287.254.607.254.913 0 .152-.023.312-.077.464.201.262.38.577.488.9.11.33.172.762.004 1.15.069.13.12.268.159.403.077.27.113.567.113.856s-.036.586-.113.856c-.035.12-.08.244-.138.363.394.571.418 1.2.234 1.733-.206.592-.682 1.1-1.2 1.272-.847.283-1.803.276-2.516.211a10 10 0 0 1-.443-.05 9.36 9.36 0 0 1-.062 4.51c-.138.508-.55.848-1.012.964zM11.5 1H8c-.51 0-.863.068-1.14.163-.281.097-.506.229-.776.393l-.04.025c-.555.338-1.198.73-2.49.868-.333.035-.554.29-.554.55V7c0 .255.226.543.62.65 1.095.3 1.977.997 2.614 1.709.635.71 1.064 1.475 1.238 1.977.243.7.407 1.768.482 2.85.025.362.36.595.667.518l.262-.065c.16-.04.258-.144.288-.255a8.34 8.34 0 0 0-.145-4.726.5.5 0 0 1 .595-.643h.003l.014.004.058.013a9 9 0 0 0 1.036.157c.663.06 1.457.054 2.11-.163.175-.059.45-.301.57-.651.107-.308.087-.67-.266-1.021L12.793 7l.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581s-.027-.414-.075-.581c-.05-.174-.111-.273-.154-.315l-.353-.354.353-.354c.047-.047.109-.176.005-.488a2.2 2.2 0 0 0-.505-.804l-.353-.354.353-.354c.006-.005.041-.05.041-.17a.9.9 0 0 0-.121-.415C12.4 1.272 12.063 1 11.5 1" />
              </svg>
            </button>
            <p class="m-auto font-bold">
              <p class="m-auto font-bold">
              {{ post.postPopularity.filter(pop => pop.status === 'DisLike').length || null}}
            </p>
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
