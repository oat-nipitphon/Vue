<template>
    <div class="w-full">
      <div class="flex justify-end">
        <!-- Search -->
        <div class="flex lg:ml-6 mr-5">
          <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
            <span class="sr-only">Search</span>
            <MagnifyingGlassIcon class="size-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
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
</script>