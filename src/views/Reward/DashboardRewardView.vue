<script setup>
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'
import axiosAPI from '@/services/axiosAPI'
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRewardStore } from '@/stores/reward'
import { useRewardCartStore } from '@/stores/reward.cart'
import CardReward from '@/components/Reward/CardReward.vue'
import ModalShowCounter from '@/views/Reward/ModalShowCounter.vue'

const router = useRouter()
const authStore = useAuthStore()
const { storeUser } = storeToRefs(authStore)
const rewardStore = useRewardStore()
const { storeRewards } = storeToRefs(rewardStore)
const rewardCartStore = useRewardCartStore()
const { counterItems, cartItemCounters, totalPoint } =
  storeToRefs(rewardCartStore)

// แสดงแต้มสมาชิก
const userPoint = ref(storeUser.value?.user_login?.userPoint?.point || 0)
const userPointCounters = ref(
  storeUser.value?.user_login?.userPointCounters || []
)

// คำนวณจำนวนแต้มคงเหลือ
const onUserAmount = computed(() => {
  return userPoint.value - totalPoint.value
})

// ฟอร์มสำหรับส่งข้อมูลแลกรางวัล
const mainForm = reactive({
  userID: storeUser.value?.user_login?.id,
  totalPoint: totalPoint,
  counterItems: counterItems,
})

const submitReward = async () => {
  try {
    const formData = new FormData()
    formData.append('userID', mainForm.userID)
    formData.append('totalPoint', mainForm.totalPoint)
    formData.append('counterItems', JSON.stringify(mainForm.counterItems))

    // const res = await fetch('/api/cartItems/userConfirmSelectReward', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: formData
    // });

    const res = await axiosAPI.post(
      `/api/cartItems/userConfirmSelectReward`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    const data = await res.json();

    if (!res.ok) {
      console.log('res data false', res);
    }

    console.log('res data true', data);

  } catch (error) {
    console.error('Error inserting reward:', error)
    // alert('Insert failed!')
  }
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
        <p class="font-semibold">{{ userPoint }} <span class="text-sm font-normal text-gray-500">Point</span></p>
      </div>
      <div class="flex justify-between items-center">
        <p>จำนวนรางวัล:</p>
        <p>
          <ModalShowCounter :counterItems="counterItems" />
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p>จำนวนแต้ม:</p>
        <p class="text-rose-600 font-bold">{{ totalPoint }} <span class="text-sm font-normal text-gray-500">Point</span>
        </p>
      </div>
      <div class="flex justify-between items-center">
        <p>แต้มคงเหลือ:</p>
        <p class="text-green-600 font-bold">{{ onUserAmount }} <span
            class="text-sm font-normal text-gray-500">Point</span></p>
      </div>
    </div>

    <!-- ปุ่ม Confirm -->
    <div class="flex justify-end mt-8">
      <button type="button" @click="submitReward"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition">
        แลกของรางวัล
      </button>
    </div>

    <!-- รายการรางวัล -->
    <div class="mt-10">
      <CardReward :rewards="storeRewards" />
    </div>
  </div>
</template>
