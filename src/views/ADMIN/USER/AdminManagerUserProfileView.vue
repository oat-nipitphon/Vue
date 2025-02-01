<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminTableReportUserProfile from "@/components/AdminTableReportUserProfile.vue";
</script>
<template>
  <div class="container">
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
      <AdminTableReportUserProfile />
    </div>
  </div>
</template>
