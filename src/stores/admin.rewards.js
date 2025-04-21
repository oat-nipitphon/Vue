import { defineStore } from "pinia";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";

export const useAdminRewardStore = defineStore('adminRewardStore', {
    state: () => ({
        storeRewards: null,
        errors: {}
    }),
    actions: {  

        async storeAdminAPIGetRewards () {
            try {
                const res = await fetch('/api/admin/rewards/manager', {
                    method: "GET",
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
        
                const data = await res.json();
        
                if (res.ok) {
                    this.storeRewards = data.rewards;
                } else {
                    console.log('storeAdminAPIGetRewards api get data false', data);
                }
            } catch (error) {
                console.error('storeAdminAPIGetRewards function error', error);
            }
        }

    }
})