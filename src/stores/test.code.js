import { defineStore } from 'pinia'

export const useTestCode = defineStore('testCode', {
    state: () => ({
        dataStore: null,
        errors: {},
    }),
    actions: {

        async uploadImageStore (data) {

            try {
                const res = await fetch(`/api/test_code/upload_image`, data, {
                    method: "POST",
                    headers: {
                        enctype: "multipart/form-data"
                    }
                });

                const data = await res.json();

                if (res.ok) {
                    console.log("res ok :: ");
                } else {
                    console.log("res false :: ");
                }

            } catch (error) {
                console.error("store error", error);
            }

        },

    }
})