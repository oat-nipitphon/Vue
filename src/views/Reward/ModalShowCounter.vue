<script setup>
import { ref } from 'vue'
import axiosAPI from '@/services/axiosAPI'
import { storeToRefs } from 'pinia'
import { useRewardCartStore } from '@/stores/reward.cart'
const rewardCartStore = useRewardCartStore()
const { counterItems, cartItemCounters, totalPoint } = storeToRefs(rewardCartStore)
const itemsCardReset = () => {
  rewardCartStore.resetCart()
}
const props = defineProps({
  counterItems: Object,
  userID: Number,
})

const form = ref({
  userID: props.userID,
  totalPoint: totalPoint,
  counterItems: counterItems,
})

const onSave = async () => {
  const formData = new FormData()
  formData.append('userID', form.userID)
  formData.append('totalPoint', form.totalPoint)
  formData.append('counterItems', JSON.stringify(form.counterItems))
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
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

