<script setup>
import { reactive, ref, onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import { useStoreUserProfile } from '@/stores/user.profile'

const authStore = useAuthStore()
const storeUser = storeToRefs(authStore)
const { apiUploadImageUserProfile } = useStoreUserProfile()

const fileInput = ref(null);
const userPhotoURL = ref(null);

const formData = reactive({
  user_id: storeUser.id,
  filePhoto: null,
});

const handleFileChange = (event) => {
  const file = event.target.files[0];

  formData.filePhoto = event.target.files[0];
  console.log(formData.filePhoto);
  showInputFileEXP(file);
};

const showInputFileEXP = (file) => {
  // Check status file show exp input
  if (file && file.type.startsWith("image/")) {
    userPhotoURL.value = URL.createObjectURL(file);
    console.log("Preview URL:", userPhotoURL.value);
  } else {
    event.target.value = ""; // Reset file input
    console.log("Please select a valid image file.");
  }
  return file;
};

const openFileInput = () => {
  fileInput.value.click();
};

onMounted(async () => {
  await authStore.apiAuthStore();
});
</script>
<template>
  <div class="w-full">
    <form @submit.prevent="uploadUserPhoto(`upload_image_profil`,formData)">
      <div class="mt-10 flex justify-center">
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
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Upload image profile
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="flex justify-center">
                    <img
                      :src="
                        userPhotoURL ||
                        'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
                      "
                      alt="Image Preview"
                      style="width: 250px; height: auto"
                    />
                  </div>
                  <div class="mt-10">
                    <input
                      ref="fileInput"
                      type="file"
                      @change="handleFileChange"
                      accept="image/*"
                      hidden
                    />
                    <button
                      type="button"
                      class="btn btn-sm btn-primary"
                      @click="openFileInput"
                    >
                      Choose File
                    </button>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                    Upload
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
