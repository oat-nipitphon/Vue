<script setup>
import { ref, onMounted, reactive } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { usePostStore } from "@/stores/post";

const route = useRoute();
const { apiRecoverGetPost, apiRecoverPost } = usePostStore();

const postID = ref(null);
const recoverPosts = ref(null);

onMounted(async () => {
  // ใช้ map เพื่อแปลงข้อมูลบางอย่างใน recoverPosts (ถ้าจำเป็น)
  //  const mappedPosts = recoverPosts.value.map(post => ({
  //         ...post,
  //         createdAt: new Date(post.createdAt), // สมมติว่า post มีฟิลด์ createdAt
  //     }));
  //     // ใช้ sort เพื่อเรียงลำดับข้อมูลตาม createdAt
  //     recoverPosts.value = mappedPosts.sort((a, b) => b.createdAt - a.createdAt);

  recoverPosts.value = await apiRecoverGetPost(route.params.userID);
  console.log("recover posts value :: ", recoverPosts.value);
});

</script>
<template>
  <div class="container">
    <div class="mt-10">
      <h1>Recover Posts</h1>
    </div>
    <div class="row flex justify-end m-5">
        <RouterLink
        type="button"
            :to="{ name: 'DashboardView' }"
            class="btn btn-sm btn-danger"
        >
            Back DashboardView
        </RouterLink>
    </div>
    <div v-if="recoverPosts" class="mt-10">
      <div v-for="post in recoverPosts" :key="post.id">
        <div class="flex justify-center">
          <form @submit.prevent="apiRecoverPost(post.id)">
            <!-- <button :disabled="loading" type="submit" class="btn btn-sm btn-outline-success"> -->
            <button type="submit" class="btn btn-sm btn-outline-success">
              {{ post.id }}
              <span class="text-sm"> Recover </span>
            </button>
          </form>
        </div>
        <div class="row text-center">
            <div class="col-md-6">
                Status Deletetion :: {{ post.deletetion_status }}
            </div>
            <div class="col-md-6">
                User Profile ID ::  {{ post.user_id }}
            </div>
        </div>
        <div class="row">
          {{ post.post_title }}
        </div>
        <div class="row">
          {{ post.post_content }}
        </div>
        <div class="row">
         <hr style="margin: 10px;">
        </div>
      </div>
    </div>
    <div v-else class="mt-10"></div>
  </div>
</template>
