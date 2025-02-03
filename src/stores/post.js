import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const usePostStore = defineStore('postStore', {
    state: () => ({
        storePost: null,
        errors: {}
    }),
    actions: {

        async apiGetPosts() {
            try {
                const res = await fetch(`/api/posts`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await res.json();
                console.log("post store response ", res.posts);
                if (res.ok) {
                    return data.posts;
                } else {
                    console.log("store api get posts false", data.error);
                }

            } catch (error) {
                console.error("store function api get posts error", error)
            }
        },

        async apiGetPost(post) {
            try {
                const res = await fetch(`/api/posts/${post}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const data = await res.json();

                if (res.ok) {
                    return data.post;
                } else {
                    console.log("store get post response false :", data.error);
                }

            } catch (error) {
                console.error("store get post error :", error);
            }
        },

        async apiGetPostTypes() {
            try {
                const res = await fetch(`/api/post_types`, {
                    method: "GET"
                })

                const data = await res.json()
                
                if (res.ok) {
                    return data.post_types;
                } else {
                    console.log("data post type false", data.error)
                }

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
                if (data.ok) {
                    this.storePost = data.createPostNew;
                    this.router.push({ name: 'DashboardView' });
                } else {
                    console.log("store function api create post new success", data.error);
                }
            } catch (error) {
                console.error("store function api create post new error", error)
            }
        },

        async apiEditPost(formData) {
            try {

                const result = await Swal.fire({
                    title: "Confirm Edit !",
                    text: "Are you sure you want to edit this post?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                });

                if (result.isConfirmed) {

                    const res = await fetch(`/api/posts/${formData.postID}`, {
                        method: "PUT",
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(formData)
                    })

                    const data = await res.json();

                    if (data.ok) {
                        Swal.fire({
                            title: "Success.",
                            text: "Edit post successfully.",
                            icon: "success"
                        }).then(() => {
                            this.router.push({ name: 'DashboardView' });
                        });

                    } else {
                        console.log("store edit post res false ", data.error);
                    }

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.close();
                } else {
                    Swal.fire({
                        title: "Edit Post Error",
                        text: res.error,
                        icon: "error"
                    }).then(() => {
                        console.log("store response error", res);
                    });
                }
            } catch (error) {
                console.error("store api edit post error :", error);
            }
        },

        async apiDeletePost(id) {
            try {

                const result = await Swal.fire({
                    title: "Confirm Delete!",
                    text: "Are you sure you want to delete this post?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm delete",
                    cancelButtonText: "Cancel",
                });

                if (result.isConfirmed) {

                    const res = await fetch(`/api/posts/${id}`, {
                        method: "DELETE",
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    const data = await res.json();

                    if (res.ok) {
                        Swal.fire({
                            title: "Confirm",
                            text: "delete post successfully.",
                            icon: "success"
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        console.error("store delete post res error ", data.error);
                    }

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.close()
                } else {
                    console.log("store delete post res data false");
                }

            } catch (error) {
                console.error("store apiDeletePost error", error);
            }
        },

        async apiPostPopLike(userID, postID, popStatusLike) {
            try {
                const response = await fetch(`/api/posts/popularity/${userID}/${postID}/${popStatusLike}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("Like updated successfully");
                } else {
                    console.error("Error updating like", data.error);
                }
            } catch (error) {
                console.error("API Like Error:", error);
            }
        },

        async apiPostPopDisLike(userID, postID, popStatusDisLike) {
            try {
                const response = await fetch(`/api/posts/popularity/${userID}/${postID}/${popStatusDisLike}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    console.log("Dislike updated successfully.");
                } else {
                    console.error("Error updating dislike", data.error);
                }
            } catch (error) {
                console.error("API Dislike Error:", error);
            }
        },
    }
})