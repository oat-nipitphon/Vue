<script setup>
const props = defineProps({
    rewardUpdate: Object,
})
</script>
<template>
    <!-- modal edit reward -->
    <div class="modal fade" id="modalEditReward" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">update reward ID :: {{ rewardUpdate.id }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <!-- form update reward -->
                    <div class="grid">
                        <label for="">name</label>
                        <input type="text" v-model="formUpdate.name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <label for="">point</label>
                        <input type="text" v-model="formUpdate.point"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <label for="">amount</label>
                        <input type="text" v-model="formUpdate.amount"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-sm btn-primary m-2" @click="onUpdateReward()">
                        update
                    </button>
                    <button type="button" class="btn btn-sm btn-dargen m-2" data-bs-dismiss="modal">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>