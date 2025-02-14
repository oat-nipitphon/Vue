<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminTableReportUserProfile from "@/components/AdminTableReportUserProfile.vue";
</script>
<template>
  <div class="container">
    <div class="w-full mt-10">
      <AdminTableReportUserProfile />
    </div>
  </div>
</template>
