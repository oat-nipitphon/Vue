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
    <div class="row mt-10">
      <!-- <div class="col-md-6 flex justify-center">
        <img
          class="icon-laravel"
          src="../assets/icon/laravel.png"
          alt="icon-laravel"
        />
      </div>
      <div class="col-md-6 flex justify-center">
        <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
      </div> -->
    </div>
    <div class="m-auto">
      <FormLogin />
    </div>
    <div class="mt-10 text-center">
      <!-- <Toggle v-model="isOn" /> -->
    </div>
  </div>
</template>

<style scoped>
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
.icon-laravel {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.icon-vue {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #35495e;
}
</style>
