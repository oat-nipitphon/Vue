import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosAPI from '@/services/axiosAPI'

export const useRewardCartStore = defineStore('rewardCart', () => {
    
    const carts = ref([])
    const errors = ref({})


    const totalItems = computed(() => carts.value.reduce((total, item) => total + item.quantity, 0))
    console.log("total items ", totalItems);

    const totalPrice = computed(() => carts.value.reduce((total, item) => total + item.point * item.quantity, 0))
    console.log("total price ", totalPrice);

    const addToCart = (reward) => {

        console.log("addToCart reward :: ", reward);

        const existingItem = carts.value.find((item) => item.id === reward.id)
        console.log(" existingItem :: ", existingItem);

        if (existingItem) {
            console.log(" if existingItem.quantity += 1 :: ", existingItem.quantity += 1);
            existingItem.quantity += 1
        } else {
            carts.value.push({ ...reward, quantity: 1 })
        }

    }

    const removeItemCard = (rewardId) => {
        carts.value = carts.value.filter((item) => item.id !== rewardId)
    }

    const clearCard = () => {
        carts.value = []
    }

    const cartItemCounter = computed(() => {
        console.log("function cart item counter ", carts.value.reduce((total, item) => total + item.quantity, 0));
        return carts.value.reduce((total, item) => total + item.quantity, 0)
    })
    

    return {

        addToCart,
        removeItemCard,
        clearCard,
        cartItemCounter,
        totalItems,
        totalPrice,

    }

    // Check Amount Reward
    // const rewardAmount = ref([])
    // const totalAmount = computed(() => carts.value.reduce((total, item) => total + item.quantity - this.amount))
    // const apiGetRewardAmount = async () => {
    //     try {

    //         const res = await axiosAPI.get('/api/get_rewards_amounts');

    //     } catch (error) {
    //         console.error("store api get reard amount function error", error)
    //     }
    // }

})