<script setup>
import { ref } from 'vue'
import FormLogin from '@/views/LoginView.vue'

// ตัวอย่างการสร้าง blob URL จากไฟล์วิดีโอที่อัปโหลด
// blob:https://main.24playerhd.com/3f8cf8a5-24f3-4aa3-8f96-a0c9460c1b7f
const videoBlobUrl = ref('') // ใส่ blob URL ที่ได้จาก JS
videoBlobUrl.value = 'https://main.24playerhd.com/3f8cf8a5-24f3-4aa3-8f96-a0c9460c1b7f'

// สมมุติว่าได้มาจาก input file
function handleFileUpload(file) {
  videoBlobUrl.value = URL.createObjectURL(file)
}

</script>
<template>
  <div class="container">
    <div class="m-auto">
      <FormLogin />
    </div>
    <!-- <div class="flex justify-center m-5">
      <video controls :src="videoBlobUrl"></video>
    </div> -->
  </div>
</template>

<style scoped>
.image-profile-title-post {
  width: 200px;
  height: 120px;
}

.post-content {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;

  line-clamp: 5;
  box-orient: vertical;
  word-break: break-word;
  max-height: 120px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
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
.btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn:hover {
  background-color: #35495e;
}
</style>
