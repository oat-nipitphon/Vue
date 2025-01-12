<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import { useAuthStore } from "@/stores/auth";
import FileImageUpload from "./FileImageUpload.vue";
import { useStoreUserProfile } from '@/stores/user.profile'

const { apiUploadImageUserProfile } = useStoreUserProfile()

const authStore = useAuthStore()
const profileID = ref(null)
const fileImageProfile = ref(null)

const onFileImageChange = (e) => {
    fileImageProfile.value = e.target.files[0];
    profileID.value = authStore.storeUser.user_login.id;
    console.log("on file image change");
}

const uploadImageProfile = async () => {
    console.log("file image profile", fileImageProfile.value);
    console.log("profile id", profileID.value);

    const formData = new FormData();
    formData.append('profileID', profileID.value);
    formData.append('file', fileImageProfile.value);

    await apiUploadImageUserProfile(formData);

}

</script>
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
              <FileImageUpload />
            </div>
            <div class="w-full flex justify-center mt-5">
                <input type="file"
                    @change="onFileImageChange"

                />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="submit"
              class="btn btn-md btn-primary"
              @click="uploadImageProfile"
            >
              Upload File
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
