<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useStoreUserProfile } from "@/stores/user.profile";
import FileImageModal from "@/components/FileImageModal.vue";
import CardFollowers from "@/components/CardFollowers.vue";

const route = useRoute();
const statusUser = ref(null);
const userProfile = ref(null);
const userProfileImage = ref(null);
const isEventSpanDetailProfile = ref(true);
const isEventInputDetailProfile = ref(false);
const isEventButtonEditDetailProfile = ref(true);
const isEventButtonUpdateDetailProfile = ref(false);
const isEventButtonCencelUpdateDetailProfile = ref(false);

const toggleEventInputDetailProfile = async () => {
  isEventInputDetailProfile.value = true;
  isEventSpanDetailProfile.value = false;
  isEventButtonUpdateDetailProfile.value = true;
  isEventButtonCencelUpdateDetailProfile.value = true;
  isEventButtonEditDetailProfile.value - false;
};

const toggleEventCencelUpdateProfile = async () => {
  isEventInputDetailProfile.value = false;
  isEventSpanDetailProfile.value = true;
  isEventButtonUpdateDetailProfile.value = false;
  isEventButtonCencelUpdateDetailProfile.value = false;
  isEventButtonEditDetailProfile.value - true;
};

const {
  apiGetAllUserProfile,
  apiGetStatusUser,
  apiUpdateDetailUserProfile,
  apiUploadImageUserProfile,
} = useStoreUserProfile();

const formData = reactive({
  userID: "",
  name: "",
  email: "",
  userName: "",
  statusID: "",
  statusName: "",
  profileID: "",
  titleName: "",
  fullName: "",
  nickName: "",
  telPhone: "",
  birthDay: "",
});

const age = computed(() => {
  if (!formData.birthDay) return "Age not available";
  const birthDate = new Date(formData.birthDay);
  const currentDate = new Date();
  let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    calculatedAge--; // ลดอายุถ้ายังไม่ถึงวันเกิดในปีนี้
  }
  return `Age ${calculatedAge} years`;
});

onMounted(async () => {
  userProfile.value = await apiGetAllUserProfile(route.params.id);
  if (userProfile.value) {
    formData.userID = userProfile.value.id || "";
    formData.name = userProfile.value.name || "";
    formData.email = userProfile.value.email || "";
    formData.userName = userProfile.value.username || "";
    formData.statusID = userProfile.value.status_user.id || "";
    formData.statusName = userProfile.value.status_user.status_name || "";
    formData.profileID = userProfile.value.user_profile.id || "";
    formData.titleName = userProfile.value.user_profile.title_name || "";
    formData.fullName = userProfile.value.user_profile.full_name || "";
    formData.nickName = userProfile.value.user_profile.nick_name || "";
    formData.telPhone = userProfile.value.user_profile.tel_phone || "";
    formData.birthDay = userProfile.value.user_profile.birth_day || "";
    // userProfileImage.value = userProfile.value.user_profile.user_profile_image.image_name || "";
    // console.log("image :: ", userProfileImage.value);
  }
  statusUser.value = await apiGetStatusUser();
});

const btnUpdateProfile = async () => {
  await apiUpdateDetailUserProfile(formData);
};
</script>
<template>
  <div v-if="userProfile">
    <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-8">
      <div class="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <!-- ******************** Start Card User Profile ******************** -->
        <div class="w-full mt-10">
          <div class="py-4 md:py-8">
            <h2
              class="mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6"
            >
              Dashboard Profile overview.
            </h2>
            <div class="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
              <!-- Card Profile left -->
              <!-- https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png -->
              <div class="space-y-4">
                <div class="flex space-x-4">
                  <img
                    width="100%"
                    height="100%"
                    class="rounded-full w-96 h-96"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                    alt="Helene avatar"
                  />
                </div>
                <FileImageModal />
              </div>

              <!-- Start Card Show Detail Profile -->
              <div class="space-y-4" v-if="isEventSpanDetailProfile">
                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    Status account
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    {{ userProfile.status_user.status_name }}
                  </div>
                </div>
                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    Full name
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    {{ userProfile.user_profile.title_name }}
                    {{ userProfile.user_profile.full_name }}
                  </div>
                </div>
                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    Nick Name
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    {{ userProfile.user_profile.nick_name }}
                  </div>
                </div>
                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    Email Address
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    {{ userProfile.email }}
                  </div>
                </div>
                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    Tel phone
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    {{ userProfile.user_profile.tel_phone }}
                  </div>
                </div>
                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    Birth day
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    {{ age }}
                  </div>
                </div>
                <div class="flex justify-end mt-5 mr-5">
                  <button
                    v-if="isEventButtonEditDetailProfile"
                    @click="toggleEventInputDetailProfile"
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
              <!-- End Card Show Detail Profile -->

              <!-- Start Card Edit Detail Profile -->
              <div class="space-y-4" v-if="isEventInputDetailProfile">
                <!-- <form @submit.prevent="apiUpdateDetailUserProfile(formData)" > -->

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <!-- Status Dropdown -->
                  <div v-if="statusUser">
                    <label
                      for="status"
                      class="block text-sm font-medium text-gray-900"
                    >
                      Status account
                    </label>
                    <select
                      v-if="userProfile.status_id === '1' || userProfile.status_id === '2'"
                      id="status"
                      v-model="formData.statusID"
                      class="font-semibold text-gray-500 dark:text-white text-sm mt-2 form-control"
                    >
                      <option value="null" disabled>select status</option>
                      <option
                        v-for="status in statusUser"
                        :key="status.id"
                        :value="status.id"
                      >
                        <!-- Sta -->
                        {{ status.status_name }}
                      </option>
                    </select>
                    <label v-else class="text-gray-500 dark:text-gray-400">
                      {{ userProfile.status_user.status_name }}
                    </label>
                  </div>
                  <div v-else>
                    <h4>ไม่มีข้อมูล</h4>
                  </div>
                </div>

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <label
                    for="titleName"
                    class="block text-sm font-medium text-gray-900"
                  >
                    Title name
                  </label>
                  <div
                    class="font-semibold text-gray-500 dark:text-white text-sm mt-2"
                  >
                    <select v-model="formData.titleName" class="form-control">
                      <option value="mr">Mr.</option>
                      <option value="miss">Miss.</option>
                      <option value="mrs">Mrs.</option>
                    </select>
                  </div>
                </div>

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <label
                    for="fullName"
                    class="block text-sm font-medium text-gray-900"
                  >
                    full name
                  </label>
                  <div class="text-gray-500 dark:text-gray-400">
                    <input
                      v-model="formData.fullName"
                      type="text"
                      id="fullName"
                      class="font-semibold text-gray-500 dark:text-white text-sm mt-2 form-control"
                    />
                  </div>
                </div>

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <label
                    for="nickName"
                    class="block text-sm font-medium text-gray-900"
                  >
                    Nick Name
                  </label>
                  <div class="text-gray-500 dark:text-gray-400">
                    <input
                      class="font-semibold text-gray-500 dark:text-white text-sm mt-2 form-control"
                      type="text"
                      v-model="formData.nickName"
                    />
                  </div>
                </div>

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <label class="block text-sm font-medium text-gray-900">
                    Email Address
                  </label>
                  <div class="text-gray-500 dark:text-gray-400">
                    <input
                      v-model="formData.email"
                      type="email"
                      id="email"
                      class="font-semibold text-gray-500 dark:text-white text-sm mt-2 form-control"
                    />
                  </div>
                </div>

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <label class="block text-sm font-medium text-gray-900">
                    Phone Number
                  </label>
                  <div class="text-gray-500 dark:text-gray-400">
                    <input
                      type="text"
                      class="font-semibold text-gray-500 dark:text-white text-sm mt-2 form-control"
                      v-model="formData.telPhone"
                    />
                  </div>
                </div>

                <div class="font-semibold text-gray-500 dark:text-white text-sm">
                  <div>
                    <label class="block text-sm font-medium text-gray-900">
                      Birth day
                    </label>
                  </div>
                  <div class="text-gray-500 dark:text-gray-400">
                    <input
                      type="date"
                      class="font-semibold text-gray-500 dark:text-white text-sm mt-2 form-control"
                      v-model="formData.birthDay"
                    />
                  </div>
                </div>

                <div class="flex justify-end mt-5">
                  <button
                    v-if="isEventButtonUpdateDetailProfile"
                    @click="btnUpdateProfile"
                    type="button"
                    class="btn btn-sm btn-primary btn-size__form"
                  >
                     Update
                  </button>
                  <button
                    v-if="isEventButtonCencelUpdateDetailProfile"
                    @click="toggleEventCencelUpdateProfile"
                    class="btn btn-sm btn-danger btn-size__form"
                    type="button"
                  >
                    Cencel
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <h1>Account false.</h1>
  </div>
</template>
<style>
.btn-size__form {
  width: 70px;
  height: 30px;
  margin: 2px;
}
</style>