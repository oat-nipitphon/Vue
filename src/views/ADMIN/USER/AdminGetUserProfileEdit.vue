<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";
const route = useRoute();
const { userProfile, errors } = storeToRefs(useAdminUserProfileStore());
const { adminGetDataEditUserProfile } = useAdminUserProfileStore();
console.log("admin get user profile edit", userProfile);
const imageFile = ref(null);
const imageUrl = ref(null);
const form = reactive({
    userID: "",
    username: "",
    email: "",
    userProfileID: "",
    titleName: "",
    fullName: "",
    nickName: "",
    brithDay: "",
    telPhone: "",
});

onMounted(async () => {
    await adminGetDataEditUserProfile(route.params.userProfileID);

});
</script>
<template>
    <div class="container">
        <div v-if="userProfile">

        </div>
    </div>
</template>