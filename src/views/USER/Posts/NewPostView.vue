<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePostStore } from "@/stores/post";
import TipTapEditor from "@/components/TipTapEditor.vue";
const router = useRouter();
const { apiCreatePostNew } = usePostStore();
</script>
<template>
  <div class="container">
    <div class="ibox-editor-new-post">
      <TipTapEditor />
    </div>
  </div>
</template>
