import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        storeUser: null,
        errors: {},
    }),
    actions: {

        async apiGetUserStatus () {
            try {
                const res = await fetch(`/api/status_user`, {
                  method: 'GET',
                })
            
                const data = await res.json()
                if (res.ok) {
                    console.log('store auth get user status', data.userStatus);
                  return data.userStatus
                }
              } catch (error) {
                console.error('register view get status user error', error)
              }
        },

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

            const result = await Swal.fire({
                title: "ยืนยันข้อมูล",
                text: "คุณต้องการลงทะเบียนใช่หรือไม่?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
            });

            if (!result.isConfirmed) {
                console.log('!isConfirmd');
                result.dismiss === Swal.DismissReason.cancel
            }

            const response = await fetch(`/api/${apiRouter}`, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 201) {
                Swal.fire({
                    title: "ลงทะเบียนสำเร็จ",
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    // localStorage.setItem('token', data.token);
                    // this.storeUser = data.user;
                    // this.router.push({ name: 'DashboardView' });
                    // const router = useRouter();
                    this.router.push({
                        name: 'HomeView'
                    });
                });
            } else if (response.status === 500) {
                Swal.fire({
                    title: "ข้อมูลผิดพลาด",
                    text: `สถานะ 500 <br>` + data,
                });
            } else {
                Swal.fire({
                    title: "ข้อมูลผิดพลาด",
                    text: data,
                });
            }
        },

        // login
        async apiStoreLogin(apiRouter, form) {
            try {
                const res = await fetch(`/api/${apiRouter}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });

                const data = await res.json();

                if (data.status === 200) {

                    localStorage.setItem('token', data.token);

                    Swal.fire({
                        title: "สำเร็จ",
                        text: "ลงชื่อเข้าใช้งานระบบสำเร็จ",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1200,
                        timerProgressBar: true,
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