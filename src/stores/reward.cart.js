import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axiosAPI from '@/services/axiosAPI'

export const useRewardCartStore = defineStore('rewardCart', () => {
    
    const carts = ref([])
    const errors = ref({})
    const counterItems = ref([])


    const addToCart = (reward) => {
        const existingItem = carts.value.find((item) => item.id === reward.id)
        if (!existingItem) {
            
            counterItems.value.push({
                rewardID: reward.id,  
                rewardName: reward.name,
                rewardPoint: reward.point,
                rewardAmount: reward.amount
            })

            carts.value.push({ ...reward, amount: 1 })
        } else {
            existingItem.amount += 1
        }
    }

    const totalPoint = computed(() => carts.value.reduce((total, item) => total + item.point * item.amount, 0))
    
    // const cartItemCounter = computed(() => carts.value.reduce((total, item) => total + item.amount, 0))
    const cartItemCounters = computed(() => {
        return carts.value.reduce((total, item) => total += item.amount, 0)
    })

    const removeItemCard = (rewardId) => {
        carts.value = carts.value.filter((item) => item.id !== rewardId)
    }

    const resetCart = () => {
        carts.value = []
    }


    const userConfirmCartItems = async () => {
        const res = await fetch()
    }


    return {

        addToCart,
        removeItemCard,
        resetCart,

        counterItems,
        cartItemCounters,
        totalPoint,

    }

})