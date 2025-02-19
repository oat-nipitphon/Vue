<template>
  <div
    v-if="posts"
    class="bg-white rounded-x1 shadow-lg mt-5 max-w-5xl m-auto p-10"
  >
    <label
      for="title-edit-text"
      class="block mb-2 text-4xl font-medium text-gray-900 dark:text-white"
    >
      Edit Post ID: {{ form.postID }}
    </label>
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
      <input type="text" class="form-control" v-model="form.title" />
    </div>
    <div class="mt-3">
      <label
        for="countries"
        class="block text-1x1 font-medium text-gray-900 dark:text-white"
        >Content</label
      >
      <EditorTipTap v-model="form.content" :v-html="form.content" />
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
      <div class="w-full mt-5">
        <div class="m-auto flex justify-center">
          <input
            id="fileImage"
            accept="image/*"
            type="file"
            class="form-control"
            @change="onSelectImageFile"
          />
        </div>
        <div v-if="isShowImageData">
          <div
            class="mt-5 flex justify-center"
            v-for="(image, index) in posts.postImage"
            :key="index"
          >
            <img
              v-if="image.imageData"
              :src="
                image.imageData
                  ? `data:image/png;base64,${image.imageData}`
                  : []
              "
              class="w-auto h-40 object-cover"
              alt="ShowImageUrl"
            />
          </div>
        </div>
        <div v-if="isShowImageUrl" class="mt-5 flex justify-center">
          <img
            v-show="imageUrl"
            :src="
              imageUrl ||
              'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
            "
            class="w-auto h-40 object-cover"
            alt="ShowImageUrl"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end mr-2 mt-auto mb-auto">
      <button
        @click="onUpdatePost"
        type="button"
        class="btn btn-primary btn-sm m-3"
      >
        Update
      </button>
      <button @click="onCancel" type="button" class="btn btn-danger btn-sm m-3">
        Cancel
      </button>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '@/stores/post'
import Swal from 'sweetalert2'
import axiosAPI from '@/services/axiosAPI'
import EditorTipTap from '@/components/EditorTipTap.vue'

const router = useRouter()
const route = useRoute()
const { apiGetPostTypes, apiGetPost, apiEditPost } = usePostStore()
const posts = ref(null)
const postTypes = ref(null)
const isSelectType = ref(true)
const isButtonSelect = ref(false)
const isNewType = ref(false)
const imageFile = ref(null)
const imageUrl = ref(null)

const form = reactive({
  userID: '',
  postID: '',
  title: '',
  content: '',
  refer: '',
  typeID: '',
  newType: '',
})

onMounted(async () => {
  postTypes.value = await apiGetPostTypes()
  posts.value = await apiGetPost(route.params.id)
  if (posts.value) {
    form.userID = posts.value.userID || ''
    form.postID = posts.value.id || ''
    form.title = posts.value.title || ''
    form.content = posts.value.content || ''
    form.refer = posts.value.refer || ''
    form.typeID = posts.value.typeID || ''
    form.newType = posts.value.newType || ''
    if (posts.value.postImage) {
      imageFile.value =
        posts.value.postImage?.map(imgFile => ({
          id: imgFile.id,
          imgData: imgFile.imageData,
        })) || []
    }
  }
})

const onSelectType = () => {
  if (form.typeID === 'new') {
    isSelectType.value = false
    isNewType.value = true
    isButtonSelect.value = true
  }
}
const onSelectAgain = () => {
  isSelectType.value = true
  isNewType.value = false
  isButtonSelect.value = false
}

const onSelectImageFile = event => {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imageUrl.value = URL.createObjectURL(file)
    console.log('View edit post image url ', imageUrl.value)
  }
}

const onUpdatePost = async () => {
  const formData = new FormData()

  formData.append('userID', form.userID)
  formData.append('postID', form.postID)
  formData.append('title', form.title)
  formData.append('content', form.content)
  formData.append('refer', form.refer)

  if (form.typeID === "new") {
    formData.append('newType', form.newType)
    formData.append('typeID', "newType")
  } else {
    formData.append('typeID', form.typeID)
    formData.append('newType', form.typeID)
  }

  console.log("typeID", form.typeID);
  console.log("newType", form.newType);

  if (imageFile.value) {
    formData.append('imageFile', imageFile.value)
  }

  try {
    if (formData == null) {
      console.log("view edit post formData false");
    }

    const res = await axiosAPI.post('/api/posts/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    Swal.fire({
      title: 'Edit Post!',
      text: 'Your confirm update post?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Update',
    }).then(result => {
      if (result.isConfirmed) {
        console.log("confirmd");
        Swal.fire({
          title: 'Success',
          text: 'Update post successfully.',
          icon: 'success',
          timer: 1500,
        }).then(() => {
          router.push({ name: 'DashboardView' })
        })
      }
    })

  } catch (error) {
    console.error("view edit post function on update post error", error)
  }
}

const onCancel = () => {
  router.push({
    name: 'DashboardView',
  })
}
</script>
