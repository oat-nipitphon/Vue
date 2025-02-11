import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        storeUser: null,
        errors: {},
    }),
    actions: {

        async apiAuthStore() {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const res = await fetch(`/api/user`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "multipart/form-data",
                            authorization: `Bearer ${token}`
                        },
                    });
                    if (res.ok) {
                        this.storeUser = await res.json();
                    }
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                });
            }
        },

        async apiStoreRegister(apiRouter, formData) {
            const res = await fetch(`/api/${apiRouter}`, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                Swal.fire({
                    title: "Success",
                    text: "Register account successfully.",
                    icon: "success",
                    timer: 1200,
                }).then(() => {
                    localStorage.setItem('token', data.token);
                    this.storeUser = data.user;
                    this.router.push({ name: 'DashboardView' });
                });
            }
        },

        // login
        async apiStoreLogin(apiRouter, formData) {
            try {
                const res = await fetch(`/api/${apiRouter}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();

                if (res.status === 200) {

                    localStorage.setItem('token', data.token);

                    Swal.fire({
                        title: "Login success.",
                        text: "You login successfully, welcome to my world!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                    }).then(() => {
                        if (data.user.status_id === 1) {
                            this.router.push({ name: 'AdminDashboardView' });
                        } else {
                            this.router.push({ name: 'DashboardView' });
                        }
                    });
                } else {
                    Swal.fire({
                        title: "Login failed.",
                        text: "Incorrect system access information!",
                        icon: "error",
                        confirmButtonText: "Try Again",
                        cancelButtonText: "Cancel"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.close;
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                });
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
                const result = await Swal.fire({
                    title: "Confirm Logout",
                    text: "Do you want to confirm logout ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel"
                });

                if (result.isConfirmed) {

                    const res = await fetch(`/api/logout`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "multipart/form-data",
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })

                    if (res.status === 200) {

                        this.storeUser = null;
                        this.errors = {};
                        localStorage.removeItem('token')

                        Swal.fire({
                            title: "Logout success.",
                            text: "You logout successfully bye bye bye!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500,
                        }).then(() => {
                            this.router.push({ name: 'HomeView' })
                        })
                    }
                }

            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                });
            }
        },

        // get all user data
        async apiStoreUsers() {
            try {
                const res = await fetch(`/api/users_test_api`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    this.storeUser = data.users
                } else {
                    console.log("api store users res false ", res)
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                });
            }
        },

        // forget your password
        async apiStoreResetPassword(formData) {
            try {
                const res = await fetch(`/api/forget_your_password`, {
                    method: "POST",
                    body: JSON.stringify(formData)
                })
                const data = await res.json()

                if (res.ok) {

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
                                timer: 1200,
                                timerProgressBar: true,
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
                    console.log("API res error:", res);
                }

            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error,
                    icon: "error",
                });
            }
        },

    },
})