<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { usePostStore } from '@/stores/post'

const route = useRoute()
const { apiGetPost } = usePostStore()
const post = ref(null)

onMounted(async () => {
    post.value = await apiGetPost(route.params.id)
    console.log("edit post view :: ", post.value)
})

</script>
<template>
    <div v-if="post">
        <h1>Edit Post {{ post.post_title }}</h1>
    </div>
</template>