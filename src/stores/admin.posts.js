import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export const useAdminPostStore = defineStore("adminPostStore", {
    state: () => ({
        posts: null,
        errors: {}
    }),
    actions: {

        async adminAPIGETposts () {

            try {

                const res = await fetch(`/api/admin/posts/manager`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });
                const data = await res.json();
                if (res.ok) {
                    return data.posts;
                } else {
                    console.log("admin api get post data false", data.error);
                }

            } catch (error) {
                console.error("admin api get post error", error);
            }

        },

        async adminAPIPostDelete () {
            try {
                const res = await fetch(``);
            } catch (error) {
                console.error("store admin post function error", error);
            }
        },

        async adminAPIPostBlockOrUnBlock (postID, blockStatus) {
            try {
                const res = await fetch(`/api/posts/blockOrUnBlock/${postID}/${blockStatus}`, {
                    method: "",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const result = await Swal.fire({
                    
                });

            } catch (error) {
                console.error("store admin post function error", error);
            }
        },

    },
});