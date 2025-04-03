<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useRewardStore } from '@/stores/reward'
import { storeToRefs } from 'pinia'


import EditRewardView from '@/views/ADMIN/Reward/AdminEditRewardView.vue'
import ModalShowRewardDetail from '@/components/Tailwind/ModalShowRewardDetail.vue'

const rewardStore = useRewardStore()
const { rewards } = storeToRefs(rewardStore)
const { deleteReward } = useRewardStore()

onMounted(async () => {
  await rewardStore.getRewards()
})

const toggleStatus = reward => {
  reward.status = reward.status === 'true' ? 'false' : 'Active'
}

</script>

<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold text-gray-800">Rewards List</h1>
      <RouterLink
        :to="{ name: 'NewRewardView' }"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        + New Reward
      </RouterLink>
    </div>

    <div class="bg-white shadow-lg rounded-lg p-4">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200 text-gray-700 uppercase text-sm font-semibold">
            <th class="py-3 px-4 text-center font-bold">ID</th>
            <th class="py-3 px-4 text-center font-bold">Image</th>
            <th class="py-3 px-4 text-center font-bold">Name</th>
            <th class="py-3 px-4 text-center font-bold">Point</th>
            <th class="py-3 px-4 text-center font-bold">Status</th>
            <th class="py-3 px-4 text-center font-bold">Quantity</th>
            <th class="py-3 px-4 text-center font-bold">Event</th>
          </tr>
        </thead>
        <tbody v-if="Array.isArray(rewards) && rewards.length > 0">
          <tr
            v-for="(reward, index) in rewards"
            :key="reward.id"
            class="border-b hover:bg-gray-100"
          >
            <td class="py-3 px-4">{{ index }}</td>
            <td class="py-3 px-4">
              <p v-for="image in reward.rewardImage" :key="image.id">
                <img
                  v-if="image.image_data"
                  :src="image.image_data"
                  class="size-10 rounded-lg m-auto"
                  alt="ImageReward"
                />
                <img
                  v-else
                  src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg"
                  alt="ImageReward"
                />
              </p>
            </td>
            <td class="py-3 px-4">{{ reward.name }}</td>
            <td class="py-3 px-4">{{ reward.point }}</td>
            <td class="py-3 px-4">
              <button
                @click="toggleStatus(reward)"
                class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                :class="
                  reward.status === 'true' ? 'text-green-600' : 'text-red-600'
                "
              >
                Swit
                {{ reward.status === 'true' ? 'true' : 'false' }}
              </button>
            </td>
            <td class="py-3 px-4">{{ reward.quantity }}</td>
            <td class="py-3 px-4 text-center">
              <div class="dropdown">
                <button
                  class="btn btn-sm btn-secondary dropdown-toggle w-full"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Event
                </button>
                <ul class="dropdown-menu w-full">
                  <!-- <li class="dropdown-item">
                    <toggle-button @change="onChangeEventHandler" />

                    <toggle-button v-model="myDataVariable" />

                    <toggle-button
                      :value="false"
                      color="#82C7EB"
                      :sync="true"
                      :labels="true"
                    />

                    <toggle-button
                      :value="true"
                      :labels="{ checked: 'Foo', unchecked: 'Bar' }"
                    />
                  </li> -->
                  <li class="dropdown-item">
                    <button
                      @click="toggleStatus(reward)"
                      class="block w-full text-center px-4 py-2 text-sm hover:bg-gray-200"
                      :class="
                        reward.status === 'true'
                          ? 'text-green-600'
                          : 'text-red-600'
                      "
                    >
                      Switch {{ reward.status === 'true' ? 'true' : 'false' }}
                    </button>
                  </li>
                  <li class="dropdown-item">
                    <button class="btn btn-primary w-full text-center">
                      Show
                    </button>
                  </li>
                  <li class="dropdown-item">
                    <button class="btn btn-warning w-full text-center">
                      Edit
                    </button>
                  </li>
                  <li class="dropdown-item">
                    <button class="btn btn-danger w-full text-center" type="submit" @click="deleteReward(reward.id)">
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              colspan="7"
              class="py-4 text-center text-lg text-red-500 font-bold"
            >
              No rewards available
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
