import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
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
                
                if (res.ok) {
                    const data = await res.json()
                    return data.posts
                }
                
            } catch (error) {
                console.error("store function api get posts error", error)
            }
        },

        async apiGetPostTypes () {
            try {
                const res = await fetch(`/api/post_types`, {
                    method: "GET"
                })
                const data = await res.json()
                if (res.ok) {
                    console.log("store function api get post type success", data.post_types)
                    return data.post_types;
                }
                console.log("data post type false", res.data)
            } catch (error) {
                console.error("store function api get post type error", error)
            }
        },

        async apiCreatePostNew (formData) {
            try {
                const res = await fetch(`/api/posts`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(formData)
                });
                const data = await res.json();
                if (res.ok) {

                    console.log("store function success.", res.data);
                    this.storePosts = data.post;
                    this.router.push({ name: 'DashboardView' });
                }
                console.log("store function api create post new success");
            } catch (error) {
                console.error("store function api create post new error", error)
            }
        },

    }
})