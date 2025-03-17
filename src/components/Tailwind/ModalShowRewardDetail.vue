<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { ref, onMounted, watch } from 'vue'
import { useRewardStore } from '@/stores/reward'

const { getShowReward } = useRewardStore()

const props = defineProps({
  statusShow: Boolean, // แก้จาก String เป็น Boolean
  rewardID: Number,
})

const open = ref(false) // กำหนดค่าเริ่มต้นให้ open
const rewards = ref([])

// ตรวจจับการเปลี่ยนแปลงของ statusShow เพื่อเปิด modal
watch(() => props.statusShow, (newVal) => {
  open.value = newVal
})

onMounted(async () => {
  if (props.rewardID) {
    rewards.value = await getShowReward(props.rewardID)
    console.log("reward modal show", rewards.value)
  }
})
</script>

<template>
  <div class="m-auto">
    <button class="btn btn-sm btn-outline-primary" @click="open = props.statusShow">
      Show
    </button>
    <TransitionRoot as="template" :show="open">
      <Dialog class="fixed inset-0 z-10 flex items-start justify-center mt-20" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel class="modalShowReward rounded-lg shadow-xl p-6">
            <div class="flex items-center">
              <div class="flex size-15 shrink-0 items-center justify-center rounded-full bg-red-100">
                <ExclamationTriangleIcon class="size-6 text-red-600" aria-hidden="true" />
              </div>
              <div class="ml-4" v-if="rewards.length">
                <DialogTitle as="h3" class="text-lg font-semibold text-gray-900">
                  Reward ID: {{ rewards[0].id }}
                </DialogTitle>

                <div class="flex justify-center items-center" v-if="rewards[0].rewardImage">
                  <img v-for="image in rewards[0].rewardImage" :key="image.id" :src="image.image_data"
                    class="size-12 m-auto p-2" alt="">
                </div>
              </div>
            </div>

            <div class="mt-4 flex justify-end space-x-3">
              <button class="btn btn-md btn-secondary" @click="open = false">
                Close
              </button>
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.modalShowReward {
  background-color: antiquewhite;
  width: 50%;
  height: auto;
}
</style>
