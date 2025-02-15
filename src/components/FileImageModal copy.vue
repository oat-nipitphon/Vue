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
                class="btn-sm btn-close text-gray-900"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Cencel
              </button>
            </div>

            <div class="modal-body">
              <div class="w-full flex justtify-center mt-5">
                <div class="row">
                  <img
                    class="w-auto object-cover"
                    v-show="imageUrl" 
                    :src="imageUrl || imageFileBasic" 
                    alt="ShowInputFileImage"
                  />
                </div>
                <div class="row">
                  <input
                    if="fileImage"
                    accept="image/*" 
                    type="file" 
                    class="form-control"
                    @change="onFileChange" 
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-sm btn-primary" type="submit">
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
    // const imageFileBasic = "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=pQ4M4LiSPCcQ7kNvgG9_eZm&_nc_oc=AdhODB76hbqSN1gojgQ0Qq6D7lQv-Vn-JZhJdzoX-r6dgACwHNvmdNDKiqapObYu7JNiSz3NNQKlb359fz2DNJs3&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AOUeEXHhWhEXESqz8T9UQbq&oh=00_AYCjcN5cI21D3BpxKTLg5zdiLZhSzRrjFbqI0EWHQOE-zA&oe=67AC3071";
    const imageFile = ref(null);
    const imageUrl = ref(null);
    const authStore = useAuthStore();

    const onFileChange = (e) => {
      imageFile.value = e.target.files[0];
      imageUrl.value = URL.createObjectURL(e.target.files[0]);
      console.log("image url ", imageUrl.value);
    };

    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("userID", authStore.storeUser.user_login.id);

      if (imageFile.value) {
        formData.append("imageFile", imageFile.value);
      }

      try {
        const response = await axiosAPI.post(
          "/api/user_profile/upload_image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        Swal.fire({
          title: "Upload Image!",
          text: "Your confirm upload image profile?",
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
              text: "Upload image profile successfullry.",
              icon: "success",
              timer: 1500,
            }).then(() => {
              Swal.close();
              window.location.reload();
            });
          }
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
