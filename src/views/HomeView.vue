<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'
import FileImageUpload from '@/components/FileImageUpload.vue';

</script>

<template>
  <div>
    <FileImageUpload />
  </div>
</template>
