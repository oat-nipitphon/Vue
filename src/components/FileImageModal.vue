<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-sm btn-outline-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      upload images
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <form @submit.prevent="uploadFile">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Upload image profile
              </h5>
              <button
                type="button"
                class="btn-sm btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cencel
              </button>
            </div>

            <div class="modal-body">
              <div class="w-full flex justtify-center mt-5">
                <input type="file" @change="onFileChange" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-sm btn-primary" type="button">
                Upload
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
.btn-upload-image-user-profile {
  width: 30px;
  height: 15px;
  margin: 2px;
}
</style>
<script>
import axiosAPI from "@/services/axiosAPI.js";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
export default {
  setup() {
    const file = ref(null);
    const authStore = useAuthStore();
    const onFileChange = (e) => {
      file.value = e.target.files[0];
      console.log("file change", file.value);
      console.log("storeUser", authStore.storeUser.user_login.id);
    };

    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("userID", authStore.storeUser.user_login.id);
      
      if(file.value) {
        formData.append("imageFile", file.value);
      }
      
      try {
        const response = await axiosAPI.post("/api/user_profile/upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });

   

        if (response.error) {
          console.log("response false");
        }

        Swal.fire({
          title: "Upload Image.",
          content: "upload image profile success.",
          icon: "success",
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
