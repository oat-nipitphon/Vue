<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import AdminTableReportPost from "@/components/AdminTableReportPost.vue";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
import { useAdminPostStore } from "@/stores/admin.posts";
const { apiGetPosts } = usePostStore();
const posts = ref([]);
onMounted(async () => {
  posts.value = await apiGetPosts();
  console.log("admin manager post view", posts.value);
});
</script>
<template>
  <div class="container mt-10">
    <div class="row">
      <RouterLink
        class="btn btn-sm btn-dargen mt-5 mr-5 mb-5"
        :to="{
          name: 'AdminDashboardView',
        }"
      >
        back
      </RouterLink>
    </div>
    <div class="w-full">
      <!-- <AdminTableReportPost /> -->
    </div>
  </div>
</template>
