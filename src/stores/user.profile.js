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

        async apiUploadImageUserProfile(formData) {
            try {

                const response = await fetch(`/api/user_profile/upload_image`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData
                });

                // const data = await response.json();

                if (response.ok) {

                    Swal.fire({
                        title: "Upload Image success.",
                        icon: "success"
                    }).then(() => {
                        Swal.close();
                        window.location.reload();
                        return response.userProfileImage;
                    });

                } else {
                    console.log("res error", response.error);
                }
                

            } catch (error) {
                console.error("store user profile upload image profile error :: ");
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

                        console.log("detail update :: ", data.user)
                        this.userProfile = data.user
                        window.location.reload()
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