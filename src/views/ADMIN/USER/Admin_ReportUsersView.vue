<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useStoreUserProfile } from '@/stores/user.profile'

const { apiGetAllUserProfile } = useStoreUserProfile()

const userProfiles = ref(null);

userProfiles.value = await apiGetAllUserProfile();

console.log("userProfiles :: ", userProfiles.value);
</script>
<template>
  <div class="container mt-10" v-if="userProfiles">
    <div class="w-full mt-10 p-5" v-for="userProfile in userProfiles" :key="userProfile.id">
      {{ userProfile.id }}
    </div>
  </div>
  <div v-else>
    <h3>user profiles null</h3>
  </div>
</template>
