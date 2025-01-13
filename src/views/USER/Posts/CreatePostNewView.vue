<script setup>
import { ref, onMounted, reactive } from "vue";
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from "@/stores/post";
const authAuth = useAuthStore();
const postTypes = ref(null);
const { apiGetPostTypes, apiCreatePostNew } = usePostStore();
const authUserID = ref(null);
console.log("user id ",  authAuth.storeUser.user_login.id);
const formData = reactive({
  userID: authAuth.storeUser.user_login.id,
  title: "",
  content: "",
  refer: "",
  type: ""
});

const btnCreatePostNew = async () => {
  await apiCreatePostNew(formData)
}


onMounted(async () => {
  try {
    postTypes.value = await apiGetPostTypes();
    console.log("Post types:", postTypes.value);
  } catch (error) {
    console.error("Error fetching post types:", error);
  }
});
</script>

<template>
  <div class="container">
    <div class="mt-10 text-md">
      <label for="Create Post New"> Create Post New. </label>
      <div class="mt-2 text-md">
        <label for="Post-Type"> Post Type </label>
        <select class="form-control"
          v-model="formData.type"
        >
          <option v-for="type in postTypes" :key="type.id" :value="type.id">
            {{ type.post_type_name }}
          </option>
        </select>
      </div>
      <div class="mt-2 text-sm">
        <label for="Post-Title"> Title </label>
        <input 
          v-model="formData.title"
        type="text" class="form-control" />
      </div>
      <div class="mt-2 text-md">
        <label for="Post-Content"> Content </label>
        <textarea v-model="formData.content" class="form-control" rows="5" cols="10"></textarea>
      </div>
      <div class="mt-2 text-md">
        <label for="Post-Refer">
          Refer
        </label>
        <input v-model="formData.refer" type="text" class="form-control" />
      </div>
      <div class="mt-2 flex justify-end">
        <button @click="btnCreatePostNew" type="submit" class="btn btn-sm btn-primary m-2">New Post</button>
        <button type="submit" class="btn btn-sm btn-outline-danger m-2">Cancel</button>
      </div>
    </div>
  </div>
</template>
