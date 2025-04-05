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
const fileImage = ref(null);

const isImageData = ref(true)
const isImageSelectFile = ref(false)

const form = ref({
  userID: "",
  postID: "",
  title: "",
  content: "",
  refer: "",
  typeID: "",
  typeName: "",
  newType: ""
})


const getImage = (image) => {
  if (!image) return '';

  // If it's a base64 string (already contains MIME type)
  if (image.startsWith('data:')) {
    return image;
  }

  // If it's a file extension, we guess MIME type and prepend the base64 data
  const fileExtension = image.split('.').pop().toLowerCase();
  let mimeType = '';

  switch (fileExtension) {
    case 'png':
      mimeType = 'image/png';
      break;
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'gif':
      mimeType = 'image/gif';
      break;
    case 'webp':
      mimeType = 'image/webp';
      break;
    default:
      mimeType = 'image/png'; // Default to PNG if type is unknown
  }

  return `data:${mimeType};base64,${image}`;
}

const onSelectType = () => {
  if (form.value.typeID === 'new') {
    isSelectType.value = false
    isNewType.value = true
    isButtonSelect.value = true
    isButtonSelect.value = true
    form.value.typeID = 0;
    console.log("onSelectType typeID", form.value.typeID);
  } else {
    form.value.newType = 0;
    console.log("onSelectType newType", form.value.newType);
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

    imageFile.value = event.target.files[0]
    imageUrl.value = URL.createObjectURL(file)

  }
  console.log('image file', imageFile.value)
  isImageData.value = false
  isImageSelectFile.value = true

}

const onUpdatePost = async () => {
  console.log("onUpdate :: ", form.value.newtype);
  const formData = new FormData()
  formData.append('userID', form.value.userID)
  formData.append('postID', form.value.postID)
  formData.append('title', form.value.title)
  formData.append('content', form.value.content)
  formData.append('refer', form.value.refer)
  formData.append('typeID', form.value.typeID);
  formData.append('newType', form.value.newType);

  if (imageFile.value) {
    formData.append('imageFile', imageFile.value)
    console.log('form data image file', imageFile.value);
  }

  try {

    const res = await axiosAPI.post('/api/posts/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });

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
        Swal.fire({
          title: 'Success',
          text: 'Update post successfully.',
          icon: 'success',
          timer: 1500,
          timerProgressBar: 1500
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

onMounted(async () => {
  postTypes.value = await apiGetPostTypes();
  posts.value = await apiGetPost(route.params.id);

  if (posts.value) {
    form.value.userID = posts.value.userID || "";
    form.value.postID = posts.value.id || "";
    form.value.title = posts.value.title || "";
    form.value.content = posts.value.content || "";
    form.value.refer = posts.value.refer || "";
    form.value.typeID = posts.value.postType.id || "";
    form.value.typeName = posts.value.postType.typeName || "";
    form.value.newType = posts.value.newType || "";

    fileImage.value = posts.value.postImage?.map(imgFile => ({
      id: imgFile.id,
      imgData: imgFile.imageData,
    })) || [];

    if (fileImage.value && fileImage.value.length > 0) {
      imageFile.value = fileImage.value; // Array is not empty
      console.log('image true', imageFile.value);
    } else {
      imageFile.value = false; // Array is empty
      console.log('image false', imageFile.value);
    }
  }
});

</script>
<template>
  <div v-if="posts" class="bg-white rounded-xl shadow-lg mt-5 max-w-5xl m-auto p-10">
    <label for="title-edit-text" class="block mb-2 text-4xl font-medium text-gray-900 dark:text-white">
      Edit Post ID: {{ form.postID }}
    </label>

    <!-- Post Type Selection -->
    <div class="grid mt-5" v-if="isSelectType">
      <label for="countries" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
        Select Post Type
      </label>
      <select
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        v-model="form.typeID" @change="onSelectType">
        <option v-for="type in postTypes" :key="type.id" :value="type.id">
          {{ type.post_type_name }}
        </option>
        <option value="new">Add New Type +</option>
      </select>
    </div>

    <!-- New Post Type Entry -->
    <div class="grid grid-rows-2 mt-5" v-if="isNewType">
      <div class="grid grid-cols-2">
        <div>
          <label for="newTypePost" class="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            New Type Post
          </label>
        </div>
        <div v-if="isButtonSelect" class="flex justify-end mt-auto mb-auto">
          <button @click="onSelectAgain" class="btn btn-sm btn-outline-primary">
            Select Post Type
          </button>
        </div>
      </div>
      <input id="newTypePost" type="text" v-model="form.newType" class="form-control mt-2" />
    </div>

    <!-- Post Title -->
    <div class="mt-3">
      <label for="postTitle" class="block text-xl font-medium text-gray-900 dark:text-white">
        Title
      </label>
      <input id="postTitle" v-model="form.title" type="text" class="form-control mt-2" placeholder="Enter Post Title" />
    </div>

    <!-- Post Content (Editor) -->
    <div class="mt-3">
      <label for="postContent" class="block text-xl font-medium text-gray-900 dark:text-white">
        Content
      </label>
      <EditorTipTap v-model="form.content" id="postContent" />
    </div>

    <!-- Post Reference -->
    <div class="mt-2">
      <label for="postRefer" class="block text-xl font-medium text-gray-900 dark:text-white">
        Reference
      </label>
      <input id="postRefer" v-model="form.refer" type="text" class="form-control mt-2"
        placeholder="Enter Reference URL" />
    </div>

    <!-- Upload File Section -->
    <div class="mt-3">
      <label for="fileImage" class="block text-xl font-medium text-gray-900 dark:text-white">Upload Image</label>
      <div class="bg-white">
        <input id="fileImage" accept="image/*" type="file"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          @change="handleImageSelected" />


        <div v-if="isImageData" v-for="(row, index) in posts.postImage" :key="index">
          <img v-if="row.imageData" :src="`data:image/png;base64,${row.imageData}`" class="ibox-image-post mt-3">
          <img v-else
            src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
            class="ibox-image-post mt-3">
        </div>

        <div v-if="isImageSelectFile">
          <img :src="imageUrl ||
            'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
            " alt="Image Preview" class="ibox-image-post mt-3" />
        </div>

      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end mt-5">
      <button @click="onUpdatePost" type="button" class="btn btn-primary btn-sm m-3">
        Update
      </button>
      <button @click="onCancel" type="button" class="btn btn-danger btn-sm m-3">
        Cancel
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Image Preview */
.ibox-image-post {
  width: 100%;
  height: 350px;
  object-fit: cover;
  margin-top: 20px;
  margin-bottom: 20px;
}

/* Button Styling */
.btn-outline-primary {
  border-color: #3498db;
  color: #3498db;
}

.btn-outline-primary:hover {
  background-color: #3498db;
  color: white;
}

.btn-primary {
  background-color: #3498db;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c0392b;
}
</style>
