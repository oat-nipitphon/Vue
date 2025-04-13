<script setup>
import axiosAPI from '@/services/axiosAPI'
import { ref, reactive } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useStoreUserProfile } from '@/stores/user.profile'

const props = defineProps({
  profileID: Number,
})

const open = ref(false)

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
}

const onRemoveContact = index => {
  contacts.splice(index, 1)
}

const onSelectFileIcon = (event, index) => {
  const fils = event.target.files
  if (fils.length > 0) {
    contacts[index].iconFile = Array.from(fils)
    // console.log('on select file icon array', contacts[index].iconFile)
  }
}

const onSaveContactProfile = async (event) => {

  const formData = new FormData()
  formData.append('profileID', props.profileID)
  contacts.forEach((contact, index) => {
    formData.append(`contacts[${index}][name]`, contact.name)
    formData.append(`contacts[${index}][url]`, contact.url)
    if (contact.iconFile.length > 0) {
      formData.append(`contacts[${index}][iconFile]`, contact.iconFile[0])
    }
  })

  const res = await axiosAPI.post('/api/profile/newContacts', formData, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (res.ok) {
    console.log('res ok insert contact true')
  } else {
    console.log('res ok insert contact false')
  }

}

</script>
<template>
  <div>
    <div class="m-auto">
      <button class="btn btn-sm btn-outline-primary" @click="open = true">
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
      </button>
      <TransitionRoot as="template" :show="open">
        <Dialog
          class="fixed inset-0 z-10 flex items-start justify-center mt-20"
          @close="open = false"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-90 bg-white rounded-lg shadow-xl p-6">
              <div class="flex items-center">
                <!-- <div
                  class="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100"
                >
                  <ExclamationTriangleIcon
                    class="size-6 text-red-600"
                    aria-hidden="true"
                  />
                </div> -->
                <div class="">
                  <DialogTitle
                    as="h3"
                    class="text-lg font-semibold text-gray-900"
                  >
                    <div class="grid grid-cols-2">
                      <h5>Add contact profile.</h5>
                      <div class="flex justify-end items-end">
                        <button
                        @click="onAddContact"
                        type="submit"
                        class="m-auto text-md font-bold text-gray-900 hover:underline dark:text-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-plus-circle text-blue-700"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                          />
                          <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                          />
                        </svg>
                      </button>
                      </div>
                    </div>
                  </DialogTitle>
                  <div v-for="(contact, index) in contacts" :key="index" class="bg-gray-200 p-2">
                    <div class="grid grid-cols-2">
                      <!-- <div>
                        <label
                          for="photo"
                          class="block text-sm/6 font-medium text-gray-900"
                          >Photo</label
                        >
                        <div class="mt-2 flex items-center gap-x-3">
                          <UserCircleIcon
                            class="size-12 text-gray-300"
                            aria-hidden="true"
                          />
                          <button
                            type="button"
                            class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                          >
                            Change
                          </button>
                        </div>
                      </div> -->
                      <div class="p-1">
                        <input size="5" type="file" @change="event => onSelectFileIcon(event, index)">
                      </div>
                      <div class="p-1">
                        <input
                          v-model="contact.name"
                          class="form-control"
                          type="text"
                          placeholder="contact name"
                        />
                      </div>
                      <div class="grid grid-cols-[auto_5%]">
                        <div>
                          <input
                            v-model="contact.url"
                            class="form-control"
                            type="text"
                            placeholder="contact url"
                          />
                        </div>
                        <div>
                          <button
                            @click="onRemoveContact(index)"
                            v-if="contacts.length > 1"
                            type="submit"
                            class="btn btn-sm btn-outline-dargen"
                          >
                            remove
                          </button>
                        </div>
                      </div>

                      <!-- <input
                        @change="event => onSelectFileIcon(event, index)"
                        class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                        type="file"
                      /> -->
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-4 flex justify-end space-x-3">
                <button
                  type="submit"
                  class="btn btn-sm btn-primary"
                  @click="onSaveContactProfile"
                >
                  Save
                </button>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="open = false"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>
