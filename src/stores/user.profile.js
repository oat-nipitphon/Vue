import { defineStore } from 'pinia'
export const useStoreUserProfile = defineStore('storeUserProfile', {
    state: () => ({
        userProfile: null,
        errors: {},
    }),
    actions: {

        async apiGetAllUserProfile (userProfile) {
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

        async apiUploadImageUserProfile (apiRouter, formData) {
            try {

                const response = await fetch(`/api/user_profiles/${apiRouter}`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(formData)
                })

                if (response.ok) {
                    const data = await response.json()
                    this.userProfile = data.status
                } else {
                    console.log("api user profile store error", data)
                }

            } catch (error) {
                console.error("api upload image user profile store error", error)
            }
        },



    }
})