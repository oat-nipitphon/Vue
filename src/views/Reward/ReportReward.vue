<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRewardStore } from '@/stores/reward'

const route = useRoute()
const authStore = useAuthStore()
const { getReportRewards, cancelReward } = useRewardStore()
const rewards = ref([])
const userID = ref(null)
userID.value = authStore.storeUser?.user_login.id
console.log('userID', userID.value)

onMounted(async () => {
    rewards.value = await getReportRewards(route.params.userID)
    console.log('report reward view', rewards.value.counters);
})

const formatDate = dateString => {
    const date = new Date(dateString)
    return date.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        // hour: "2-digit",
        // minute: "2-digit",
        // second: "2-digit",
        // timeZoneName: "short",
    })
}

const onSertReward = async (rewardID, userID) => {
    console.log('function onSertReward', rewardID, userID);
}

const onRecoverReward = async (rewardID, userID) => {
    console.log('function onRecoverReward', rewardID, userID);
}

const onCancelReward = async (itemID) => {
    try {
        const res = await axiosAPI.post(`/api/cartItems/cancel_reward/${itemID}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (res.status === 201) {
            window.location.reload();
        } else {
            console.log('cancel reward function itemID false', res);
        }

    } catch (error) {
        console.error(error);
    }

}

</script>
<template>
    <div class="bg-white rounded-md shadow-lg p-5">
        <div class="overflow-x-auto mx-auto p-6">
            <table class="w-full text-sm text-gray-700">
                <thead class="bg-gray-200 text-gray-700 uppercase">
                    <tr>
                        <td class="p-3">Counter</td>
                        <td class="p-3">Status</td>
                        <td class="p-3">Image</td>
                        <td class="p-3">Point</td>
                        <td class="p-3">Detail</td>
                        <td class="p-3">Date Time</td>
                        <td class="p-3">Event</td>
                    </tr>
                </thead>
                <tbody v-if="rewards">
                    <tr v-for="(reward, index) in rewards.counters" :key="index">
                        <td class="text-center p-3">{{ index }}</td>
                        <td class="p-3">status reward</td>
                        <td class="p-3" v-if="reward">
                            <p v-for="(image, index) in reward.rewards[0].images" :key="index">
                                <img :src="'data:image/png;base64,' + image.image_data" class="size-10 m-auto"
                                    alt="ImageReward">
                            </p>
                        </td>
                        <td class="p-3">{{ reward.rewards[0].point }}</td>
                        <td class="p-3">{{ reward.detail }}</td>
                        <td class="p-3">{{ formatDate(reward.created_at) }}</td>
                        <td class="p-3">
                            <div>
                                <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="dropdown"
                                    aria-expanded="false">event</button>
                                <ul class="dropdown-menu">
                                    <li class="dropdown-items p-3"
                                        @click="onSertReward(reward.rewards[0].id, reward.user_id)">ส่งของรางวัล</li>
                                    <li class="dropdown-items p-3"
                                        @click="onRecoverReward(reward.rewards[0].id, reward.user_id)">เปลี่ยนของวัล
                                    </li>
                                    <li class="dropdown-items p-3" @click="onCancelReward(reward.id)">ยกเลิก</li>
                                </ul>

                            </div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td>
                            <p class="m-auto font-bold text-red-600">Report request null</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>