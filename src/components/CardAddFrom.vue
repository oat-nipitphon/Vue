<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

console.log('auth store user', authStore.storeUser.user_login.userProfile.id)
const reportContacts = ref([])
const contacts = ref([
  {
    userID: '',
    profileID: '',
    name: '',
    url: '',
    imageIcon: [],
  },
])

const addContact = () => {
  contacts.value.push({
    userID: '',
    profileID: '',
    name: '',
    url: '',
    imageIcon: [],
  })
}

// const onSelectFileIcon = (event) => {
//   const file = event.target.files[0];

//   if (file) {
//     contacts.value[0].imageIcon = file
//   }
//   console.log("file image icon", contacts.value[0].imageIcon.forEach((contact, index) => {
//     contact.value[index].imageIcon;
//   }));
// }

const onSelectFileIcon = (event, index) => {
  const files = event.target.files

  // ตรวจสอบว่า index นี้มีอยู่ใน contacts.value หรือไม่
  if (!contacts.value[index]) {
    console.error(`Invalid index: ${index}, contacts.value:`, contacts.value)
    return
  }

  if (files.length > 0) {
    contacts.value[index].imageIcon = Array.from(files) // แปลงเป็นอาร์เรย์
  }

  console.log('Updated Contacts:', contacts.value)
}

const onAddContacts = async () => {
  try {
    console.log('form contacts ', contacts.value)

    const formData = new FormData()
    formData.append('userID', authStore.storeUser.user_login.id)
    formData.append('profileID', authStore.storeUser.user_login.userProfile.id)
    contacts.value.forEach((contact, index) => {
      formData.append(`contacts[${index}][name]`, contact.name)
      formData.append(`contacts[${index}][url]`, contact.url)

      if (contacts.value[0].imageIcon) {
        formData.append(`contacts[${index}][imageIcon]`, contact.imageIcon[0])
      }
    })

    const res = await axiosAPI.post(`/api/newContacts`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    if (res.status === 200) {
      console.log('new contact success', res.data)

      // อัปเดตรายการ Contact ใหม่
      reportContacts.value = await getContacts()

      // เคลียร์ข้อมูลในฟอร์ม
      contacts.value = [
        {
          userID: '',
          profileID: '',
          name: '',
          url: '',
          imageIcon: [],
        },
      ]
    } else {
      console.log('new contact false', res)
    }
  } catch (error) {
    console.error('on add contacts ', error)
  }
}

const removeContact = index => {
  contacts.value.splice(index, 1)
}

const getContacts = async () => {
  const res = await axiosAPI.get('/api/testContact', {
    headers: {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  console.log('response', res.data.user)

  reportContacts.value = res.data.user
  console.log('report contacts', reportContacts.value)
}

onMounted(async () => {
  await getContacts()
})
</script>
<template>
  <div class="container">
    <div class="p-5 bg-green-300">
      <h2 class="text-xl font-semibold mb-4">Add Contact</h2>
      <form @submit.prevent="onAddContacts">
        <div
          class="mb-4 p-4 border rounded-lg bg-gray-50"
          v-for="(contact, index) in contacts"
          :key="index"
        >
          <label class="block text-sm font-medium text-gray-700"> Name: </label>
          <input
            id="contactName"
            v-model="contact.name"
            type="text"
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <label class="block text-sm font-medium text-gray-700"> Link: </label>
          <input
            id="contactUrl"
            v-model="contact.url"
            type="text"
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          <label class="block text-sm font-medium text-gray-700">
            Image:
          </label>
          <!-- <input
            @change="onSelectFileIcon"
            type="file"
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
            required
          /> -->
          <input
            id="contactIcon"
            type="file"
            multiple
            @change="event => onSelectFileIcon(event, index)"
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
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
            <button type="submit" class="btn btn-sm btn-primary">Save</button>
          </div>
        </div>
      </form>
    </div>

    <div class="bg-red-200 p-5">
      <!-- ตรวจสอบว่ามีข้อมูลหรือไม่ -->
      <div class="flex flex-col items-center" v-if="reportContacts.length > 0">
        <!-- วนลูป Users -->
        <div
          v-for="(user, userIndex) in reportContacts"
          :key="userIndex"
          class="w-full p-4 border-b bg-white shadow-md"
        >
          <h2 class="font-bold text-lg bg-red-500 text-white p-2">
            👤 User: {{ user.name }}
          </h2>

          <!-- Contacts อยู่ในแนวเดียวกัน (Flexbox) -->
          <div
            v-if="user.profileContacts.length > 0"
            class="flex flex-wrap gap-4 mt-3"
          >
            <div
              v-for="(contact, index) in user.profileContacts"
              :key="index"
              class="p-3 bg-gray-100 rounded-lg shadow"
            >
              <p class="font-semibold">{{ contact.name }}</p>
              <a
                :href="contact.url"
                target="_blank"
                class="text-blue-500 underline"
                >{{ contact.url }}</a
              >
              <p v-if="contact.icon">
                <img
                  :src="'data:image/png;base64,' + contact.icon"
                  class="size-5 rounded-lg"
                  alt="IconContact"
                />
              </p>
              <p v-else>
                <img
                  src="../assets/icon/keyboard.jpg"
                  class="size-5 rounded-lg"
                  alt="IconContact"
                />
              </p>
            </div>
          </div>

          <p v-else class="text-gray-500 mt-3">No Contacts Found</p>
        </div>
      </div>

      <p v-else class="text-center text-red-500">No Users Found</p>
    </div>
  </div>
</template>
