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
                if (data.error) {
                    console.log("admin api get post data false", data.error);
                } else {
                    console.log("admin api get post data success", data.posts);
                    return data.posts;
                }

            } catch (error) {
                console.error("admin api get post error", error);
            }

        },

    },
});