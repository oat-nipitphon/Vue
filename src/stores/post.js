import { defineStore } from 'pinia'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        storePosts: null,
        errors: {}
    }),
    actions: {

        async apiGetPosts () {
            try {   
                const res = await fetch(`/api/posts`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json()
                if (data.error) {
                    console.log("api get post data store error", data.error)
                }
                return data.posts
            } catch (error) {
                console.error("api get post store error", error)
            }
        }

    }
})