<script setup>
import UploadImageFileView from './UploadImageFileView.vue';

</script>

<template>
  <div class="container">
    <div class="w-full flex justify-center mt-10">
      <img
        class="icon-laravel"
        src="../assets/icon/laravel.png"
        alt="icon-laravel"
      />
      <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
    </div>
    <div class="w-full flex justify-items-center mt-5">
      <UploadImageFileView />
    </div>
    <div class="w-full flex justify-center mt-5">
      
    </div>
  </div>
</template>
<style scoped>
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
