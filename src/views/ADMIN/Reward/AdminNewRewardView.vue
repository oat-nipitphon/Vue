<script setup>
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRewardStore } from '@/stores/reward'
import axiosAPI from '@/services/axiosAPI'
const router = useRouter()
const { newReward } = useRewardStore()

const form = ref({
  name: '',
  point: '',
  amount: '',
  type: 'reward',
  status: 'true',
})

const imageFile = ref(null)
const imageUrl = ref(null)

const onSelectFileImage = event => {
  imageFile.value = event.target.files[0]
  imageUrl.value = URL.createObjectURL(imageFile.value)
}

const onSave = async () => {
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('point', form.value.point)
  formData.append('amount', form.value.amount)
  formData.append('type', form.value.type)
  formData.append('status', form.value.status)
  if (imageFile.value) {
    formData.append('imageFile', imageFile.value)
  }

  const result = await Swal.fire({
    title: "ยืนยันการบันทึก",
    text: "คุณต้องการเพิ่มรางวัลใหม่นี้ใช่หรือไม่?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "บันทึก",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      const response = await axiosAPI.post(`/api/reward/newRewards`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      if (response.status === 201) {
        Swal.fire({
          title: 'สำเร็จ',
          text: 'เพิ่มรางวัลสำเร็จ',
          icon: 'success',
          timer: 1200
        }).then(() => {
          router.push({ name: 'AdminManagerReward' })
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        text: error.response?.data?.message || 'ไม่สามารถเพิ่มรางวัลได้',
        icon: 'error',
      })
    }
  }
  
}

const onCancel = () => {
  router.push({ name: 'DashboardRewardView' })
}

</script>
<template>

<div class="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img
        class="h-48 w-full object-cover md:h-full md:w-48"
        src="@/assets/icon/keyboard.jpg"
        alt="Modern building architecture"
      />
    </div>
    <div class="p-8">
      <div class="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
      <a href="#" class="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-gray-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
        places to do just that.
      </p>
    </div>
  </div>
</div>

  <div class="w-full max-w-[80%] bg-white m-auto rounded-lg shadow-lg mt-5">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- Image Upload reward -->
      <div class="flex flex-col space-y-4 bg-white shadow-lg p-5 rounded-lg">
        <p class="text-gray-900 text-3xl font-medium">Upload Image</p>
        <img
          :src="imageUrl || 'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'"
          alt="Image Preview" class="w-full h-[250px] object-cover rounded-lg border border-gray-300" />
        <input id="fileImage" type="file" accept="image/*"
          class="mt-5 w-full h-[40px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          @change="onSelectFileImage" />
      </div>

      <!-- Form text input new reward -->
      <div class="flex flex-col space-y-4 p-5">

        <!-- reward name -->
        <div>
          <label class="block mb-2 mt-2 text-1xl font-medium text-gray-900">Name</label>
          <input v-model="form.name" type="text"
            class="w-full h-[40px] p-2.5 rounded-lg border text-sm bg-gray-50 border-gray-300" />
        </div>

        <!-- reward point -->
        <div>
          <label class="block mb-2 mt-2 text-1xl font-medium text-gray-900">Point</label>
          <input v-model="form.point" type="text"
            class="w-full h-[40px] p-2.5 rounded-lg border text-sm bg-gray-50 border-gray-300" />
        </div>

        <!-- reward amount -->
        <div>
          <label class="block mb-2 mt-2 text-1xl font-medium text-gray-900">Amount</label>
          <input v-model="form.amount" type="text"
            class="w-full h-[40px] p-2.5 rounded-lg border text-sm bg-gray-50 border-gray-300" />
        </div>

        <!-- reward type -->
        <div>
          <label class="block mb-2 mt-2 text-1xl font-medium text-gray-900">Type</label>
          <select v-model="form.type"
            class="w-full h-[40px] p-2.5 rounded-lg border text-sm bg-gray-50 border-gray-300">
            <option value="reward">reward</option>
          </select>
        </div>

        <!-- reward status -->
        <div>
          <label class="block mb-2 mt-2 text-1xl font-medium text-gray-900">Status</label>
          <select v-model="form.status"
            class="w-full h-[40px] p-2.5 rounded-lg border text-sm bg-gray-50 border-gray-300">
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <!-- button event -->
        <div class="flex justify-end space-x-4 mt-5">
          <button @click="onSave" class="btn btn-primary">Save</button>
          <button @click="onCancel" class="btn btn-danger">Cancel</button>
        </div>
      </div>

    </div>
  </div>

</template>