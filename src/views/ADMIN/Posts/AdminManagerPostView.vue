<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAdminPostStore } from "@/stores/admin.posts";
import AdminTableReportPost from "@/components/AdminTableReportPost.vue";

</script>
<template>
<div class="container mt-10">
    <div class="w-full">
      <AdminTableReportPost />
    </div>
</div>
</template>
