<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import axiosAPI from '@/services/axiosAPI'
import { useAuthStore } from '@/stores/auth'
import { useRewardCartStore } from '@/stores/reward.cart'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  counterItems: Object,
  userID: Number,
})

const authStore = useAuthStore()
const { storeUser } = storeToRefs(authStore)
const userPoint = ref(storeUser.value?.user_login?.userPoint?.point || 0)

const rewardCartStore = useRewardCartStore()
const { counterItems, cartItemCounters, totalPoint } = storeToRefs(rewardCartStore)
const itemsCardReset = () => {
  rewardCartStore.resetCart()
}

const form = ref({
  userID: props.userID,
  userAmount: '',
  counterItems: counterItems,
})


const onUserAmount = computed(() => {
  return userPoint.value - totalPoint.value
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

</script>
<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <ShoppingBagIcon class="w-7 h-7 text-gray-500" />
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ของรางวัลที่คุณเลือก</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="props.counterItems">
            <!-- ตะกร้ารางวัล -->
            <div class="w-max-full">
              <div v-for="item in props.counterItems" :key="item.rewardID" class="mb-2">
                <p>ID: {{ item.rewardID }}</p>
                <p>Name: {{ item.rewardName }}</p>
                <p>Amount: {{ item.rewardAmount }}</p>
                <p>Total Point: {{ item.rewardAmount * item.rewardPoint }}</p>
                <hr class="my-2 border-white" />
              </div>
            </div>
          </div>
          <div class="modal-footer text-center">
              <div class="grid grid-cols-3">
                <div class="m-auto p-3">จำนวนรางวัล: {{ cartItemCounters }}</div>
                <div class="m-auto p-3">จำนวนแต้ม: {{ totalPoint }}</div>
                <div class="m-auto p-3">แต้มคงเหลือ: {{ onUserAmount }}</div>
              </div>
            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="onSave">Save changes</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

