<script setup>
import ModalReportPointCounter from '@/components/UserPoint/ModalReportPointCounter.vue'
const props = defineProps({
    profile: Object,
})

console.log('card user point', props)
</script>
<template>
  <div class="bg-red-100">
      <div class="grid grid-cols-2">
        <div>Point</div>
        <div>
            <ModalReportPointCounter v-if="props.profile?.userPoint" :userPoint="props.profile.userPoint" />
        </div>
      </div>
      <div class="grid grid-cols-2">
        <div class="text-lg font-bold">Total</div>
        <div v-if="props.profile.userPoint">{{ props.profile.userPoint.point }}</div>
      </div>
  </div>
</template>
