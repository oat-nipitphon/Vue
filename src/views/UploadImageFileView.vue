<template>
  <div style="width: 100%" class="bg-white ronunded shadow">
    <form class="p-8 m-auto w-full" @submit.prevent="headleSubmit">
      <div class="flex justify-center m-5">
        <img
          v-show="imageUrl"
          :src="imageUrl"
          class="w-48 h-48 object-cover"
          alt="ShowImageUrl"
        />
      </div>
      <div>
        <input
          id="fileImage"
          accept="image/*"
          type="file"
          class="form-control"
          @change="handleImageSelected"
        />
      </div>
      <div class="flex justify-end mt-5 text-sm">
        <button type="submit" class="btn btn-sm btn-outline-primary mr-2">
          Upload
        </button>
      </div>
    </form>
    <div class="flex justify-end text-md p-2">
      <button
        @click="onReset"
        type="submit"
        class="btn btn-sm btn-outline-dargen"
      >
        Reset
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosAPI from "@/services/axiosAPI";
import { ref, watch } from "vue";
export default {
  setup() {
    let imageFile = ref("");
    let imageUrl = ref("");

    function handleImageSelected(event) {
      console.log(event);

      if (event.target.files.length === 0) {
        imageFile.value = "";
        imageUrl.value = "";
        return;
      }

      imageFile.value = event.target.files[0];
    }

    watch(imageFile, (imageFile) => {
      if (!(imageFile instanceof File)) {
        imageFile.value = "";
        imageUrl.value = "";
        return;
      }

      let fileReader = new FileReader();

      fileReader.readAsDataURL(imageFile);

      fileReader.addEventListener("load", () => {
        imageUrl.value = fileReader.result;
        console.log("setup -> imageUrl.value ", imageUrl.value);
      });
    });

    const headleSubmit = async () => {
      let profileID = 1;
      console.log("profile id :: ", profileID);
      const formData = new FormData();
      formData.append("profileID", profileID);
      formData.append("imageFile", imageFile.value);

      try {
        const response = await axiosAPI.post(`/api/imageFileUploads`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.ok) {
          console.log("upload file image success.");
        } else {
          console.log("upload file image not success.", response.data.error);
        }
      } catch (error) {
        console.error("upload file image function error ", error);
      }
    };

    function onReset() {
      const input = document.getElementById("fileImage");
      if (input) input.value = null; // Clear file input
      imageFile.value = "";
      imageUrl.value = "";
    }

    return {
      handleImageSelected,
      imageUrl,
      headleSubmit,
    };
  },
};
</script>
