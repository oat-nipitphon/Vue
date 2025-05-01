<script setup>
import { ref, onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAdminRewardStore } from '@/stores/admin.rewards'
import AdminRewardModalUpdate from '@/components/Reward/AdminRewardModalUpdate.vue'
import AdminRewardModalShow from '@/components/Reward/AdminRewardModalShow.vue'

const rewardStore = useAdminRewardStore()
const { storeRewards } = storeToRefs(rewardStore)
const { storeAdminAPIGetRewards, storeAdminUpdateReward, storeAdminDeleteReward } = useAdminRewardStore()
const rewards = ref([]);
const rewardUpdate = ref([]);




onMounted(async () => {
  rewards.value = await rewardStore.storeAdminAPIGetRewards()
  console.log('admin manager reward', rewards.value)
})

// function switch status reward
const toggleStatus = async (reward) => {
  const rewardID = reward.id;
  const status = reward.status;
  try {

    const res = await fetch(`/api/admin/rewards/updateStatusReward/${rewardID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        rewardID: rewardID,
        status: status,
      }),
    });

    const data = await res.json()

    if (res.ok) {
      window.location.reload();
    } else {
      console.log('update false', res);
    }

  } catch (error) {
    console.error('function toggle status error', error);
  }

}

// // function show modal edit reward
const onShowModalEditReward = (reward) => {
  rewardUpdate.value = reward
  if (rewardUpdate.value) {
    formUpdate.id = reward.id || ''
    formUpdate.name = reward.name || ''
    formUpdate.point = reward.point || ''
    formUpdate.amount = reward.amount || ''
  }
}

// // function update reward
const onUpdateReward = async () => {
  const rewardID = formUpdate.id
  const res = await fetch(`/api/admin/rewards/manager/${rewardID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      id: formUpdate.id,
      name: formUpdate.name,
      point: formUpdate.point,
      amount: formUpdate.amount,
    })
  });

  const data = await res.json();

  if (res.status === 200) {
    console.log('update success', data.reward)
    window.location.reload()
  } else {
    console.error('update reward false', res.data);
  }
}

</script>

<template>
  <div class="mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Rewards</h1>
      <RouterLink :to="{ name: 'NewRewardView' }" class="btn btn-md btn-outline-primary">
        new
      </RouterLink>
    </div>

    <table class="w-full text-sm text-gray-700">
      <thead>
        <tr class="bg-gray-100 text-xs uppercase tracking-wider">
          <th class="text-center px-4 py-3 font-semibold">#</th>
          <th class="text-center px-4 py-3 font-semibold">Image</th>
          <th class="text-left px-4 py-3 font-semibold">Name</th>
          <th class="text-center px-4 py-3 font-semibold hidden md:table-cell">Points</th>
          <th class="text-center px-4 py-3 font-semibold hidden md:table-cell">Amount</th>
          <th class="text-center px-4 py-3 font-semibold">Status</th>
          <th class="text-center px-4 py-3 font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody v-if="rewards">

        <tr v-for="(reward, index) in rewards" :key="reward.id" class="border-b hover:bg-gray-50 transition">

          <td class="text-center px-4 py-3 font-medium">{{ index + 1 }}</td>

          <td class="text-center px-4 py-3">
            <img v-if="reward.rewardImage[0]?.image_data" :src="reward.rewardImage[0].image_data"
              class="w-12 h-12 object-cover rounded-lg mx-auto" alt="Reward Image" />
            <img v-else
              src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
              class="w-12 h-12 object-contain mx-auto opacity-50" alt="No Image" />
          </td>

          <td class="px-4 py-3">{{ reward.name }}</td>

          <td class="text-center px-4 py-3 hidden md:table-cell">{{ reward.point }}</td>

          <td class="text-center px-4 py-3 hidden md:table-cell">{{ reward.amount }}</td>

          <td class="text-center px-4 py-3">
            <button @click="toggleStatus(reward)" class="text-sm font-semibold rounded-full px-4 py-1 transition"
              :class="reward.status === 'true' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-red-100 text-red-700 hover:bg-red-200'">
              {{ reward.status === 'true' ? 'Active' : 'Inactive' }}
            </button>
          </td>

          <td class="text-center px-4 py-3">
            <div class="inline-flex space-x-1">
              <div>
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-xs"
                data-bs-toggle="modal" data-bs-target="#modalAdminRewardModalShow">
                  Show
                </button>
                <AdminRewardModalShow  :rewardShow="reward" />
                
              </div>
              <div>
                <button class="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                  data-bs-toggle="modal" data-bs-target="#modalEditReward" @click="onShowModalEditReward(reward)">
                  Edit
                </button>
                <AdminRewardModalUpdate :rewardUpdate="reward" />
              </div>
              <div>
                <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs"
                  @click="storeAdminDeleteReward(reward.id)">
                  Delete
                </button>
              </div>
            </div>
          </td>

        </tr>

      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="7" class="text-center py-6 text-red-500 font-semibold text-lg">
            No rewards available.
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
