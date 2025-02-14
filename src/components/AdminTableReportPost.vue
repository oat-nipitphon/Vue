<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useAdminPostStore } from "@/stores/admin.posts";

const authStore = useAuthStore();

// const items = ref(Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)); // ตัวอย่างข้อมูล 100 รายการ
const { adminAPIGETposts, adminAPIPostBlockOrUnBlock, adminAPIPostDelete } =
  useAdminPostStore();

const posts = ref([]);
const modalPostID = ref([]);
const modalPostContent = ref([]);

const modalUserProfileID = ref([]);
const modalUserProfileFullName = ref([]);
const modalUserProfileFollowers = ref([]);

const currentPage = ref(1); // กำหนดหน้าเริ่มต้น
const itemsPerPage = ref(20); // จำนวนข้อมูลต่อหน้า

// คำนวณจำนวนหน้า
const totalPages = computed(() =>
  Math.ceil(posts.value.length / itemsPerPage.value)
);

//  คำนวณข้อมูลที่จะแสดงในแต่ละหน้า
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return posts.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const blockOrUnBlock = async (postID, blockStatus) => {
  console.log("postID :: ", postID);
  console.log("blockStatus :: ", blockStatus);
};

const modalValuePostContent = (post) => {
  modalPostID.value = post.id;
  modalPostContent.value = post.post_content;
};

const modalValueUserProfile = (userProfile) => {
  console.log("user profile", userProfile);
  modalUserProfileID.value = userProfile.id;
  modalUserProfileFullName.value = userProfile.full_name;
  // modalUserProfileFollowers.value = user_profile.id;
};

onMounted(async () => {
  posts.value = await adminAPIGETposts();
});
</script>
<template>
  <div class="w-full">
    <div class="grid grid-cols-2">
      <div class="flex justify-start">
        <h2 for="AdminManagerPost" class="text-gray-900 mt-4 mb-4 p-2">
          Admin Manager posts.
        </h2>
      </div>
      <div class="flex">
        <!-- Event -->
      </div>
    </div>
    <div class="relative overflow-x-auto">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr class="w-full">
            <!-- <th
              scope="col"
              class="w-2 p-3 text-center font-semibold text-gray-900"
            >
              No.
            </th> -->
            <th scope="col" class="w-2 p-2 text-center font-semibold">
              Post ID
            </th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">
              Detail Post
            </th>
            <th scope="col" class="w-3 p-3 text-center font-semibold">
              Status Post
            </th>
            <th scope="col" class="w-4 p-3 text-center font-semibold">
              User Create Post
            </th>
            <th scope="col" class="w-5 p-3 text-center font-semibold">
              Events
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedPosts.length > 0">
          <tr
            v-for="(post, index) in paginatedPosts"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="w-2 py-2 text-center">
              {{ post.id }}
            </td>
            <td class="w-5 p-3 text-start m-1">
              <!-- Button Open modal show post content -->
              <button
                @click="modalValuePostContent(post)"
                type="button"
                class="m-1 text-md"
                for="TitlePost"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalDetailPost"
              >
                {{ post.post_title }}
              </button>
              <!-- Modal post content -->
              <div
                class="modal fade"
                id="exampleModalDetailPost"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalDetailPost">
                        Detail Post ID {{ modalPostID }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      {{ modalPostContent }}
                    </div>
                    <div class="modal-footer"></div>
                  </div>
                </div>
              </div>
            </td>
            <td class="w-4 p-3 text-center m-1">
              <p
                v-if="
                  post.deletetion_status === 'false' &&
                  post.block_status === 'false'
                "
                class="text-green-500 text-sm text-center"
              >
                Normal
              </p>
              <p
                v-if="post.deletetion_status === 'true'"
                class="text-red-600 text-sm text-center"
              >
                Deletetion
              </p>
              <p
                v-if="post.block_status === 'true'"
                class="text-red-600 text-sm text-center"
              >
                ** Block Post **
              </p>
            </td>
            <td class="w-4 p-3 text-center m-1">
              <!-- Button show modal user profile -->
              <button
                @click="modalValueUserProfile(post.user.user_profile)"
                type="button"
                for="UserProfileName"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalUserProfile"
              >
                {{ post.user.user_profile.full_name }}
              </button>
              <!-- Modal show user profile-->
              <div
                class="modal fade"
                id="exampleModalUserProfile"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        User Profile ID {{ modalUserProfileID }}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      {{ modalUserProfileFullName }}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <!-- <button type="button" class="btn btn-primary">
                        Save changes
                      </button> -->
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td class="flex text-center">
              <div class="dropdown m-auto">
                <button
                  class="dropdown-toggle btn btn-sm btn-event mt-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Event
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <button
                      v-if="post.block_status === 'false'"
                      type="button"
                      @click="adminAPIPostBlockOrUnBlock(post.id, 'Block')"
                      class="btn btn-block dropdown-item m-2"
                    >
                      Block
                    </button>
                    <button
                      v-if="post.block_status === 'true'"
                      type="button"
                      @click="adminAPIPostBlockOrUnBlock(post.id, 'Unblock')"
                      class="btn btn-unblock dropdown-item m-2"
                    >
                      Unblock
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      @click="adminAPIPostDelete(post.id)"
                      class="btn btn-delete dropdown-item m-2"
                    >
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td class="flex justify-center text-lg m-5 text-red-600">
              Data posts false.
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-between items-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="btn btn-primary"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.btn-event {
  background-color: #3498db; /* สีฟ้า */
  color: white;
  border-radius: 5px;
}

.dropdown-menu {
  background-color: #f8f9fa; /* สีพื้นหลังเทาอ่อน */
  border-radius: 8px;
  padding: 8px 0;
}

.dropdown-item {
  padding: 5px 5px;
  border-radius: 5px;
}

.btn-block {
  background-color: #f31212; /* สีส้ม */
  color: white;
}

.btn-unblock {
  background-color: #27ae60; /* สีเขียว */
  color: white;
}

.btn-delete {
  background-color: #ffffff; /* สีแดง */
  color: black;
}
</style>
