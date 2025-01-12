<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'


</script>

<template>
  <div class="w-full flex justify-center mt-10">
    <img class="icon-laravel" src="../assets/icon/laravel.png" alt="icon-laravel">
    <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue">
  </div>
</template>
<style>
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
</style>