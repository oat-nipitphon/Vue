<template>
<div class="bg-white w-full">
    <div class="w-3/4 m-auto">
        <FormLogin />
    </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import FormLogin from '@/components/NewComponents/Auth/FormLogin.vue';

</script>