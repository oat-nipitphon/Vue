<script setup>
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const authStore = useAuthStore();
console.log("DashboardView :: ", authStore.storeUser.user_login.id);
const { apiGetPosts } = usePostStore();
const posts = ref(null);

onMounted(async () => {
  posts.value = await apiGetPosts();
});
</script>
<template>
  <div class="container">
    <div class="w-full mt-10 flex justify-end">
      <RouterLink
        class="btn btn-sm btn-primary mt-10 mr-20"
        :to="{ name: 'CreatePostNewView' }"
      >
        Create post new.
      </RouterLink>
    </div>
    <div class="w-full mt-10" v-if="posts">
      <div class="row" v-for="post in posts" :key="post.id">
        <div
          style="margin-top: 15px;"
          class="flex justify-start mt-10"
          v-if="authStore.storeUser.user_login.id !== post.user_id"
        >
          {{ post.post_title }}
        </div>

        <div
          style="margin-top: 15px;"
          class="flex justify-end mt-10"
          v-if="authStore.storeUser.user_login.id === post.user_id"
        >
          {{ post.post_content }}
        </div>
      </div>
    </div>
    <div
      class="w-full mt-10 inline-flex items-center justify-center text-lg font-medium text-center pt-10"
      v-else
    >
      <p>ไม่มีข้อมูล</p>
    </div>
  </div>
</template>
