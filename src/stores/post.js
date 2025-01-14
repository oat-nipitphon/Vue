import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        storePost: null,
        errors: {}
    }),
    actions: {

        async apiGetPost(post) {
            try {

                const res = await fetch(`/api/posts/${post}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await res.json();

                if (!data.ok) {
                    console.log("store get post response false :", res.data);
                }

                return data.post;

            } catch (error) {
                console.error("store get post error :", error);
            }
        },

        async apiGetPosts() {
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

        async apiGetPostTypes() {
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

        async apiCreatePostNew(formData) {
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

                    console.log("store function success.", data.createPostNew);
                    this.storePost = data.createPostNew;
                    this.router.push({ name: 'DashboardView' });
                }
                console.log("store function api create post new success");
            } catch (error) {
                console.error("store function api create post new error", error)
            }
        },



        async apiEditPost(formData) {
            try {
                const res = await fetch(`/api/posts/${formData.postID}`, {
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(formData)
                })

                const result = await Swal.fire({
                    title: "Edit Success.",
                    text: "update post successfully.",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm delete",
                    cancelButtonText: "Cancel"
                });

                if (res.ok && result.isConfirmed) {
                    const data = await res.json();

                        console.log("store edit post error", res.data);
                        this.storePost = data.post;
                        this.router.push({ name: 'DashboardView' });
       

                } else if (res.ok && result.dismiss === Swal.DismissReason.cancel) {
                    console.log("store edit post error");

                } else {
                    this.errors = data.errors;
                }
            } catch (error) {
                console.error("store api edit post error :", error);
            }
        },

        async apiDeletePost(id) {
            try {
                const res = await fetch(`/api/posts/${id}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const result = await Swal.fire({
                    title: "Confirm Delete!",
                    text: "Are you sure you want to delete this post?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm delete",
                    cancelButtonText: "Cancel"
                });

                if (res.ok && result.isConfirmed) {
                    const data = await res.json();
                    console.log("store delete post successfully.");
                    Swal.fire({
                        title: "Delete Post.",
                        icon: "success"
                    }).then(() => {
                        this.storePost = data.post;
                        window.location.reload();
                    });
                } else if (res.ok && result.dismiss === Swal.DismissReason.cancel) {
                    Swal.close()
                } else {
                    this.errors = data.errors;
                }

            } catch (error) {
                console.error("store apiDeletePost error", error);
            }
        },

    }
})