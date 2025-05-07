<script setup>
import { onMounted, ref, computed } from "vue";
import { useAdminPostStore } from "@/stores/admin.posts";
import TableReport from "@/components/TableReport.vue";

const { adminAPIGETposts, adminAPIPostBlockOrUnBlock, adminAPIPostDelete } =
  useAdminPostStore();

const posts = ref([]);

onMounted(async () => {
  posts.value = await adminAPIGETposts();
  console.log("admin manager post view", posts.value);
});

const tableData = computed(() => {
  return posts.value.map((post) => {
    return {
      id: post?.id,
      title: post?.post_title,
      creator: post?.user?.user_profile?.full_name,
      status: getPostStatus(post),
      postObj: post, // ส่ง post ทั้ง object
    };
  });
});

function getPostStatus(post) {
  if (isTrue(post?.deletetion_status)) return "Store";
  if (isTrue(post?.block_status)) return "Block";
  return "Active";
}

function isTrue(val) {
  return val === true || val === "true";
}
</script>

<template>
  <div class="bg-red-200 p-5">
    <TableReport
      :headers="['ID', 'Title', 'Creator', 'Status', 'Event']"
      :data="tableData"
      @showPost="(post) => console.log('Show Post', post)"
      @showUser="(userProfile) => console.log('Show User Profile', userProfile)"
      @blockPost="(id, action) => adminAPIPostBlockOrUnBlock(id, action)"
      @deletePost="(id) => adminAPIPostDelete(id)"
    />
  </div>
</template>
