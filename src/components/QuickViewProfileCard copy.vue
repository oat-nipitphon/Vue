<script setup>
import { ref } from 'vue'
import { TransitionRoot } from '@headlessui/vue'

const props = defineProps({
  imageProfile: String,
})

const open = ref(false)
const isFollowing = ref(false)
const isLiked = ref(false)

const toggleShowQuickView = () => {
  open.value = !open.value
}

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
}

const toggleLike = () => {
  isLiked.value = !isLiked.value
}
</script>

<template>
  <div>
    <div>
      <img @click="toggleShowQuickView" :src="props.imageProfile"
        class="size-12 rounded-full cursor-pointer hover:opacity-80 transition" />
    </div>

    <TransitionRoot as="template" :show="open">
      <div
        class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
        <!-- Profile Content -->
        <div class="flex flex-col items-center pb-10 px-4 pt-4">
          <img class="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
            :src="props.imageProfile || '../assets/icon/icon-user-default.png'" alt="User image" />
          <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Bonnie Green
          </h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Visual Designer
          </span>

          <!-- Buttons -->
          <div class="flex mt-4 md:mt-6 gap-2">
            <button @click="toggleFollow"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg"
              :class="isFollowing ? 'bg-gray-600 hover:bg-gray-700' : 'bg-blue-700 hover:bg-blue-800'">
              {{ isFollowing ? 'Following' : 'Follow' }}
            </button>

            <button @click="toggleLike" class="inline-flex items-center px-4 py-2 text-sm font-medium border rounded-lg"
              :class="isLiked
                ? 'bg-pink-600 text-white border-pink-600 hover:bg-pink-700'
                : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-100'">
              <svg v-if="isLiked" class="w-4 h-4 mr-2 fill-current" viewBox="0 0 20 20">
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {{ isLiked ? 'Liked' : 'Like' }}
            </button>
          </div>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>
