<script>
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
<template>
    <div class="w-full">
      <!-- Cart icon shopping -->
      <div class="ml-4 flow-root lg:ml-6">
        <a href="#" class="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            class="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span
            class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
            >0</span
          >
          <span class="sr-only">items in cart, view bag</span>
        </a>
      </div>
    </div>
</template>
