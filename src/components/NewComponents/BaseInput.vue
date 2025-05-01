<!-- components/BaseInput.vue -->
<template>
    <div>
      <div class="flex items-center justify-between">
        <label :for="id" class="block text-sm/6 font-medium text-gray-900">
          {{ label }}
        </label>
      </div>
      <div class="mt-2">
        <input
          :type="type"
          :name="name"
          :id="id"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: String,
    label: {
      type: String,
      default: 'Input',
    },
    type: {
      type: String,
      default: 'text',
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    autocomplete: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  })
  
  defineEmits(['update:modelValue'])
  </script>
  