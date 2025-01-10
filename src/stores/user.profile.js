import { defineStore } from 'pinia'
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
                    console.log("store user profile response success.", data.userProfile)
                    return data.userProfile
                } else {
                    console.log("store user profile response false.", response)
                }
            } catch (error) {
                console.error("store user profile error api get all :: ", error)
            }
        },

        async apiGetStatusUser () {
            try {
                const response = await fetch(`/api/status_user`, {
                  method: "GET",
                });
                if (!response.ok) {
                  statusUser.value = null;
                }
                const data = await response.json();
                console.log("status user ", data.status_user);
                return data.status_user;
              } catch (error) {
                console.error("function status user error", error);
              }
        },

        async apiUploadImageUserProfile(payload) {
            try {

                const response = await fetch(`/api/user_profiles/upload_image_profile`, {
                    method: "PUT",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: payload
                })

                const data = await response.json()
                if (response.ok) {
                    this.userProfile = data
                } else {
                    console.log("api user profile store error", data)
                }

            } catch (error) {
                console.error("api upload image user profile store error", error)
            }
        },

        async apiUpdateDetailUserProfile (formData) {
            try {

                

            } catch (error) {
                console.error("api update detail user profile error: ", error)
            }
        },

    }
})