<template>
  <div class="container bg-white ronunded shadow-lg mt-5">
    <label class="m-auto p-2 text-gray-900 text-3xl" for="Create Post New">
      Form create post
    </label>
    <div class="mt-2 text-2x1">
      <label for="Post-Title" class="mt-3 mb-3 text-gray-900 text-2x1">
        Title
      </label>
      <input v-model="form.title" type="text" class="form-control mt-2" />
    </div>
    <div class="mt-2">
      <label class="mt-3 mb-3 text-gray-900 text-2x1" for="Post-Content">
        Content
      </label>
      <EditorTipTap v-model="form.content" />
    </div>
    <div class="mt-2">
      <label class="mt-3 mb-3 text-gray-900 text-2x1" for="Post-Refer">
        Refer
      </label>
      <input v-model="form.refer" type="text" class="form-control" />
    </div>
    <div class="grid" v-if="isSelectType">
      <label for="Post-Type" class="text-gray-900 text-2x1"> Post Type </label>
      <select
        class="form-control mt-3"
        v-model="form.typeID"
        @change="onSelectType"
      >
        <option v-for="type in postTypes" :key="type.id" :value="type.id">
          {{ type.post_type_name }}
        </option>
        <option value="new">add +</option>
      </select>
    </div>

    <div class="grid grid-rows-3" v-if="isNewType">
      <div class="mt-3">
        <div>
          <label for="Type-New" class="text-gray-900 text-2x1">
            Type new
          </label>
        </div>
      </div>
      <div class="mt-2 text-2x1">
        <input type="text" class="form-control" v-model="form.newType" />
      </div>
      <div v-if="isButtonSelect" class="flex justify-end mr-3 mt-auto mb-auto">
        <button @click="onSelectAgain" class="btn btn-sm btn-outline-primary">
          เลือกประเภทที่มีอยู่
        </button>
      </div>
    </div>

    <div class="grid grid-rows-1 mt-2 bg-orange-400">
      <div class="bg-white">
        <input
          id="fileImage"
          accept="image/*"
          type="file"
          class="form-control"
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
      <button @click="onCreatePost" type="button" class="btn btn-primary btn-sm m-3">Save</button>
      <button @click="onCancel" type="button" class="btn btn-danger btn-sm m-3">Cancel</button>
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
  title: '',
  content: "<p>I'm running Tiptap with Vue.js. 🎉</p>",
  refer: '',
  typeID: '',
  newType: '',
})

const handleImageSelected = event => {
  imageFile.value = event.target.files[0]
  imageUrl.value = URL.createObjectURL(event.target.files[0])
}

const onSelectType = () => {
  if (form.value.typeID === 'new') {
    isSelectType.value = false
    isNewType.value = true
    isButtonSelect.value = true
    form.value.typeID = ''
  }
}
const onSelectAgain = () => {
  isSelectType.value = true
  isNewType.value = false
  isButtonSelect.value = false
  form.value.typeID = ''
}

const onCreatePost = async () => {
  const formData = new FormData()
  formData.append('userID', authAuth.storeUser.user_login.id)
  formData.append('title', form.value.title)
  formData.append('content', form.value.content)
  formData.append('refer', form.value.refer)

  if (imageFile.value) {
    formData.append('imageFile', imageFile.value)
  } else {
    formData.append('imageFile', imageFileBasic.value)
  }

  if (form.value.typeID === 'new') {
    formData.append('newType', form.value.newType)
  } else {
    formData.append('typeID', form.value.typeID)
  }

  // Pinia Store function action fetch api
  // await apiCreatePostNew(form);

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
          text: 'Create new successfullry.',
          icon: 'success',
          timer: 1500,
        }).then(() => {
          router.push({ name: 'DashboardView' })
        })
      }
    })
  } catch (error) {
    console.error('function on create post error ', error)
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
