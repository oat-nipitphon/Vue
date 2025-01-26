<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="onFileChange" />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import axiosAPI from "@/services/axiosAPI.js"
import Swal from "sweetalert2";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth"

export default {
  setup() {
    
    const file = ref(null);

    const authStore = useAuthStore();

    console.log(authStore.storeUser.user_login.user_profile.id);

    const onFileChange = (e) => {
      file.value = e.target.files[0];
      console.log("file change", file.value);
    };

    const uploadFile = async () => {

      const formData = new FormData();
      formData.append("profileID", authStore.storeUser.user_login.user_profile.id);
      formData.append("file", file.value);

      try {
        const response = await axiosAPI.post("/api/imageFileUploads", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.ok) {
          console.log("response false", response.data);
        }

        console.log(response.data);
        Swal.fire({
          title: "Upload Image.",
          content: "upload image profile success.",
          icon: "success"
        }).then(() => {
          window.location.reload();
        });

      } catch (error) {
        console.error(error);
      }

    };

    return {
      onFileChange,
      uploadFile,
    };
  },
};
</script>
