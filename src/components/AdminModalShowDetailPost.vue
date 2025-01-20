<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAdminPostStore } from "@/stores/admin.posts";
const { adminAPIGETpostDetail } = useAdminPostStore();
const route = useRoute();
</script>
<template>
  <div class="container">
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModalDetailPost"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
                Detail Post ::
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">...</div>
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
