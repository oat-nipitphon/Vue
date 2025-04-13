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
      class="btn btn-outline-primary btn-sm"
      data-bs-toggle="modal"
      data-bs-target="#modalEditUser"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-gear-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"
        />
      </svg>
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
