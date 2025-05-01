<template>
    <div class="bg-red-500 w-3/4 m-auto">
        11111111111111111
    </div>
</template>
<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import imageFileBasic from '@/assets/icon/keyboard.jpg'
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

const testImageProfileNull = async () => {
  const response = await fetch(imageFileBasic)
  const blob = await response.blob()
  const file = new File([blob], 'default-image.jpg', { type: 'image/jpeg' })
  // console.log('function test image profile null', file);
  return file, blob
}

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

onMounted(async () => {
  posts.value = await apiGetPosts()
})

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

const formatDateTime = (dateTime) => {
  if (!dateTime) return '-';

  const date = new Date(dateTime);

  const year = date.getFullYear() + 543; // แปลงเป็น พ.ศ.
  const month = date.getMonth(); // 0-11
  const day = date.getDate();

  const hour = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const second = date.getSeconds().toString().padStart(2, '0');

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  return `${day} ${thaiMonths[month]} ${year} เวลา ${hour}:${minute}:${second} น.`;
};

const onModalShowUserProfile = userProfile => {
  selectedUserProfile.value = userProfile
}

const onFollowers = async (postUserID, authUserID) => {
  try {
    const res = await axiosAPI.post(
      `/api/followers/${postUserID}/${authUserID}`,
      {}, // ถ้าไม่มี body ให้ส่งเป็น {} ไป
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json', // หรือเอาออกไปเลยก็ได้ถ้าไม่มี file upload
        }
      }
    );
    if (res.error) {
      console.log('api followers error', res);
    }
    posts.value = await apiGetPosts()
  } catch (error) {
    console.error('function followers error', error);
  }
}

const onPopLike = async (postUserID, authUserID) => {
  try {
    const res = await axiosAPI.post(
      `/api/pop_like/${postUserID}/${authUserID}`,
      {}, // ถ้าไม่มี body ให้ส่งเป็น {} ไป
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json', // หรือเอาออกไปเลยก็ได้ถ้าไม่มี file upload
        }
      }
    );
    if (res.error) {
      console.log('api pop like error', res);
    }

    console.log('api pop like success', res);

    posts.value = await apiGetPosts()

  } catch (error) {
    console.error('function pop like error', error);
  }
}

const isFollowing = (followersList, userId) => {
  return followersList?.some(f => f.followers_user_id === userId && f.status_followers === 'true');
};
</script>