import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        reqUser: null,
        errors: {},
    }),
    actions: {

        async apiStoreUsers () {
            const response = await fetch(`/api/users_test_api`, {
                method: "GET"
            })
            const data = await response.json()
            return data.users
        },

        async apiStoreRegister () {
            try {
                const response = await fetch(`/api/users`, {
                    method: "POST",
                    body: JSON.stringify()
                })
                const data = await response.json()
                if (response.ok) {
                    Swal.fire({
                        title: "New Account.",
                        content: "Register account successfully.",
                        icon: "success"
                    }).then((result) => {
                        const router = useRouter()
                        this.router.push({ name: 'LoginView' })
                    })
                } else {

                }
            } 
            catch (error) {
                console.error(error)
            }
        },

    }
})