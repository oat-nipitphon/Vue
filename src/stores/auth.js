import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        storeUser: null,
        errors: {},
    }),
    actions: {

        // call token auth login router index vue 
        async apiAuthStore() {
            try {

                const token = localStorage.getItem('token');
                if (token) {
                    const response = await fetch(`/api/user`, {
                        method: "GET", // Add the method
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        this.storeUser = await response.json()
                    } else {
                        console.error("Failed to fetch user data")
                    }

                } else {
                    console.log("No token found.")
                }

            } catch (error) {
                console.error("Error in apiAuthStore:", error)
            }
        },

        // register
        async apiStoreRegister(apiRouter, formData) {
            try {

                const response = await fetch(`/api/${apiRouter}`, {
                    method: "POST",
                    body: JSON.stringify(formData),
                });

                if (response.ok) {

                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    this.storeUser = data.user;

                    Swal.fire({
                        title: "New Account.",
                        text: "Register account successfully.",
                        icon: "success",
                    }).then(() => {
                        this.router.push({ name: 'DashboardView' }); // Use router instance
                    });

                } else {
                    console.error("Registration failed:", response);
                }

            } catch (error) {
                console.error("Error in apiStoreRegister:", error);
            }
        },

        async apiStoreLogin(apiRouter, formData) {
            try {

                const response = await fetch(`/api/${apiRouter}`, {
                    method: "POST",
                    body: JSON.stringify(formData)
                })

                if (!response.ok) {
                    Swal.fire({
                        title: "Login Error !!",
                        text: "You login false check input request align!",
                        icon: "error"
                    }).then(() => {
                        Swal.close
                    })
                } else {

                    const data = await response.json()
                    localStorage.setItem('token', data.token)
                    Swal.fire({
                        title: "Login success.",
                        text: "You login successfully welcome to my world!",
                        icon: "success"
                    }).then(() => {
                        Swal.close
                        this.router.push({ name: 'DashboardView' })
                    })

                }

            } catch (error) {
                console.log("api store login function error :: ", error)
            }
        },

        // logout
        async apiStoreLogout() {
            try {

                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('token false.')
                    return
                }

                const response = await fetch(`/api/logout`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if (response.ok) {

                    this.storeUser = null
                    this.errors = {}
                    localStorage.removeItem('token')
                    Swal.fire({
                        title: "Logout success.",
                        text: "You logout successfully bye bye bye!",
                        icon: "success"
                    }).then(() => {
                        this.router.push({ name: 'HomeView' })
                    })

                } else {

                    console.log("api store logout response false :: ", response)

                }

            } catch (error) {

                console.error("api store logout function error :: ", error)

            }
        },

        // get all user data
        async apiStoreUsers() {
            try {

                const response = await fetch(`/api/users_test_api`, {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if (response.ok) {

                    const data = await response.json()
                    this.storeUser = data.users

                } else {

                    console.log("api store users response false ", response)

                }

            } catch (error) {

                console.error("api store function error :", error)

            }
        },

    }
})