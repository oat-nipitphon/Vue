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

const mainForm = reactive({
  userID: storeUser.value?.user_login?.id || '',
  userAmount: '',
  counterItems: '',
})


const onSave = async () => {
  if (cartItemCounters.value === 0) {
    alert('กรุณาเลือกรางวัลก่อนแลก')
    return
  }

  const formData = new FormData()
  formData.append('userID', mainForm.userID)
  formData.append('userAmount', onUserAmount.value)
  formData.append('counterItems', JSON.stringify(counterItems.value))

  try {
    const res = await axiosAPI.post(`/api/cartItems/userConfirmSelectReward`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const data = res.data

    if (data.ok) {
      console.log('✅ แลกของรางวัลสำเร็จ:', data)
      rewardCartStore.resetCart()
      alert('แลกของรางวัลสำเร็จ!')
    } else {
      console.error('❌ แลกของรางวัลล้มเหลว:', data.error)
    }
  } catch (error) {
    console.error('❌ มีข้อผิดพลาดในการส่งคำขอ:', error)
  }
}

const itemsCardReset = () => {
  rewardCartStore.resetCart()
}

onMounted(async () => {
  await rewardStore.getRewards()
})

</script>

<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto mt-10">

    <!-- Navbar -->
    <div class="flex justify-between items-center border-b pb-4 mb-6">
      <div class="flex items-center space-x-4">
        <a href="#" class="text-gray-400 hover:text-gray-600 transition">
          <MagnifyingGlassIcon class="w-6 h-6" />
        </a>
        <div class="flex items-center space-x-4">
          <RouterLink
            :to="{
              name: 'ReportReward',
              params: {
                userID: mainForm.userID
              }
            }"
          >
            ของรางวัลของฉัน
          </RouterLink>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <ShoppingBagIcon class="w-7 h-7 text-gray-500" />
        <span class="text-xl font-semibold text-gray-800">{{ cartItemCounters }}</span>
        <span class="text-xl font-semibold text-indigo-600">{{ totalPoint }}</span>
      </div>
    </div>

    <!-- แต้มสมาชิก และรายการรางวัล -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-lg text-gray-800">
      <div class="flex justify-between items-center">
        <p>แต้มสมาชิก:</p>
        <p class="font-semibold">
          {{ userPoint }} <span class="text-sm font-normal text-gray-500">Point</span>
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p>จำนวนรางวัล:</p>
        <p>
          <ModalShowCounter :counterItems="counterItems" />
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p>จำนวนแต้ม:</p>
        <p class="text-rose-600 font-bold">
          {{ totalPoint }} <span class="text-sm font-normal text-gray-500">Point</span>
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p>แต้มคงเหลือ:</p>
        <p class="text-green-600 font-bold">
          {{ onUserAmount }} <span class="text-sm font-normal text-gray-500">Point</span>
        </p>
      </div>
    </div>

    <!-- ตะกร้ารางวัล
    <div class="w-full bg-red-300 font-bold p-4 mt-8 rounded-lg">
      <div class="grid grid-cols-2 mb-4">
        <div>
          <button type="button" class="btn btn-sm btn-danger" @click="itemsCardReset">รีเซ็ต</button>
        </div>
      </div>

      <div class="flex justify-end">
        <p class="m-2">จำนวนรางวัลทั้งหมด: {{ cartItemCounters }}</p>
        <p class="m-2">จำนวนแต้มทั้งหมด: {{ totalPoint }}</p>
      </div>

      <div v-for="item in counterItems" :key="item.rewardID" class="mb-2">
        <p>ID: {{ item.rewardID }}</p>
        <p>Name: {{ item.rewardName }}</p>
        <p>Amount: {{ item.rewardAmount }}</p>
        <p>Total Point: {{ item.rewardAmount * item.rewardPoint }}</p>
        <hr class="my-2 border-white" />
      </div>
    </div> -->

    <!-- Confirm Button -->
    <div class="flex justify-end mt-8">
      <button type="button" @click="onSave"
        class="bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 text-white px-6 py-2 rounded-xl shadow-lg transition">
        🎁 แลกของรางวัล
      </button>

      <button type="button" :disabled="onUserAmount < 0 || cartItemCounters === 0" @click="onSave"
        class="px-6 py-2 rounded-xl shadow transition text-white" :class="{
          'bg-gray-400 cursor-not-allowed': onUserAmount < 0 || cartItemCounters === 0,
          'bg-indigo-600 hover:bg-indigo-700': onUserAmount >= 0 && cartItemCounters > 0
        }">
        🎁 แลกของรางวัล
      </button>
    </div>

    <!-- รายการรางวัล -->
    <div class="mt-10">
      <CardReward :rewards="storeRewards" />
    </div>
  </div>
</template>
