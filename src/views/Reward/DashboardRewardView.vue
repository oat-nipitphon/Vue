<script setup>
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'

import axiosAPI from '@/services/axiosAPI'
import { useAuthStore } from '@/stores/auth'
import { useRewardStore } from '@/stores/reward'
import { useRewardCartStore } from '@/stores/reward.cart'

import CardReward from '@/components/Reward/CardReward.vue'
import ModalShowCounter from '@/views/Reward/ModalShowCounter.vue'

const router = useRouter()
const authStore = useAuthStore()
const rewardStore = useRewardStore()
const rewardCartStore = useRewardCartStore()

const { storeUser } = storeToRefs(authStore)
const { storeRewards } = storeToRefs(rewardStore)
const { counterItems, cartItemCounters, totalPoint } = storeToRefs(rewardCartStore)

const userPoint = ref(storeUser.value?.user_login?.userPoint?.point || 0)

const onUserAmount = computed(() => {
  return userPoint.value - totalPoint.value
})

const form = reactive({
  userID: storeUser.value?.user_login?.id || '',
  userAmount: '',
  counterItems: '',
})


const onSave = async () => {
  const formData = new FormData()
  formData.append('userID', storeUser.value?.user_login?.id)
  formData.append('userAmount', onUserAmount.value)
  formData.append('counterItems', JSON.stringify(counterItems.value))

  try {
    
    const res = await axiosAPI.post(`/api/cartItems/userConfirmSelectReward`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (res.status === 201) {
      window.location.reload()
    } else {
      console.log('confirm selected reward false', res.data);
    }

  } catch (error) {
    console.error('Request failed:', error)
  }
}


const onResetItemsCart = () => {
  rewardCartStore.resetCart()
}

onMounted(async () => {
  await rewardStore.getRewards()
})

</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto mt-10">

    <!-- ข้อมูลแต้ม -->
    <div class="grid gap-6 border-b border-gray-200 pb-6 mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div class="flex justify-between items-center">
          <p>แต้มสมาชิก:</p>
          <p class="font-semibold text-right">
            {{ userPoint.toLocaleString() }} <span class="text-sm font-normal text-gray-500">Point</span>
          </p>
        </div>
        <div class="flex justify-between items-center">
          <p>จำนวนรางวัล:</p>
          <ModalShowCounter :counterItems="counterItems" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="flex justify-between items-center">
          <p>จำนวนแต้ม:</p>
          <p class="text-rose-600 font-bold text-right">
            {{ totalPoint.toLocaleString() }} <span class="text-sm font-normal text-gray-500">Point</span>
          </p>
        </div>
        <div class="flex justify-between items-center">
          <p>แต้มคงเหลือ:</p>
          <p class="text-green-600 font-bold text-right">
            {{ onUserAmount.toLocaleString() }} <span class="text-sm font-normal text-gray-500">Point</span>
          </p>
        </div>
      </div>
    </div>

    <!-- ปุ่มลิงก์และการดำเนินการ -->
    <div class="grid grid-cols-3 items-center gap-4 border-b border-gray-200 pb-6 mb-6">
      <div>
        <RouterLink
          :to="{ name: 'ReportReward', params: { userID: form.userID } }"
          class="text-blue-600 hover:underline font-medium"
        >
          ของรางวัลของฉัน
        </RouterLink>
      </div>

      <div class="col-span-2 flex justify-end gap-4">
        <button
          type="button"
          :disabled="onUserAmount < 0 || cartItemCounters === 0"
          @click="onSave"
          class="px-6 py-2 rounded-xl shadow transition text-white"
          :class="{
            'bg-gray-400 cursor-not-allowed': onUserAmount < 0 || cartItemCounters === 0,
            'bg-blue-500 hover:bg-blue-700': onUserAmount >= 0 && cartItemCounters > 0
          }"
        >
          แลกของรางวัล
        </button>

        <button
          type="button"
          :disabled="cartItemCounters === 0"
          @click="onResetItemsCart"
          class="px-6 py-2 rounded-xl shadow transition text-white"
          :class="{
            'bg-gray-400 cursor-not-allowed': cartItemCounters === 0,
            'bg-red-600 hover:bg-red-700': cartItemCounters > 0
          }"
        >
          รีเซ็ตแลกของรางวัล
        </button>
      </div>
    </div>
  </div>

  <!-- รายการรางวัล -->
  <div class="mt-10">
    <CardReward :rewards="storeRewards" />
  </div>
</template>