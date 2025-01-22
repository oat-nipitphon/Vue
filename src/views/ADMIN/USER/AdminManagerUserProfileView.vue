<script setup>
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import AdminTableReportUserProfile from "@/components/AdminTableReportUserProfile.vue";

Swal.fire({
  title: "Hello World!",
  timer: 2000, // Close automatically after 1500 milliseconds
  timerProgressBar: true, // Optional: Show a progress bar
});

</script>
<template>
<div class="container">
  <div>
    <AdminTableReportUserProfile />
  </div>
</div>
</template>
