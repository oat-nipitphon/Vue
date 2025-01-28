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
                const res = await fetch(`/api/user_profiles/${userProfile}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json()
                if (res.ok) {
                    return data.userProfile
                } else {
                    console.log("store user profile res false.", res)
                }
            } catch (error) {
                console.error("store user profile error api get all :: ", error)
            }
        },

        async apiGETUserProfile (userProfile) {
            try {
                const res = await fetch(`/api/user_profiles/${userProfile}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                });

                if (res.ok) {
                    const data = await res.json();
                    return data.userProfile;
                } else {
                    console.log("store get user profile repsonse error");
                }

            } catch (error) {
                console.error("store api get user profile error ", error);
            }
        },

        async apiGetStatusUser() {
            try {
                const res = await fetch(`/api/status_user`, {
                    method: "GET",
                });
                if (!res.ok) {
                    statusUser.value = null;
                }
                const data = await res.json();
                return data.status_user;
            } catch (error) {
                console.error("function status user error", error);
            }
        },

        // Upload image user profile
        async apiUploadImageUserProfile(formData) {
            try {

                const res = await fetch(`/api/user_profile/upload_image`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "multipart/form-data"
                    },
                    body: formData
                });

                // const data = await res.json();

                if (res.ok) {

                    Swal.fire({
                        title: "Upload Image success.",
                        icon: "success",
                        timer: 1200,
                        timerProgressBar: true,
                    }).then(() => {
                        Swal.close();
                        window.location.reload();
                        return res.userProfileImage;
                    });

                } else {
                    console.log("res error", res.error);
                }
                

            } catch (error) {
                console.error("store user profile upload image profile error :: ");
            }
        },

        async apiUpdateDetailUserProfile(formData) {
            try {

                const res = await fetch(`/api/user_profiles`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(formData)
                })

                if (res.ok) {

                    const data = await res.json()


                    Swal.fire({
                        title: "Update Success.",
                        content: "update user profile successfully.",
                        icon: "success",
                        timer: 1200,
                        timerProgressBar: true,
                    }).then(() => {

                        console.log("detail update :: ", data.user)
                        this.userProfile = data.user
                        window.location.reload()
                    })

                } else {
                    console.log("api store res false :: ", res)
                }

            } catch (error) {
                console.error("api store function error :: ", error)
            }
        },

    }
})