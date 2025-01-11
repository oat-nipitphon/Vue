<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="onFileChange" />
      <button type="submit">Upload</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router"
import axios from "axios";
import axiosAPI from "@/services/axiosAPI.js"
import { useAuthStore } from "@/stores/auth"

export default {
  setup() {
    // =>1.Start insert file name mysql move file pubilc laravel
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
        const response = await axiosAPI.post("/api/upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        const route = useRoute();
        route.push({ name: 'DashboardView' });
      } catch (error) {
        console.error(error);
      }
    };
    // =>0.End insert file name mysql move file pubilc laravel

    // =>1.Start insert file blob binary mysql file image
    // your file name in the second param should be constructed of the string that you have logged and split earlier.
    // var fileToUpload = new File([Blob], "some_file_name.jpg", {
    //   type: "image/jpg", // this should be from your string split of the filename to check the file upload type.
    //   lastModified: new Date(),
    // });
    // form.append("image", fileToUpload);
    // **
    // ** (  function async api fetch or axios ) **
    // **
    // =>0.End insert file blob binary mysql file image

    return {
      onFileChange,
      uploadFile,
    };
  },
};
</script>
