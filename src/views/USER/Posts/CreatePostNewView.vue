<template>
  <div class="bg-white rounded-xl shadow-lg mt-5 max-w-5xl m-auto p-10">
    <label
      for="countries"
      class="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
      >Create post new.</label
    >
    <div class="grid mt-5" v-if="isSelectType">
      <label
        for="countries"
        class="block mb-2 text-1xl font-medium text-gray-900 dark:text-white"
        >Select type post</label
      >
      <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="form.typeID"
        @change="onSelectType"
      >
        <option v-for="type in postTypes" :key="type.id" :value="type.id">
          {{ type.post_type_name }}
        </option>
        <option value="new">add +</option>
      </select>
    </div>

    <div class="grid grid-rows-2 mt-5" v-if="isNewType">
      <div class="grid grid-cols-2">
        <div>
          <label
            for="countries"
            class="block mb-2 text-text-1x1 font-medium text-gray-900 dark:text-white"
            >New type post</label
          >
        </div>
        <div
          v-if="isButtonSelect"
          class="flex justify-end mr-3 mt-auto mb-auto"
        >
          <button @click="onSelectAgain" class="btn btn-sm btn-outline-primary">
            <label>Select type post</label>
          </button>
        </div>
      </div>
      <input type="text" class="form-control" v-model="form.newType" />
    </div>
    <div class="mt-3">
      <label
        for="countries"
        class="block text-1x1 font-medium text-gray-900 dark:text-white"
        >Title</label
      >
      <input v-model="form.title" type="text" class="form-control" />
    </div>
    <div class="mt-3">
      <label
        for="countries"
        class="block text-1x1 font-medium text-gray-900 dark:text-white"
        >Content</label
      >
      <EditorTipTap v-model="form.content" />
    </div>
    <div class="mt-2">
      <label
        for="countries"
        class="block mb-2 text-1x1 font-medium text-gray-900 dark:text-white"
        >Refer</label
      >
      <input v-model="form.refer" type="text" class="form-control" />
    </div>
    <div class="grid grid-rows-1 mt-2">
      <label
        class="block mb-2 text-1x1 font-medium text-gray-900 dark:text-white"
        for="user_avatar"
        >Upload file</label
      >
      <div class="bg-white">
        <input
          id="fileImage"
          accept="image/*"
          type="file"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          @change="handleImageSelected"
        />
        <img
          :src="
            imageUrl ||
            'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
          "
          alt="Image Preview"
          class="ibox-image-post"
        />
      </div>
    </div>
    <div class="flex justify-end mr-2 mt-auto mb-auto">
      <button
        @click="onCreatePost"
        type="button"
        class="btn btn-primary btn-sm m-3"
      >
        Save
      </button>
      <button @click="onCancel" type="button" class="btn btn-danger btn-sm m-3">
        Cancel
      </button>
    </div>
  </div>
</template>
<style>
.ibox-image-post {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  height: 350px;
}
</style>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import Swal from 'sweetalert2'
import axiosAPI from '@/services/axiosAPI'
import EditorTipTap from '@/components/EditorTipTap.vue'
import imageFileBasic from '@/assets/icon/keyboard.jpg'

const router = useRouter()
const authAuth = useAuthStore()
const postTypes = ref(null)
const isSelectType = ref(true)
const isButtonSelect = ref(false)
const isNewType = ref(false)
const imageFile = ref(null)
const imageUrl = ref(null)

const { apiGetPostTypes, apiCreatePostNew } = usePostStore()

const form = ref({
  title: "",
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  refer: "",
  typeID: "",
  newType: "",
})

const onSelectType = () => {
  if (form.value.typeID === 'new') {
    isSelectType.value = false
    isNewType.value = true
    isButtonSelect.value = true
    form.value.typeID = 0;
    console.log("onSelectType if ", form.value.typeID);
  } else{
    form.value.newType = 0;
    console.log("onSelectType else ", form.value.newType);
  }
}
const onSelectAgain = () => {
  isSelectType.value = true
  isNewType.value = false
  isButtonSelect.value = false

}

const handleImageSelected = event => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imageUrl.value = URL.createObjectURL(file)
  }
}

const onCreatePost = async () => {
  const formData = new FormData()

  formData.append('userID', authAuth.storeUser.user_login.id)
  formData.append('title', form.value.title)
  formData.append('content', form.value.content)
  formData.append('refer', form.value.refer)
  formData.append('newType', form.value.newType);
  formData.append('typeID', form.value.typeID);

  if (imageFile.value) {
    formData.append('imageFile', imageFile.value)
  } else {
    const response = await fetch(imageFileBasic)
    const blob = await response.blob()
    const file = new File([blob], "default-image.jpg", { type: "image/jpeg" })
    formData.append('imageFile', file)
  }

  try {
    const response = await axiosAPI.post('/api/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    Swal.fire({
      title: 'New Post!',
      text: 'Your confirm create new post?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Confirm',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Success',
          text: 'Create new successfully.',
          icon: 'success',
          timer: 1500,
        }).then(() => {
          console.log("create post success response", response);
          router.push({ name: 'DashboardView' })
        })
      }
    })
  } catch (error) {
    console.error('Error creating post:', error)
  }
}

const onCancel = () => {
  router.push({ name: 'DashboardView' })
}

onMounted(async () => {
  postTypes.value = await apiGetPostTypes()
  console.log('create post get post type ', postTypes.value)
})

</script>
