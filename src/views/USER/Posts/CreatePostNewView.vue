<script setup>
import axios from "axios";
import axiosAPI from "@/services/axiosAPI";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";
const authAuth = useAuthStore();
const router = useRouter();
const postTypes = ref(null);
const { apiGetPostTypes, apiCreatePostNew } = usePostStore();
const authUserID = ref(null);

const form = ref({
  title: "",
  content: "",
  refer: "",
  typeID: "",
  newType: ""
});

const isNewType = ref(false);

const imageFile = ref(null);
const imageUrl = ref(null);

const handleImageSelected = (e) => {
  imageUrl.value = URL.createObjectURL(e.target.files[0]);
  imageFile.value = e.target.files[0];
};

const onSelectType = () => {
  if (form.value.typeID === "new") {
    isNewType.value = true;
    form.value.typeID = "";
  }
  console.log("form new type ", form.value.newType);
};

const onCreatePost = async () => {

  const formData = new FormData();
  formData.append("userID", authAuth.storeUser.user_login.id);
  formData.append("title", form.value.title);
  formData.append("content", form.value.content);
  formData.append("refer", form.value.refer);
  formData.append("imageFile", imageFile.value);

  if (form.value.typeID === "new") {
    formData.append("newType", form.value.newType);
  } else {
    formData.append("typeID", form.value.typeID);
  }

  // Pinia Store function action fetch api
  // await apiCreatePostNew(form);

  try {
    const response = await axiosAPI.post("/api/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  if (!response.status === 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log("create post successfully");
  router.push({ name: 'DashboardView' });

  } catch (error) {
    console.error("function on create post error ", error);
  }

};

const btnCancel = () => {
  router.push({ name: "DashboardView" });
};

onMounted(async () => {
  postTypes.value = await apiGetPostTypes();
  console.log("create post get post type ", postTypes.value);
});
</script>

<template>
  <div class="container mt-10 text-md bg-white ronunded shadow">
    <label class="m-auto p-2 text-gray-900 text-3xl" for="Create Post New">
      Form create post
    </label>
    <form class="w-10/12 m-auto p-2 mt-5" @submit.prevent="onCreatePost">
      <div class="mt-2 text-md">
        <label for="Post-Type" class="mt-3 mb-3 text-gray-900 text-2x1">
          Post Type
        </label>
        <select class="form-control" v-model="form.typeID" @change="onSelectType">
          <option v-for="type in postTypes" :key="type.id" :value="type.id">
            {{ type.post_type_name }}
          </option>
          <option value="new">add +</option>
        </select>
      </div>
      <div class="mt-2 text-md" v-if="isNewType">
        <label for="Type-New" class="mt-3 mb-3 text-gray-900 text-2x1">
          Type new
        </label>
        <input type="text" class="form-control" v-model="form.newType">
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
</template>
