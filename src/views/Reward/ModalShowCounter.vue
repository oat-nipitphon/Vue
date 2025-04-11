<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import axiosAPI from '@/services/axiosAPI'
import { useAuthStore } from '@/stores/auth'
import { useRewardCartStore } from '@/stores/reward.cart'

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
  formData.append('userID', form.userID)
  formData.append('userAmount', onUserAmount)
  formData.append('counterItems', JSON.stringify(form.counterItems))

  const res = await axiosAPI.post(`/api/cartItems/userConfirmSelectReward`, formData, {
    authorization: `Bearer ${localStorage.getItem('token')}`
  });

  const data = await res.json()

  if (data.ok) {
    console.log('confirm selecter reward success.', data)
  } else {
    console.log('error confirm selecter reward not success !!', data.error)
  }

}

</script>
<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Show Counter Items
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="props.counterItems">
            <!-- ตะกร้ารางวัล -->
            <div class="w-full bg-red-300 font-bold p-4 mt-8 rounded-lg">
              <div class="grid grid-cols-2 mb-4">
                <div>
                  <button type="button" class="btn btn-sm btn-danger" @click="itemsCardReset">รีเซ็ต</button>
                </div>
              </div>

              <div class="flex justify-end">
                <p class="m-2">จำนวนรางวัลทั้งหมด: {{ cartItemCounters }}</p>
                <p class="m-2">จำนวนแต้มทั้งหมด: {{ totalPoint }}</p>
                <p class="m-2">จำนวนแต้มคงเหลือ: {{ onUserAmount }}</p>
              </div>

              <div v-for="item in props.counterItems" :key="item.rewardID" class="mb-2">
                <p>ID: {{ item.rewardID }}</p>
                <p>Name: {{ item.rewardName }}</p>
                <p>Amount: {{ item.rewardAmount }}</p>
                <p>Total Point: {{ item.rewardAmount * item.rewardPoint }}</p>
                <hr class="my-2 border-white" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="onSave">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

