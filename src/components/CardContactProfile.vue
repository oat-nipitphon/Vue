<script setup>
import { reactive, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStoreUserProfile } from '@/stores/user.profile'
import axiosAPI from '@/services/axiosAPI'
const { apiGetContactProfile } = useStoreUserProfile()

const props = defineProps({
  profileID: Number,
  contact: Object,
})
console.log('card contact profile', props)

const contacts = reactive([
  {
    name: '',
    url: '',
    iconFile: [],
  },
])

const onAddContact = () => {
  contacts.push({
    name: '',
    url: '',
    iconFile: [],
  })
  console.log('on add contact ', contacts)
}

const onRemoveContact = index => {
  contacts.splice(index, 1)
}

const onSelectFileIcon = (event, index) => {
  const fils = event.target.files
  console.log('on select file icon ', fils)
  if (fils.length > 0) {
    contacts[index].iconFile = Array.from(fils)
    console.log('on select file icon array', contacts[index].iconFile)
  }
}

const onSaveContactProfile = async (event) => {
  console.log('on save contact profile ', contacts)

  const formData = new FormData()

  formData.append('profileID', props.profileID)

  contacts.forEach((contact, index) => {
    formData.append(`contacts[${index}][name]`, contact.name)
    formData.append(`contacts[${index}][url]`, contact.url)

    if (contact.iconFile.length > 0) {
      formData.append(`contacts[${index}][iconFile]`, contact.iconFile[0])
    }
    console.log('on save contact profile for each', contact)
  })

  try {

    const response = await axiosAPI.post(`/api/profile/contacts`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    
    if (!response.ok) {
      console.log('Failed to save.', response)
      event.preventDefault();
    }
    
    window.location.reload();

  } catch (error) {
    console.error('on save contact profile function error', error)
  }
}

</script>
<template>
  <div
    class="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 dark:bg-gray-800 dark:border-gray-700"
  >
    <h5
      class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white"
    >
      Connect
    </h5>
    <p class="text-sm font-normal text-gray-500 dark:text-gray-400"></p>
    <ul class="my-4" v-for="(contact, index) in props.contact" :key="index">
      <li
        class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
      >
        <div class="grid grid-cols-3">
          <a :href="contact.url">
            <div>{{ contact.icon_data }}</div>
            <div>{{ contact.name }}</div>
          </a>
        </div>
      </li>
    </ul>
    <div class="flex justify-end">
      <ul class="my-4" v-for="(contact, index) in contacts" :key="index">
        <li
          class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
          <div class="grid grid-rows-4">
            <div class="flex justify-center">
              <input
                type="file"
                @change="event => onSelectFileIcon(event, index)"
                class="form-control"
              />
            </div>
            <div>
              <label class="text-md font-bold text-gray-900">
                contact name:
              </label>
              <input type="text" v-model="contact.name" class="form-control" />
            </div>
            <div>
              <label class="text-md font-bold text-gray-900">
                contact url:
              </label>
              <input type="text" v-model="contact.url" class="form-control" />
            </div>
            <div class="flex jsutify-center mt-5 m-auto">
              <button
                v-if="contacts.length > 1"
                @click="onRemoveContact(index)"
                type="submit"
                class="btn btn-sm btn-outline-dargen"
              >
                remove
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div
      class="flex justify-center mt-5 w-40 m-auto shadow-md rounded-md bg-sky-600"
    >
      <button
        @click="onAddContact"
        type="submit"
        class="inline-flex text-md font-bold text-gray-900 hover:underline dark:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
          />
        </svg>
        <label class="ml-2 mr-2">add contact</label>
      </button>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="btn btn-sm btn-primary"
        @click="onSaveContactProfile"
      >
        save
      </button>
    </div>
  </div>
</template>
