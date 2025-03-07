<script setup>
import { reactive, defineProps, watch } from 'vue'
import { useStoreUserProfile } from '@/stores/user.profile'
const { apiUpdateProfile } = useStoreUserProfile()

const props = defineProps({
  profile: Object,
})

const form = reactive({
  profileID: '',
  fullName: '',
  nickName: '',
  telPhone: '',
  birthDay: '',
})

watch(
  () => props.profile,
  row => {
    if (row) {
      form.profileID = row.id || ''
      form.fullName = row.fullName || ''
      form.nickName = row.nickName || ''
      form.telPhone = row.telPhone || ''
      form.birthDay = row.birthDay || ''
    }
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-sm btn-outline-primary"
      data-bs-toggle="modal"
      data-bs-target="#modalEditProfile"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-gear"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"
        />
        <path
          d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"
        /></svg
      >edit
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalEditProfile"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Update Profile ID : {{ profile.id }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="apiUpdateProfile(form)">
            <div class="modal-body">
              <input type="hidden" v-model="profile.id" class="form-control" />
              <div>
                <label class="font-bold mb-2">full name</label>
                <input
                  v-model="form.fullName"
                  type="text"
                  class="form-control"
                />
              </div>
              <div>
                <label class="font-bold mb-2">nick name</label>
                <input
                  v-model="form.nickName"
                  type="text"
                  class="form-control"
                />
              </div>
              <div>
                <label class="font-bold mb-2">tel phone</label>
                <input
                  v-model="form.telPhone"
                  type="text"
                  class="form-control"
                />
              </div>
              <div>
                <label class="font-bold mb-2">birth day</label>
                <input
                  v-model="form.birthDay"
                  type="date"
                  class="form-control"
                />
              </div>
            </div>
            <div class="modal-footer">
              <!-- <button type="submit" class="btn btn-sm btn-primary" @click="onUpdate">update</button> -->
              <button
                type="submit"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
