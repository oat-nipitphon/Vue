<template>
    <div class="flex m-auto p-3 rounded-lg shadow-lg">
      <table class="min-w-full bg-white m-auto">
        <thead class="bg-gray-400">
          <tr>
            <th
              class="px-4 py-2 text-left text-sm font-semibold text-gray-700"
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(row, index) in data" :key="index">
            <td class="text-center">{{ row.id }}</td>
  
            <td>
              <button
                class="text-blue-500 hover:text-blue-700"
                @click="$emit('showPost', row.postObj)"
              >
                {{ row.title }}
              </button>
            </td>
  
            <td>
              <button
                class="text-blue-500 hover:text-blue-700"
                @click="$emit('showUser', row.postObj.user.user_profile)"
              >
                {{ row.creator }}
              </button>
            </td>
  
            <td class="text-center">
              <p
                :class="{
                  'text-green-500 font-semibold': row.status === 'Active',
                  'text-red-600 font-semibold': row.status !== 'Active'
                }"
              >
                {{ row.status }}
              </p>
            </td>
  
            <td class="text-center">
              <div class="dropdown m-auto relative inline-block">
                <button
                  class="btn btn-sm btn-event mt-2 bg-gray-300 px-2 py-1 rounded"
                  @click="toggleDropdown(index)"
                >
                  Event
                </button>
                <ul
                  v-show="openDropdownIndex === index"
                  class="absolute z-10 mt-1 bg-white border rounded shadow"
                >
                  <li>
                    <button
                      v-if="row.postObj.block_status === 'false'"
                      @click="$emit('blockPost', row.postObj.id, 'Block')"
                      class="dropdown-item px-4 py-2 text-left w-full hover:bg-gray-100"
                    >
                      🔒 Block
                    </button>
                    <button
                      v-if="row.postObj.block_status === 'true'"
                      @click="$emit('blockPost', row.postObj.id, 'Unblock')"
                      class="dropdown-item px-4 py-2 text-left w-full hover:bg-gray-100"
                    >
                      ✅ Unblock
                    </button>
                  </li>
                  <li>
                    <button
                      @click="$emit('deletePost', row.postObj.id)"
                      class="dropdown-item px-4 py-2 text-left w-full hover:bg-red-100 text-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="!data.length"
      class="text-center py-4 text-gray-400 text-sm"
    >
      No data available.
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // 🔧 ประกาศ props
  const props = defineProps({
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  });
  
  // ✅ ประกาศ emits ทั้งหมดที่ใช้
  const emit = defineEmits(['showPost', 'showUser', 'blockPost', 'deletePost']);
  
  // 🔁 dropdown control
  const openDropdownIndex = ref(null);
  function toggleDropdown(index) {
    openDropdownIndex.value = openDropdownIndex.value === index ? null : index;
  }
  </script>
  
  