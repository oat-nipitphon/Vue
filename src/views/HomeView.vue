<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Swal from 'sweetalert2'

const users = ref(null)

// ฟังก์ชันสำหรับโหลดข้อมูลผู้ใช้
const getUsers = async () => {
  try {
    const authStore = useAuthStore()
    users.value = await authStore.apiStoreUsers()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Failed to load user data. Please try again later.',
    })
  }
}

const showAlert = () => {
  Swal.fire({
    title: 'Hello Vue World!',
    text: 'This is a SweetAlert2 example.',
    icon: 'info',
    confirmButtonText: 'OK',
  })
}

onMounted(() => {
  getUsers()
})

</script>

<template>
  <div>
    <div>
      <button @click="showAlert">Show Alert</button>
    </div>

    <!-- แสดงข้อมูลผู้ใช้ -->
    <div v-if="users && users.length">
      <div v-for="user in users" :key="user.id">
        <p>{{ user.name }}</p>
      </div>
    </div>
    <div v-else>
      <h2>No data available</h2>
    </div>
  </div>
</template>
