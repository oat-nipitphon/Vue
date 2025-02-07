<script setup>
import Swal from "sweetalert2";
import axiosAPI from "@/services/axiosAPI";
import { ref, onMounted, reactive } from "vue";
import { useRoute, RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const { apiGetPost, apiGetPostTypes, apiEditPost } = usePostStore();
const { errors } = storeToRefs(usePostStore());

const post = ref([]);
const postTypes = ref([]);
const imageFile = ref(null);
const imageUrl = ref(null);
const isShowImageData = ref(true);
const isShowImageUrl = ref(false);

// console.log("user ID ", authStore.storeUser.user_login.id);
const form = reactive({
  userID: authStore.storeUser.user_login.id,
  postID: "",
  title: "",
  content: "",
  refer: "",
  typeID: "",
  newType: "",
});

// const newType = ref(null);
const isNewType = ref(false);

const handleImageSelected = (e) => {
  try {
    imageFile.value = e.target.files[0];

    if (imageFile.value) {
      isShowImageData.value = false;
      isShowImageUrl.value = true;
      imageUrl.value = URL.createObjectURL(e.target.files[0]);
    }
  } catch (error) {
    console.error("edit post view function handleImageSelected error", error);
  }
};

const onSelectType = () => {
  if (form.typeID === "new") {
    isNewType.value = true;
    form.typeID = "new";
  }
  console.log("form new type ", form.newType);
};

const onEditUpdate = async () => {
  const formData = new FormData();
  formData.append("userID", form.userID);
  formData.append("postID", form.postID);
  formData.append("title", form.title);
  formData.append("content", form.content);
  formData.append("refer", form.refer);

  if (imageFile.value) {
    formData.append("imageFile", imageFile.value);
  } 

  if (form.typeID === "new") {
    formData.append("newType", form.newType);
  } else {
    formData.append("typeID", form.typeID);
  }

  try {
    const response = await axiosAPI.post("/api/posts/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log(response);
    if (response.status === 200) {
      Swal.fire({
      title: "Edit Post!",
      text: "Your confirm edit new post?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success",
          text: "Edit post successfullry.",
          icon: "success",
          timer: 1500,
        }).then(() => {
          router.push({ name: "DashboardView" });
        });
      }
    });
    }

  } catch (error) {
    console.error("function on update post error ", error);
  }
};

const btnCancel = () => {
  router.push({ name: "DashboardView" });
};

onMounted(async () => {
  // Get Post Edit API
  try {
    post.value = await apiGetPost(route.params.id);

    if (post.value) {
      form.postID = post.value.id || [];
      form.title = post.value.title || [];
      form.content = post.value.content || [];
      form.refer = post.value.refer || [];
      form.typeID = post.value.postType.id || [];
      form.userID = post.value.userID || [];
      imageFile.value =
        post.value.postImage?.map((imgFile) => ({
          id: imgFile.id,
          imgData: imgFile.imageData,
        })) || [];

        console.log("form post ID", form.postID);
    }



  } catch (error) {
    console.error("Error fetching post :", error);
  }

  // Get Post Types API
  try {
    postTypes.value = await apiGetPostTypes();
  } catch (error) {
    console.error("Error fetching post types:", error);
  }
});
</script>
<template>
  <div v-if="post">
    <div class="container">
      <!-- <form class="w-10/12 m-auto p-2 mt-5" @submit.prevent="apiEditPost(form)"> -->
      <div class="mt-10 text-md">
        <label for="Create Post New"> Edit Post</label>
        <div class="mt-2 text-md">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="PostType"
          >
            Post Type
          </label>
          <select
            id="PostType"
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
        <div v-if="isNewType">
          <label for="newType" class="text-gray-900 text-sm">New Type</label>
          <input type="text" v-model="form.newType" class="form-control" />
        </div>
        <div class="mt-2 text-sm">
          <label for="Post-Title"> Title </label>
          <input v-model="form.title" type="text" class="form-control" />
        </div>
        <div class="mt-2 text-md">
          <label for="Post-Content"> Content </label>
          <textarea
            v-model="form.content"
            class="form-control"
            rows="5"
            cols="10"
          ></textarea>
        </div>
        <div class="mt-2 text-md">
          <label for="Post-Refer"> Refer </label>
          <input v-model="form.refer" type="text" class="form-control" />
        </div>
        <div class="w-full mt-5">
          <div class="m-auto flex justify-center">
            <input
              id="fileImage"
              accept="image/*"
              type="file"
              class="form-control"
              @change="handleImageSelected"
            />
          </div>
          <div v-if="isShowImageData">
            <div
              class="mt-5 flex justify-center"
              v-for="(image, index) in post.postImage"
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
        <div class="mt-10 flex justify-end">
          <button
            @click="onEditUpdate"
            type="submit"
            class="m-5 text-back inline-flex justify-end bg-yellow-300 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-300 dark:hover:bg-yellow-300 dark:focus:ring-yellow-300"
          >
            <svg
              aria-hidden="true"
              class="mr-1 -ml-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
              ></path>
              <path
                fill-rule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Update
          </button>
        </div>
      </div>
      <!-- </form> -->
      <div class="flex justify-end mt-5">
        <button
          @click="btnCancel"
          type="button"
          class="m-5 inline-flex justify-end text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-1.5 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.btn-size {
  width: 50px;
  height: 40px;
}
</style>
