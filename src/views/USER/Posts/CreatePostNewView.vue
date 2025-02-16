<template>
  <div class="container">
    <div class="container mt-10 text-md bg-white ronunded shadow">
      <label class="m-auto p-2 text-gray-900 text-3xl" for="Create Post New">
        Form create post
      </label>
      <form class="w-10/12 m-auto p-2 mt-5" @submit.prevent="onCreatePost">
        <div class="mt-2 text-md">
          <!-- Form Select Type -->
          <label for="Post-Type" class="mt-3 mb-3 text-gray-900 text-2x1">
            Post Type
          </label>
          <select
            class="form-control"
            v-model="form.typeID"
            @change="onSelectType"
          >
            <option v-for="type in postTypes" :key="type.id" :value="type.id">
              {{ type.post_type_name }}
            </option>
            <option value="new">add +</option>
          </select>
        </div>
        <div class="mt-2 text-md" v-if="isNewType">
          <!-- Form New Type -->
          <label for="Type-New" class="mt-3 mb-3 text-gray-900 text-2x1">
            Type new
          </label>
          <input type="text" class="form-control" v-model="form.newType" />
        </div>
        <div class="mt-2 text-sm">
          <!-- Form Title -->
          <label for="Post-Title"> Title </label>
          <input v-model="form.title" type="text" class="form-control" />
        </div>
        <div class="mt-2 text-md">
          <!-- Form Content -->
          <label for="Post-Content"> Content </label>
          <EditorTipTap />
          <!-- <textarea
            v-model="form.content"
            class="form-control"
            rows="5"
            cols="10"
          ></textarea> -->
        </div>
        <div class="mt-2 text-md">
          <label for="Post-Refer"> Refer </label>
          <input v-model="form.refer" type="text" class="form-control" />
        </div>
        <div class="row m-5">
          <input
            id="fileImage"
            accept="image/*"
            type="file"
            class="form-control"
            @change="handleImageSelected"
          />
        </div>
        <div class="row m-5">
          <img
            v-show="imageUrl"
            :src="
              imageUrl ||
              'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
            "
            class="w-auto h-48 object-cover"
            alt="ShowImageUrl"
          />
        </div>
        <div class="mt-2 mr-10 flex justify-end">
          <button type="submit" class="btn btn-sm btn-primary m-2">Save</button>
        </div>
      </form>
      <div class="mt-2 flex justify-end">
        <button
          @click="btnCancel"
          type="submit"
          class="btn btn-sm btn-outline-danger m-2"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Swal from 'sweetalert2'
import axiosAPI from '@/services/axiosAPI'
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import EditorTipTap from '@/components/EditorTipTap.vue'
const authAuth = useAuthStore()
const router = useRouter()
const postTypes = ref(null)
const { apiGetPostTypes, apiCreatePostNew } = usePostStore()
const authUserID = ref(null)

const form = ref({
  title: '',
  content: '',
  refer: '',
  typeID: '',
  newType: '',
})

const isNewType = ref(false)

const imageFileBasic = ref(null)
imageFileBasic.value =
  'https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=pQ4M4LiSPCcQ7kNvgG9_eZm&_nc_oc=AdhODB76hbqSN1gojgQ0Qq6D7lQv-Vn-JZhJdzoX-r6dgACwHNvmdNDKiqapObYu7JNiSz3NNQKlb359fz2DNJs3&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AOUeEXHhWhEXESqz8T9UQbq&oh=00_AYCjcN5cI21D3BpxKTLg5zdiLZhSzRrjFbqI0EWHQOE-zA&oe=67AC3071'
const imageFile = ref(null)
const imageUrl = ref(null)

const handleImageSelected = e => {
  imageUrl.value = URL.createObjectURL(e.target.files[0])
  imageFile.value = e.target.files[0]
}

const onSelectType = () => {
  if (form.value.typeID === 'new') {
    isNewType.value = true
    form.value.typeID = ''
  }
  console.log('form new type ', form.value.newType)
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

const btnCancel = () => {
  router.push({ name: 'DashboardView' })
}

onMounted(async () => {
  postTypes.value = await apiGetPostTypes()
  console.log('create post get post type ', postTypes.value)
})
</script>
