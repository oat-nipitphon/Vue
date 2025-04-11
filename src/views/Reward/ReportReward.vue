<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRewardStore } from '@/stores/reward'

const route = useRoute()
const authStore = useAuthStore()
const { getReportRewards } = useRewardStore()
const rewards = ref([])
const userID = ref(null)
userID.value = authStore.storeUser?.user_login.id
console.log('userID', userID.value)

onMounted(async () => {
    rewards.value = await getReportRewards(route.params.userID)
    console.log('report reward view', rewards.value);
})

</script>
<template>
    <div class="bg-white rounded-full shadow-lg p-5">
        <div v-for="(reward, index) in rewards.user_point_counter" :key="index">
            {{ reward }}
        </div>
    </div>
</template>