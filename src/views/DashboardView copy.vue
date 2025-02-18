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

    <div class="w-full" v-if="posts">
      <div class="mt-5 shadow-full rounded-full"
        v-for="post in posts" :key="post.id"
      >
      <p class="text-sm text-gray-900 mt-2 mb-2">{{ post.title }}</p>
      <p class="text-sm text-gray-900 mt-2 mb-2" v-html="post.content"></p>
      </div>
    </div>

    <div class="w-full" v-if="enrichedPosts.length > 0">
      <div
        class="container mt-5 bg-white rounded shadow-lg"
        v-for="(post, index) in enrichedPosts"
        :key="index"
      >
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-5xl lg:py-16">
            <!-- Card Post Main -->
            <div class="grid grid-rows-3">
              <div class="w-full flex justify-between">
                <div class="grid grid-cols-2">
                  <div class="grid grid-rows-2">
                    <div>
                      <label
                        class="text-lg font-extrabold text-gray-900 dark:text-white"
                      >
                        {{ post.title }}
                      </label>
                    </div>
                    <div>
                      <label class="font-semibold text-sm text-gray-700">
                        สร้างโพสต์ วันที่ {{ formatDate(post.createdAt) }}
                      </label>
                    </div>
                  </div>
                  <div class="flex justify-end mt-auto mb-auto mr-2">
                    <!-- Dropdown Event Post Edit Delete -->
                    <div
                      v-if="post.userID === authStore.storeUser.user_login.id"
                      class="flex justify-end m-1"
                    >
                      <div class="dropdown mr-5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          class="bi bi-hand-thumbs-up-fill"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <path
                            d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                          />
                        </svg>
                        <ul class="dropdown-menu">
                          <li>
                            <form @submit.prevent="apiStorePost(post.id)">
                              <button class="dropdown-item" type="submit">
                                <label
                                  for="Event-Store"
                                  class="text-sm text-gray-900"
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
                                class="text-sm text-gray-900"
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
                                class="text-sm text-gray-900"
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

                <label
                  class="text-md ml-3 font-extrabold text-gray-900 dark:text-white"
                >
                  {{ post.postType.name }}
                </label>
              </div>
              <!-- Image Post -->
              <div
                class="grid"
                v-for="(postImage, index) in post.postImage"
                :key="index"
              >
                <img
                  class="w-full"
                  :src="'data:image/png;base64,' + postImage.imageData"
                  alt="postImage"
                />
              </div>
              <div class="grid w-full">
                <p v-html="post.content" class="mb-4 text-gray-500 dark:text-gray-400 line-clamp-5">
                  
                </p>
              </div>
            </div>
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
                    <label class="text-md text-gray-500 m-1">
                      {{ selectedPostContent }}
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

          <div class="grid grid-clos-2">
            <div class="flex justify-end mb-3">
              <div class="row text-center">
                <div class="col-sm-6">
                  <div class="row m-auto">
                    <svg
                      v-if="post.userLiked === true"
                      @click="handleLike(post)"
                      class="text-primary bi bi-hand-thumbs-up-fill"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                      />
                    </svg>
                    <svg
                      v-else
                      @click="handleLike(post)"
                      class="text-secondary bi bi-hand-thumbs-up-fill"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="22"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                      />
                    </svg>
                  </div>
                  <div class="row m-auto">
                    <label class="text-md"> Likes: {{ post.likeCount }} </label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="row m-auto">
                    <svg
                      v-if="post.userDisliked === true"
                      @click="handleDislike(post)"
                      class="text-danger bi bi-hand-thumbs-down-fill"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"
                      />
                    </svg>
                    <svg
                      v-else
                      @click="handleDislike(post)"
                      class="text-secondary bi bi-hand-thumbs-down-fill"
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"
                      />
                    </svg>
                  </div>
                  <div class="row m-auto">
                    <label class="text-md">
                      Likes: {{ post.disLikeCount }}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
