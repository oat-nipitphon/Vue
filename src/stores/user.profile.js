import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
export const useStoreUserProfile = defineStore('storeUserProfile', {
    state: () => ({
        userProfile: null,
        errors: {},
    }),
    actions: {

        async apiGetAllUserProfile(userProfile) {
            try {
                const response = await fetch(`/api/user_profiles/${userProfile}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    return data.userProfile
                } else {
                    console.log("store user profile response false.", response)
                }
            } catch (error) {
                console.error("store user profile error api get all :: ", error)
            }
        },

        async apiGetStatusUser() {
            try {
                const response = await fetch(`/api/status_user`, {
                    method: "GET",
                });
                if (!response.ok) {
                    statusUser.value = null;
                }
                const data = await response.json();
                return data.status_user;
            } catch (error) {
                console.error("function status user error", error);
            }
        },

        async apiUploadImageUserProfile(formDataImage) {
            try {
                const response = await fetch(`/api/user_profile/upload_image_profile`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "multipart/form-data",
                    },
                    body: JSON.stringify(formDataImage)
                });

                const data = await response.json();
                if (response.ok) {
                    console.log("store api upload image profile success", data.userProfileImage);
                } else {
                    console.error("store api upload image profile error", data.message);
                }
            } catch (error) {
                console.error("api upload image user profile store error", error);
            }
        },

        async apiUpdateDetailUserProfile(formData) {
            try {

                const response = await fetch(`/api/user_profiles`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(formData)
                })

                if (response.ok) {

                    const data = await response.json()


                    Swal.fire({
                        title: "Update Success.",
                        content: "update user profile successfully.",
                        icon: "success"
                    }).then(() => {

                        window.location.reload()
                        this.userProfile = data.user
                    })

                } else {
                    console.log("api store response false :: ", response)
                }

            } catch (error) {
                console.error("api store function error :: ", error)
            }
        },

    }
})