<script setup>
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

import { ref, onMounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useRewardStore } from '@/stores/reward'
import { useRewardCartStore } from '@/stores/reward.cart'
import CardReward from '@/components/Reward/CardReward.vue'

const rewardStore = useRewardStore()
const { rewards } = storeToRefs(rewardStore)


const rewardCartStore = useRewardCartStore()
const { cartItemCounter } = storeToRefs(rewardCartStore)

onMounted(async () => {
  await rewardStore.getRewards()
})


</script>
<template>
  <div class="bg-white container rounded-lg shadow-lg">
    <!-- navbar right -->
    <div class="grid grid-cols-2 mt-5">
      <!-- Search -->
      <div class="flex justify-center">
        <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
          <span class="sr-only">Search</span>
          <MagnifyingGlassIcon class="size-7" aria-hidden="true" />
        </a>
      </div>

      <!-- Cart icon shopping -->
      <div class="flex justify-end">
        <a href="#" class="group -m-2 flex items-center p-2 mr-12">
          <ShoppingBagIcon
            class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span
            class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 font-blod"
          >
            <!-- Number counter rewards -->
            {{ cartItemCounter }}
          </span>

          <span class="sr-only">items in cart, view bag</span>
        </a>
      </div>
    </div>
    <div class="w-full">
      <CardReward :rewards="rewards" />
    </div>
  </div>
</template>
