<script setup>
import { reactive, defineProps, watch } from 'vue'
import { useStoreUserProfile } from '@/stores/user.profile'
const { apiUpdateProfile } = useStoreUserProfile()

const props = defineProps({
  profile: Object,
})

const form = reactive({
  profileID: "",
  fullName: "",
  nickName: "",
  telPhone: "",
  birthDay: "",
})

watch(() => props.profile, (row) => {
  if (row) {
    Object.assign(form, {
      profileID: row?.id || "",
      fullName: row?.fullName || "",
      nickName: row?.nickName || "",
      telPhone: row?.telPhone || "",
      birthDay: row?.birthDay || ""
    })
  }
}, { immediate: true });

const onUpdate = async () => {
  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await apiUpdateProfile(formData);
    
    alert("อัปเดตข้อมูลสำเร็จ! ✅"); // แจ้งเตือนเมื่ออัปเดตสำเร็จ
    console.log(response);
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("เกิดข้อผิดพลาดในการอัปเดต ❌");
  }
}

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
      edit
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
            <h1 class="modal-title fs-5" id="exampleModalLabel">Update Profile Name {{ profile.nickName }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <!-- <form @submit.prevent="apiUpdateProfile(form)"> -->
            <div class="modal-body">
              <input type="text" v-model="profile.id" class="form-control">
            <div>
              <label class="font-bold mb-2">full name</label>
              <input v-model="form.fullName" type="text" class="form-control">
            </div>
            <div>
              <label class="font-bold mb-2">nick name</label>
              <input v-model="form.nickName" type="text" class="form-control">
            </div>
            <div>
              <label class="font-bold mb-2">tel phone</label>
              <input v-model="form.telPhone" type="text" class="form-control">
            </div>
            <div>
              <label class="font-bold mb-2">birth day</label>
              <input v-model="form.birthDay" type="date" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-sm btn-primary" @click="onUpdate">update</button>
            <!-- <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button> -->
          </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>