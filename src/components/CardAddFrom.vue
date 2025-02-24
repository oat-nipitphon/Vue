<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const contacts = ref([
  {
    userID: '',
    name: '',
    linkAddress: '',
    imageIcon: null,
  },
])

const addContact = () => {
  contacts.value.push({
    userID: '',
    name: '',
    linkAddress: '',
    imageIcon: null,
  })
}

const removeContact = index => {
  contacts.value.splice(index, 1)
}

const onAddContacts = async () => {
  try {
    console.log('form contacts ', contacts.value)
  } catch (error) {
    console.error('on add contacts ', error)
  }
}
</script>
<template>
  <div class="container">
    <h2 class="text-xl font-semibold mb-4">Add Contact</h2>
    <form @submit.prevent="onAddContacts">
      <div
        class="mb-4 p-4 border rounded-lg bg-gray-50"
        v-for="(contact, index) in contacts"
        :key="index"
      >
        <label class="block text-sm font-medium text-gray-700"> Name: </label>
        <input
          v-model="contact.name"
          type="text"
          class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
        <label class="block text-sm font-medium text-gray-700"> Link: </label>
        <input
          v-model="contact.linkAddress"
          type="text"
          class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
        <label class="block text-sm font-medium text-gray-700"> Image: </label>
        <input
          type="file"
          class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          required
        />
        <button
          class="mt-2 text-sm text-red-500 hover:text-red-700"
          type="button"
          v-if="contacts.length > 1"
          @click="removeContact(index)"
        >
          Remove
        </button>
      </div>
      <div class="grid grid-cols-2">
        <div>
          <button
            class="btn btn-sm btn-success"
            @click="addContact"
            type="button"
          >
            + Add
          </button>
        </div>
        <div class="flex justify-end">
          <button
            type="submit"
            class="btn btn-sm btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
