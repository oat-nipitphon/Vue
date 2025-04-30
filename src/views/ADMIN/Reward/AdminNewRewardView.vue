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
          router.push({ name: 'DashboardRewardView' })
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

  <div class="w-50 m-auto bg-white mt-10 shadow-lg rounded-sm px-8 pt-6 pb-8 mb-4">

    <div class="grid grid-cols-2">
      <div class="flex p-2">
        <label for="fileImage" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
        <div class="bg-white">
          <input id="fileImage" accept="image/*" type="file"
            class="w-[100%] h-[40px] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            @change="onSelectFileImage" />
          <img :src="imageUrl ||
            'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
            " alt="Image Preview"
            class="m-auto w-[100%] h-[250px] object-cover mt-3 rounded-lg border border-gray-300 dark:border-gray-600" />
        </div>
      </div>
      <div class="flex p-2">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-city">
          Status:
        </label>
        <select v-model="form.status"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-[100%] h-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          id="grid-state">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex p-2">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-city">
          Name:
        </label>
        <input v-model="form.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-[100%] h-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          id="grid-city" type="text" />
      </div>
      <div class="flex p-2">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-city">
          Point:
        </label>
        <input v-model="form.point"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-[100%] h-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          id="grid-city" type="text" />
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex p-2">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-city">
          Amount:
        </label>
        <input v-model="form.amount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-[100%] h-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          id="grid-city" type="text" />
      </div>
      <div class="flex p-2">
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="grid-city">
          Type:
        </label>
        <select v-model="form.type"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-[100%] h-[40px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          id="grid-state">
          <option value="reward">reward</option>
        </select>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div class="flex p-2">
        <button @click="onSave" class="btn btn-sm btn-primary">
          save
        </button>
      </div>
      <div class="flex p-2">
        <button @click="onCancel" class="btn btn-sm btn-dargen">
          cancel
        </button>
      </div>
    </div>

  </div>

</template>
<style>
.ibox-image {
  width: 100%;
  height: 50px;
}
</style>