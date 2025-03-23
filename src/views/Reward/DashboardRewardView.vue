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
        console.log('res data false',res );
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
  <div class="bg-white container rounded-lg shadow-lg p-5">
    <!-- Navbar -->
    <div class="grid grid-cols-2 mt-5">
      <div class="flex justify-center">
        <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
          <MagnifyingGlassIcon class="size-7" aria-hidden="true" />
        </a>
      </div>
      <div class="flex justify-end items-center">
        <ShoppingBagIcon
          class="size-8 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span class="ml-3 text-2xl text-gray-900">{{ cartItemCounters }}</span>
        <span class="ml-3 text-2xl text-gray-900">{{ totalPoint }}</span>
      </div>
    </div>

    <!-- รายละเอียดแต้มและรางวัล -->
    <div class="grid grid-cols-2 gap-5 mt-5 text-2xl text-gray-900">
      <div class="grid grid-cols-3">
        <p class="m-auto">แต้มสมาชิก</p>
        <p class="m-auto">{{ userPoint }}</p>
        <p class="m-auto">Point</p>
      </div>
      <div class="grid grid-cols-3">
        <p class="m-auto">จำนวนรางวัล</p>
        <p class="m-auto"><ModalShowCounter :counterItems="counterItems" /></p>
        <p class="m-auto">รายการ</p>
      </div>
      <div class="grid grid-cols-3">
        <p class="m-auto">จำนวนแต้ม</p>
        <p class="m-auto">{{ totalPoint }}</p>
        <p class="m-auto">Point</p>
      </div>
      <div class="grid grid-cols-3">
        <p class="m-auto">จำนวนคงเหลือ</p>
        <p class="m-auto">{{ onUserAmount }}</p>
        <p class="m-auto">Point</p>
      </div>
    </div>

    <div class="flex justify-end">
      <div class="w-50 mr-5">
        <button
          type="button"
          @click="submitReward"
          class="btn btn-md btn-outline-primary"
        >
          Confirm
        </button>
      </div>
    </div>

    <!-- รายการรางวัล -->
    <div class="w-full mt-5">
      <CardReward :rewards="storeRewards" />
    </div>
  </div>
</template>
