<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axiosAPI from '@/services/axiosAPI'

const props = defineProps({
    rewardShow: Object,
})


</script>
<template>
    <!-- modal edit reward -->
    <div class="modal fade" id="modalAdminRewardModalShow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Reward ID :{{ rewardShow.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="flex justify-center">
                        <p
                        v-for="(image, index) in props.rewardShow.rewardImage" :key="index"    
                        >
                        <img :src="image.image_data" class="w-[150px] h-[150px] object-cover rounded-lg m-auto" alt="Reward Image" >
                    </p>
                    </div>
                    <div class="flex justify-center">
                        <div class="grid grid-cols-2">
                            <p class="block mb-2 mt-2 text-2xl font-medium text-gray-900">
                               Name :: 
                            </p>
                            <p class="block mb-2 mt-2 text-2xl font-medium text-gray-900">
                                {{ rewardShow.name }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 p-1">
                        <div class="grid grid-cols-2">
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                               Point 
                            </p>
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                                {{ rewardShow.point }}
                            </p>
                        </div>
                        <div class="grid grid-cols-2">
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                                Amount
                            </p>
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                                {{ rewardShow.point }}
                            </p>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 p-1">
                        <div class="grid grid-cols-2">
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                                Type
                            </p>
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                                {{ rewardShow.type }}
                            </p>
                        </div>
                        <div class="grid grid-cols-2">
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                               Status 
                            </p>
                            <p class="block mb-2 mt-2 text-1xl font-medium text-gray-900">
                                {{ rewardShow.status }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-end">
                    <button type="button" class="btn btn-sm btn-dargen m-2" data-bs-dismiss="modal">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>