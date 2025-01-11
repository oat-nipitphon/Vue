import { defineStore } from 'pinia'

export const useTestCode = defineStore('testCode', {
    state: () => ({
        storeData: null,
        errors: {},
    }),
    actions: {

        async apiStoreUploadImage (formData) {

            try {

                const payload = new FormData();
                payload.append("profile_id", formData.profileID);
                payload.append("file_image", formData.fileImage);

                const response = await fetch(`/api/upload_image`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json()

                console.log(response);

                if (response.ok) {
                    console.log("response store false")
                    // this.storeData = data.message
                } else {
                    console.log("response store false")
                }

            } catch (error) {
                console.error("store error", error);
            }

        },

    }
})