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
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        console.error("Failed to fetch user data. Status:", response.status);
                        return;
                    } 

                    this.storeUser = await response.json()
                    console.log("api auth store", this.storeUser)

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
                    
                    Swal.fire({
                        title: "New Account.",
                        text: "Register account successfully.",
                        icon: "success",
                    }).then(() => {
                        localStorage.setItem('token', data.token);
                        this.storeUser = data.user;
                        this.router.push({ name: 'DashboardView' }); // Use router instance
                    });

                } else {
                    console.error("Registration failed:", response);
                }

            } catch (error) {
                console.error("Error in apiStoreRegister:", error);
            }
        },

        // login
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

        // forget your password
        async apiStoreResetPassword (formData) {
            try {
                const response = await fetch(`/api/forget_your_password`, {
                    method: "POST",
                    body: JSON.stringify(formData)
                })
                const data = await response.json()

                if (response.ok) {

                    Swal.fire({

                        title: "Do you want to log in now?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, log in",
                        cancelButtonText: "No, cancel",

                    }).then((result) => {

                        if (result.isConfirmed) {
                            Swal.fire({
                                title: "Login!",
                                text: "Welcome to the system.",
                                icon: "success",
                            }).then(() => {
                                localStorage.setItem("token", data.token);
                                this.router.push({ name: "DashboardView" });
                            });

                        } else if (result.dismiss === Swal.DismissReason.cancel) {

                            Swal.fire({
                                title: "Reset Password Successful.",
                                icon: "success",  
                            }).then(() => {
                                this.router.push({ name: "HomeView" });
                            });
                        }
                    });

                } else {
                    Swal.fire({
                        title: "Error",
                        text: data.message || "Something went wrong. Please try again.",
                        icon: "error",
                    });
                    console.log("API response error:", response);
                }

            } catch (error) {
                console.error("api store reset password error :: ", error)
            }
        },

    },
    // getters: {
    //     isAuthentication: () => !!state.token,
    // },
})