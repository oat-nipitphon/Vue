<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRewardStore } from '@/stores/reward'
import axiosAPI from '@/services/axiosAPI'
const router = useRouter()
const { newReward, updateReward } = useRewardStore()

const props = defineProps({
    rewards: Object
});
console.log("Edit reward ", props.rewards);

const form = reactive({
    id: '',
    name: '',
    point: '',
    quantity: '',
    type: '',
    status: '',
});

const imageFile = ref(null);
const imageUrl = ref(null);

</script>
<template>
  <div>
    <div class="container"></div>
    <div class="w-full max-w-lg m-auto mt-10">
      <div class="bg-white mt-10 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="w-full" v-for="reward in props.rewards" :key="reward.id">
          <!-- <form @submit.prevent="newReward(form)"> -->
            <input type="text"  v-model="form.id">
            <div class="mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Name:
              </label>
              <input
                v-model="form.name"
                
                class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
              />
            </div>
            <div class="mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Point:
              </label>
              <input
                v-model="form.point"
                class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
              />
            </div>
            <div class="mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Quantity:
              </label>
              <input
                v-model="form.quantity"
                class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
              />
            </div>
            <div class="mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Type:
              </label>
              <select
                v-model="form.type"
                class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="reward">reward</option>
              </select>
            </div>
            <div class="mt-5">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-city"
              >
                Status:
              </label>
              <select
                v-model="form.status"
                class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div class="mt-5">
              <label
                for="fileImage"
                class="block text-xl font-medium text-gray-900 dark:text-white"
                >Upload Image</label
              >
              <div class="bg-white">
                <input
                  id="fileImage"
                  accept="image/*"
                  type="file"
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  @change="onSelectFileImage"
                />
                <img
                  :src="
                    imageUrl ||
                    'https://png.pngtree.com/png-clipart/20190920/original/pngtree-file-upload-icon-png-image_4646955.jpg'
                  "
                  alt="Image Preview"
                  class="ibox-image-post mt-3"
                />
              </div>
            </div>
            <div class="mt-5">
              <button @click="onUpdate" class="btn btn-sm btn-primary">
                update
              </button>
            </div>
          <!-- </form> -->
        </div>
      </div>
    </div>
  </div>
</template>
