<script setup>
import axios from "axios";
import axiosAPI from "@/services/axiosAPI";
import { ref, onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useTestCode } from "@/stores/test.code";

const { uploadImageStore } = useTestCode();
const profileImage = ref(null);
const formData = ref({
  username: "developer",
  profileID: 1,
});

const selectFile = (e) => {
  profileImage.value = e.target.files[0];

};

const uploadImage = async () => {

  const payload = new FormData();
  payload.append("username", formData.value.username);
  payload.append("profileID", formData.value.profileID);
  payload.append("profileImage", profileImage.value);

  try {
    // await uploadImageStore(data);
    const response = await axiosAPI.post("/api/uploadImage", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.ok) {
      console.log("response success :: ", response.data);
    } else {
      console.log("response false :: ", response.data);
    }

    
  } catch (error) {
    console.error("function upload image error :: ", error);
  }
};
</script>
<template>
  <div class="container w-full bg-white mt-10 flex justify-center">
    <div class="w-full">
      <input type="file" @change="selectFile" />
      <button class="btn btn-sm btn-primary" type="submit" @click="uploadImage">
        upload
      </button>
    </div>
  </div>
</template>
