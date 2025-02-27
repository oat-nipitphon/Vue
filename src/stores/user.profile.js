import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
export const useStoreUserProfile = defineStore('storeUserProfile', {
    state: () => ({
        userProfile: null,
        errors: {},
    }),
    actions: {

        // get status user
        async apiGetStatusUser() {
            try {
                const res = await fetch(`/api/status_user`, {
                    method: "GET",
                });
                const data = await res.json();
                if (res.ok) {
                    return data.userStatus;
                }
  
                
                
            } catch (error) {
                console.error("function status user error", error);
            }
        },

        // Update user
        async apiUpdateUser(formData) {
            try {

                const res = await fetch('/api/update/user', {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData,
                });

                const data = await res.json();

                if (!res.ok) {
                    console.log("store update user false", res);
                }

                console.log("store update user success", res);

            } catch (error) {
                console.error("store update user function error", error);
            }
        },

        // get user profile all
        async apiGetAllUserProfile(userProfile) {
            try {
                const res = await fetch(`/api/user_profiles/${userProfile}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json();
                if (res.ok) {
                    return data.userProfiles;
                } else {
                    console.log("store user profile res false.", res);
                }
            } catch (error) {
                console.error("store user profile error api get all :: ", error);
            }
        },

        async apiGetDashboardProfile (userProfile) {
            try {
                const res = await fetch(`/api/user_profiles/${userProfile}`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                const data = await res.json();
                if (res.ok) {
                    return data.userProfiles;
                } else {
                    console.log("store user profile res false.", res);
                }
            } catch (error) {
                console.error("store user profile error api get all :: ", error);
            }
        },

        // get user profile where profile id
        async apiGETUserProfile(userProfile) {
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

        // Update user profile detail
        async apiUpdateDetailUserProfile(formData) {
            const result = await Swal.fire({
                title: "Confirm update profile!",
                text: "Are you sure you want to update this profile ?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
                cancelButtonText: "Cancel",
            });

            if (result.isConfirmed) {
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
                            title: "Success",
                            content: "update profile successfully.",
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        }).then(() => {
                            this.userProfile = data.user;
                            window.location.reload();
                        })
                    }
                } catch (error) {
                    console.error("store function apiUpdateDetailUserProfile", error)
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.close();
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

    }
})