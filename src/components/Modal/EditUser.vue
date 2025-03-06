<script setup>
import { defineProps, reactive, watch} from 'vue'
import { useStoreUserProfile } from '@/stores/user.profile';
const { apiUpdateUser } = useStoreUserProfile()
const props = defineProps({
    user: Object,
    userStatus: Object,
})

const form = reactive({
    userID: "",
    email: "",
    username: "",
    statusID: "",
    statusName: "",
});

watch(() => props.user, (row) => {
    if (row) {
        form.userID = row.id || "";
        form.email = row.email || "";
        form.username = row.username || "";
        form.statusID = row.statusID || "";
    }
}, { immediate: true })

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
      edit
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="modalEditUser"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Update User ID {{ user.id }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="apiUpdateUser(form)">
                <input type="hidden" v-model="form.userID">
            <div>
                <label class="mb-1 font-bold">status</label>
                <select v-model="form.statusID" class="form-control">
                    <option v-for="row in userStatus" :key="row.id" :value="row.id">{{ row.status_name_th }}</option>
                </select>
            </div>
            <div>
                <label class="mb-1 font-bold">email</label>
                <input type="text" class="form-control" v-model="form.email">
            </div>
            <div>
                <label class="mb-1 font-bold">username</label>
                <input type="text" class="form-control" v-model="form.username">
            </div>
            <div class="flex justify-end mt-2">
                <button type="submit" class="btn btn-sm btn-primary" data-bs-dismiss="modal">update</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

