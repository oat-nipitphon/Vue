<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
const authStore = useAuthStore();
const postStore = usePostStore();

const { apiGetPosts } = usePostStore();
const posts = ref(null);

posts.value = await apiGetPosts();

console.log("Posts :: ", posts.value);
</script>
<template>
  <div class="container mt-10" v-if="posts">
    <div class="w-full mt-10 p-5" v-for="post in posts" :key="post.id">
      {{ post.id }}
      {{ post.post_title }}
      {{ post.post_content }}
    </div>
  </div>
  <div v-else>
    <h3>posts null</h3>
  </div>
</template>
