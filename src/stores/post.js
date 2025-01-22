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
                    cancelButtonText: "Cancel",
                    timer: 1500,
                    timerProgressBar: true,
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
                    cancelButtonText: "Cancel",
                    timer: 1500,
                    timerProgressBar: true,
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

        async apiRecoverGetPost(userID) {
            try {
                const response = await fetch(`/api/posts/report_recover/${userID}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });

                const data = await response.json();

                if (data.error) {
                    console.log("store recover post data error", data.error);
                }

                return data.recoverPosts;


            } catch (error) {
                console.error("store recover get post error", error);
            }
        },

        async apiRecoverPost(postID) {
            try {

                if (postID) {
                    const result = await Swal.fire({
                        title: "Your Recover Post ?",
                        text: "your confirm recover post yes and on",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirm Recover.",
                        cancelButtonText: "Cancel Recover.",
                        timer: 1500,
                        timerProgressBar: true,
                    });

                    if (result.dismiss === Swal.DismissReason.cancel) {

                        console.log("store apiRecoverPost Cancel recover post");

                    } else if (result.isConfirmed) {

                        const response = await fetch(`/api/posts/recover/${postID}`, {
                            method: "POST",
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            },
                        });

                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }


                        Swal.fire({
                            title: "Recover success.",
                            text: "Post recover successfully.",
                            icon: "success",
                            timer: 1200,
                            timerProgressBar: true,
                        }).then(() => {
                            const router = useRouter();
                            Swal.close();
                            // window.location.reload();
                            this.router.push({ name: 'DashboardView' });
                        });

                    } else {
                        console.log("store recover post response false ", response.error);
                    }

                }

            } catch (error) {
                console.error("store recover get post error", error);
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
                    console.log("Like updated successfully:", data.postPopLikeArray);
                } else {
                    console.error("Error updating like:", data.error);
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
                    console.log("Dislike updated successfully:", data.postPopDisLikeArray);
                } else {
                    console.error("Error updating dislike:", data.error);
                }
            } catch (error) {
                console.error("API Dislike Error:", error);
            }
        },
        

    }
})