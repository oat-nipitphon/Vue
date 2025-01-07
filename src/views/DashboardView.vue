<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const { storeUser } = storeToRefs(authStore);

</script>
<template>
  <div v-if="storeUser">
    <div>
      <p>{{ storeUser.name }}</p>
    </div>
  </div>
  <div v-else>
    <center>
      <h1>ไม่มีข้อมูล</h1>
    </center>
  </div>
</template>