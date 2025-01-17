<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      upload images.
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
              <button class="btn btn-md btn-primary" type="submit">
                Upload
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import axiosAPI from "@/services/axiosAPI.js";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

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
      formData.append("profileID", authStore.storeUser.user_login.user_profile.id );
      formData.append("file", file.value);

      try {
        const response = await axiosAPI.post("/api/user_profile/upload_image", formData, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (!response.ok) {
          console.log("response false", response.data);
        }
   
        Swal.fire({
          title: "Upload Image.",
          content: "upload image profile success.",
          icon: "success",
        }).then(() => {
          console.log(response.data);
          Swal.close();
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
