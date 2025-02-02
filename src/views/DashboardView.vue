<script setup>
import { ref, onMounted, computed } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { usePostStore } from "@/stores/post";

const authStore = useAuthStore();
const userID = ref(authStore.storeUser?.user_login?.id || null);

const { apiGetPosts, apiDeletePost, apiPostPopLike, apiPostPopDisLike } =
  usePostStore();
const posts = ref([]);
const selectedPostContent = ref([]);
const selectedUserProfile = ref([]);

// Compute enriched data for posts
const enrichedPosts = computed(() =>
  posts.value.map((post) => {
    const likeCount = post.post_popularity.filter(
      (pop) => pop.pop_status === "Like"
    ).length;
    const disLikeCount = post.post_popularity.filter(
      (pop) => pop.pop_status === "DisLike"
    ).length;
    const userLiked = post.post_popularity.some(
      (pop) => pop.user_id === userID.value && pop.pop_status === "Like"
    );
    const userDisliked = post.post_popularity.some(
      (pop) => pop.user_id === userID.value && pop.pop_status === "DisLike"
    );
    return {
      ...post,
      likeCount,
      disLikeCount,
      userLiked,
      userDisliked,
    };
  })
);

// Handle like
const handleLike = async (post) => {
  await apiPostPopLike(userID.value, post.id, "Like");
  const updatedPosts = await apiGetPosts(); // Refresh posts after the like
  posts.value = updatedPosts;
};

// Handle dis like
const handleDislike = async (post) => {
  await apiPostPopDisLike(userID.value, post.id, "DisLike");
  const updatedPosts = await apiGetPosts(); // Refresh posts after the dislike
  posts.value = updatedPosts;
};

const modalValuePostContent = (content) => {
  selectedPostContent.value = content;
};

const btnDeletePost = async (id) => {
  await apiDeletePost(id);
  // posts.value = posts.value.filter((post) => post.id !== id); // Remove from UI
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
    // timeZoneName: "short",
  });
};

const onModalShowUserProfile = (userProfile) => {
  selectedUserProfile.value = userProfile;
  console.log(selectedUserProfile.value);
};

onMounted(async () => {
  posts.value = await apiGetPosts();
  console.log("posts :: ", posts.value);
});
</script>

<template>
  <div class="container">

      <!-- Button Create Post -->
      <div class="mt-5 flex justify-end">
        <RouterLink
          class="btn btn-sm btn-primary mr-10"
          :to="{
            name: 'CreatePostNewView',
          }"
        >
          Create post
        </RouterLink>
      </div>

      <!-- Start Report Data Posts Dashboard View -->
      <div class="w-full" v-if="enrichedPosts.length > 0">
        <div v-for="(post, index) in enrichedPosts" :key="index" class="post">
          <section class="bg-white dark:bg-gray-900">
            <div class="py-8 px-4 mx-auto max-w-4xl lg:py-16">
              <div class="grid grid-cols-2">

                <!-- Start Card User Profile -->
                <div class="grid grid-rows2 m-2 mt-4">
                  <div class="row">

                    <!-- Start Modal User Profile-->
                    <div class="col-md-2">
                      <div>
                        <img
                          @click="
                            onModalShowUserProfile(post.user.user_profile)
                          "
                          data-bs-toggle="modal"
                          data-bs-target="#modalShowUserProfileCreatePost"
                          class="rounded-full w-10 h-10"
                          alt="ImageUserProfile"
                          src="../assets/icon/keyboard.jpg"
                        />
                        <div
                          class="modal fade"
                          id="modalShowUserProfileCreatePost"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  Profile :: {{ selectedUserProfile.full_name }}
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <div class="flex justify-center text-sm m-auto">
                                  {{ selectedUserProfile }}
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button>popularity</button>
                                <button>followers</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- End Modal User Profile-->

                    <!-- Start Card User Profile Image Followers Popualiry -->
                    <div class="col-md-2">
                      <div class="row">
                        {{ post.user.username }}
                      </div>
                      <div class="row">
                        <div class="col-md-6">
                          <label class="m-2 text-sm"> pop </label>
                        </div>
                        <div class="col-md-6">
                          <label class="m-2 text-sm"> followers </label>
                        </div>
                      </div>
                    </div>
                    <!-- End Card User Profile Image Followers Popualiry -->

                  </div>
                </div>
                <!-- End Card User Profile -->

                <!-- Start Event Post Edit Delete -->
                <div
                  v-if="post.user_id === authStore.storeUser.user_login.id"
                  class="flex justify-end mt-4"
                >
                  <div class="dropdown">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-filter dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <path
                        d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
                      />
                    </svg>
                    <ul class="dropdown-menu">
                      <li>
                        <RouterLink
                          :to="{
                            name: 'EditPostView',
                            params: { id: post.id },
                          }"
                          class="dropdown-item btn btn-sm btn-warning m-2"
                        >
                          Edit
                        </RouterLink>
                      </li>
                      <li>
                        <button
                          @click="btnDeletePost(post.id)"
                          class="dropdown-item btn btn-sm btn-outline-danger m-2"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <!-- End Event Post Edit Delete -->

              </div>

              <!-- Start Card Post Main -->
              <div class="post-item">
                <div class="row">
                  <div class="col-md-6">
                    <label class="text-lg font-extrabold text-gray-900 dark:text-white">
                      {{ post.post_title }}
                    </label>
                    <label class="text-md ml-3 font-extrabold text-gray-900 dark:text-white">
                      ( {{ post.post_type.post_type_name }} )
                    </label>
                  </div>
                  <div
                    v-if="post.post_image && post.post_image.length > 0" 
                    class="col-md-6 flex justify-center"
                  >
                  
                    <img
                    src="../../../LaravelAPI/public/storage/images/O6BUxFQNMQ2MmXxxHOIOE9DCbRvlJVVI6IbBDjSO.png"
                      class="w-150 h-20 m-auto"
                      alt="Post Image"
                    >
                  </div>
                </div>
                <div class="flex justify-start m-auto">
                  <p class="font-semibold text-gray-900 dark:text-white">
                    <label class="text-sm text-gray-900">สร้างโพสต์ วันที่</label>
                    <label class="text-sm text-gray-900 ml-2">
                      {{ formatDate(post.created_at) }}
                    </label>
                  </p>
                </div>
                <div class="ibox-post-content">
                  <p class="mb-4 text-gray-500 dark:text-gray-400 line-clamp-5">
                    {{ post.post_content }}
                  </p>
                </div>
              </div>
              <!-- End Card Post Main -->

              <!-- Start Event Show Modal Post Content Detail -->
              <div class="ibox-button-more">        
                <button
                  v-if="post.post_content.length > 200"
                  type="button"
                  class="btn btn-sm btn-link text-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#modalShowMovePostContents"
                  @click="modalValuePostContent(post.post_content)"
                >
                  More ...
                </button>
              </div>
              <!-- End Event Show Modal Post Content Detail -->

              <!-- Start Post Like and Dis Like -->
              <div class="grid grid-cols-2 mt-4 ibox-button-pop-post">
                <div class="text-center ibox-button-pop-like">
                  <svg
                    v-if="post.userLiked === true"
                    @click="handleLike(post)"
                    class="text-primary bi bi-hand-thumbs-up-fill"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                    />
                  </svg>
                  <svg
                    v-else
                    @click="handleLike(post)"
                    class="text-secondary bi bi-hand-thumbs-up-fill"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"
                    />
                  </svg>
                  <label class="text-md"> Likes: {{ post.likeCount }} </label>
                </div>
                <div class="text-center ibox-button-pop-dis-like">
                  <svg
                    v-if="post.userDisliked === true"
                    @click="handleDislike(post)"
                    class="text-danger bi bi-hand-thumbs-down-fill"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"
                    />
                  </svg>
                  <svg
                    v-else
                    @click="handleDislike(post)"
                    class="text-secondary bi bi-hand-thumbs-down-fill"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="35"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.956 14.534c.065.936.952 1.659 1.908 1.42l.261-.065a1.38 1.38 0 0 0 1.012-.965c.22-.816.533-2.512.062-4.51q.205.03.443.051c.713.065 1.669.071 2.516-.211.518-.173.994-.68 1.2-1.272a1.9 1.9 0 0 0-.234-1.734c.058-.118.103-.242.138-.362.077-.27.113-.568.113-.856 0-.29-.036-.586-.113-.857a2 2 0 0 0-.16-.403c.169-.387.107-.82-.003-1.149a3.2 3.2 0 0 0-.488-.9c.054-.153.076-.313.076-.465a1.86 1.86 0 0 0-.253-.912C13.1.757 12.437.28 11.5.28H8c-.605 0-1.07.08-1.466.217a4.8 4.8 0 0 0-.97.485l-.048.029c-.504.308-.999.61-2.068.723C2.682 1.815 2 2.434 2 3.279v4c0 .851.685 1.433 1.357 1.616.849.232 1.574.787 2.132 1.41.56.626.914 1.28 1.039 1.638.199.575.356 1.54.428 2.591"
                    />
                  </svg>
                  <label class="text-md">
                    Likes: {{ post.disLikeCount }}
                  </label>
                </div>
              </div>
              <!-- End Post Like and Dis Like -->

            </div>
          </section>
        </div>

        <!-- Modal Show Event Move Post Contents -->
        <div
          class="modal fade modal-lg"
          id="modalShowMovePostContents"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <label class="text-md text-gray-500 m-1">
                  {{ selectedPostContent }}
                </label>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Report Data Posts Dashboard View -->

      <!-- Data false response posts -->
      <div v-else class="mt-10 text-center text-lg font-medium">
        <p>No posts available</p>
      </div>


  </div>
</template>
<style>
.btn-edit__size {
  width: 50px;
  height: 45px;
}
</style>
