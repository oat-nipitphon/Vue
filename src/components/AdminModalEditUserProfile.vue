<script setup>
const defaultProfileImage =
  "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=_8IVpzSUJz8Q7kNvgH981ad&_nc_oc=AdjwNRCxXwtMr0TUQFjkBXTSR68KItzLfOXsS06bglRQ93A4l_N8TKdv4UJtxEVVgHa4BQVpEdDKu6htxiHQdrbk&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AhlEAgeCssMinnIwKJwfgMQ&oh=00_AYBEFNyZ8w4XoptZM9dz2smOltNWG3lclgbLROlVgZYUVg&oe=67B024F1";

import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";
const route = useRoute();

const { getDataEditUserProfile } = useAdminUserProfileStore();
const userProfile = ref(null);
const form = reactive({
  userProfileID: "",
  titleName: "",
  fullName: "",
  nickName: "",
  brithDay: "",
  telPhone: "",
});

onMounted(async () => {
//   userProfile.value = await getDataEditUserProfile(route.params.userProfileID);

//   if (userProfile.value) {
//     console.log("show userprofile modal edit", userProfile.value);
//   }
});
</script>
<template>
  <div class="container">
    <div v-if="userProfile">
      <!-- Button trigger modal -->
      <!-- <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#modalEditUserProfile"
      >
        Edit
      </button> -->

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalEditUserProfile"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                UserProfile ID : {{ userProfile.id }}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
                {{ userProfile.fullName }}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
