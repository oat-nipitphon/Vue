<script setup>
import axiosAPI from '@/services/axiosAPI'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

const userID = ref(null)
const imageFile = ref(null)
const imageUrl = ref(null)

const onSelectImageFile = event => {
  imageFile.value = event.target.files[0]
  const file = event.target.files[0]
  imageUrl.value = URL.createObjectURL(file)
  userID.value = authStore.storeUser.user_login.id
}

const onUploadFile = async () => {
  const formData = new FormData()
  formData.append('userID', userID.value)
  if (imageFile.value) {
    formData.append('imageFile', imageFile.value)
  }

  try {
    const response = await axiosAPI.post('/api/user/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    Swal.fire({
      title: '',
      text: '',
      icon: '',
      timer: 1500,
      timerProgressBar: 1500,
    }).then(() => {
      window.location.reload()
    })
  } catch (error) {
    console.error('function upload image error', error)
  }
}
</script>
<template>
  <div class="container">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-sm btn-outline-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      Upload Images
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Profile {{ authStore.storeUser?.user_login?.id || 'N/A' }}
            </h5>
            <button
              type="button"
              class="btn-sm btn-close text-gray-900"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <div class="flex flex-col items-center space-y-4">
              <!-- Image Preview -->
              <div class="flex justify-center w-full">
                <img
                  class="ibox-image-profile shadow-lg rounded-lg"
                  v-show="imageUrl"
                  :src="imageUrl || defaultImage"
                  alt="Profile Image"
                />
              </div>

              <!-- File Input -->
              <input
                @change="onSelectImageFile"
                type="file"
                accept="image/*"
                id="imageProfile"
                class="block w-full border rounded-lg p-2"
              />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-sm btn-primary w-full" @click="onUploadFile">
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.ibox-image-profile {
  width: 50%;
  height: auto;
  margin: auto;
}
</style>
