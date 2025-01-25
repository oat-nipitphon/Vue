import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

export const useAdminUserProfileStore = defineStore("adminUserProfileStore", {
    state: () => ({
        userProfiles: null,
        errors: {}
    }),
    actions: {

        async adminAPIGETuserProfile () {
            try {
                const res = await fetch(`/api/admin/userProfiles/manager`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });

                const data = await res.json();

                if (!data.error) {
                    return data.userProfiles;
                } else {
                    console.log("store get user profile false :: ", data.error);
                }

            } catch (error) {
                console.error("store admin user profile error :: ", error);
            }
        },

    },
});