<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";

const { adminAPIGETuserProfile } = useAdminUserProfileStore();
const userProfiles = ref([]);
onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfile();
  console.log("user profile value ", userProfiles.value);
});
</script>
<template>
  <div class="container">
    <div class="w-full shadow-amber-500">
      <h1>Table Report User Profiles</h1>
    </div>
    <div v-if="userProfiles">
      <div v-for="(userProfile, index) in userProfiles" :key="userProfile.id">
        <p>{{ index + 1 }}</p>
        <p>
          {{ userProfile.full_name }}
        </p>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <label class="text-lg text-gray-900">Data user profile false.</label>
    </div>
  </div>
</template>
