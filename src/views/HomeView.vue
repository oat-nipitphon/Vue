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
  <div class="container">
    <div class="w-full flex justify-center mt-10">
      <img
        class="icon-laravel"
        src="../assets/icon/laravel.png"
        alt="icon-laravel"
      />
      <img class="icon-vue" src="../assets/icon/vue.png" alt="icon-vue" />
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
