<script setup>
import { ref } from "vue";
const userDetail = ref([]);
const onModalUserUpdate = async (userLogin) => {
  userDetail.value = userLogin;
  console.log("user modal", userDetail.value);
};
</script>
<template>
  <div class="container">
    <!-- Button trigger modal -->
    <button
      @click="onModalUserUpdate(storeUser.user_login)"
      type="button"
      class="btn btn-sm block px-4 py-2 text-sm text-gray-700"
      data-bs-toggle="modal"
      data-bs-target="#modalUserUpdate"
    >
      Setting
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalUserUpdate"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Setting user ID: {{ userDetail.id }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            {{ userDetail.email }}
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
