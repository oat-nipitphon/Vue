<script setup>
import { ref } from "vue";

const isPopoverVisible = ref(false);
const placement = ref(null);

function popoverPosition() {
  switch (placement.value) {
    case "top":
      return "top-0 left-1/2 transform -translate-x-1/2 -translate-y-full";
    case "right":
      return "top-1/2 left-full transform -translate-y-1/2";
    case "bottom":
      return "bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full";
    case "left":
      return "top-1/2 left-0 transform -translate-y-1/2 -translate-x-full";
    default:
      return "";
  }
}

const togglePopover = async () => {
  isPopoverVisible.value = !isPopoverVisible.value;
};
</script>

<template>
  <div>
    <div class="w-full flex justify-center mt-10">
      <img
        class="icon-laravel"
        src="../assets/icon/laravel.png"
        alt="icon-laravel"
      />
      <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
    </div>

    <button
      @click="togglePopover"
      data-popover-target="popover-top"
      data-popover-placement="top"
      type="button"
      class="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Top popover
    </button>

    <div
      v-if="isPopoverVisible"
      data-popover
      id="popover-top"
      role="tooltip"
      :class="popoverPosition"
      class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div
        class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">Popover top</h3>
      </div>
      <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
      <div data-popper-arrow></div>
    </div>
    <button
      @click="togglePopover"
      data-popover-target="popover-right"
      data-popover-placement="right"
      type="button"
      class="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Right popover
    </button>
    <div
      v-if="isPopoverVisible"
      data-popover
      id="popover-right"
      role="tooltip"
      :class="popoverPosition"
      class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div
        class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Popover right
        </h3>
      </div>
      <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
      <div data-popper-arrow></div>
    </div>
    <button
      @click="togglePopover"
      data-popover-target="popover-bottom"
      data-popover-placement="bottom"
      type="button"
      
      class="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Bottom popover
    </button>
    <div
      v-if="isPopoverVisible"
      data-popover
      id="popover-bottom"
      role="tooltip"
      :class="popoverPosition"
      class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div
        class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Popover bottom
        </h3>
      </div>
      <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
      <div data-popper-arrow></div>
    </div>
    <button
      @click="togglePopover"
      data-popover-target="popover-left"
      data-popover-placement="left"
      type="button"
      class="text-white mb-3 me-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Left popover
    </button>
    <div
      v-if="isPopoverVisible"
      data-popover
      id="popover-left"
      role="tooltip"
      :class="popoverPosition"
      class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
    >
      <div
        class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white">
          Popover left
        </h3>
      </div>
      <div class="px-3 py-2">
        <p>And here's some amazing content. It's very engaging. Right?</p>
      </div>
      <div data-popper-arrow></div>
    </div>
  </div>
</template>
<style scoped>
.icon-laravel {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
.icon-vue {
  width: 250px;
  height: 150px;
  margin: 10px;
  margin-top: 50px;
}
[data-popper-arrow] {
  position: absolute;
  width: 10px;
  height: 10px;
  background: inherit;
  transform: rotate(45deg);
  z-index: -1;
}
</style>
