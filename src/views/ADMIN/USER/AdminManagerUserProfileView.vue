<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { useAdminUserProfileStore } from '@/stores/admin.user.profile'

const { adminAPIGETuserProfiles, adminDeleteUserProfile } =
  useAdminUserProfileStore()

const userProfiles = ref([])

const currentPage = ref(1)
const itemsPerPage = ref(5)

const totalPages = computed(
  () => Math.ceil(userProfiles.value.length / itemsPerPage.value) || 1
)
const paginateduserProfiles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return userProfiles.value.slice(start, end)
})

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const openDropdown = ref(null);

onMounted(async () => {
  userProfiles.value = await adminAPIGETuserProfiles()
  console.log('admin manager user profile', userProfiles.value)
})

const formatBrithDay = brithDay => {
  const birthDate = new Date(brithDay)
  const currentDate = new Date()
  let calculatedAge = currentDate.getFullYear() - birthDate.getFullYear()
  const monthDifference = currentDate.getMonth() - birthDate.getMonth()
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    calculatedAge--
  }
  return calculatedAge
}

const onBlockUser = async (user) => {
  console.log('function onBlockUser', user);
}

const onUnBlockUser = async (user) => {
  console.log('function onUnBlockUser', user);
}

const onEditUser = async (user) => {
  console.log('function onEditUser', user);
}

const onDeleteUser = async id => {
  await adminDeleteUserProfile(id)
  userProfiles.value = await adminAPIGETuserProfiles();
  console.log('admin manager user profile', userProfiles.value);
}

</script>

<template>
  <div class="container">
    <div class="bg-white shadow-lg rounded-sm m-auto p-5">
      <table>
        <thead>
          <tr>
            <td>counter</td>
            <td>status</td>
            <td>image</td>
            <td>profile detail</td>
            <td>actions</td>
          </tr>
        </thead>
        <tbody v-if="paginateduserProfiles.length > 0">
          <tr v-for="(row, index) in paginateduserProfiles" :key="index">
            <td>{{ index }}</td>
            <td>
              <div class="grid grid-rows-2">
                <div>
                  {{ row?.userLogin?.status_login }}
                </div>
                <div>
                  {{ row?.userStatus?.status_name }}
                </div>
              </div>
            </td>
            <td>
              <div v-for="image in row.userImage" :key="image.id">
                <img v-if="image.imageData !== ''" :src="'data:image/png;base64,' + image.imageData"
                  class="p-2 m-auto w-[] h-[] rounded-md" alt="ImageProfile">
                <img v-else
                  src="https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=W43rsD5HTdEQ7kNvwGsdEla&_nc_oc=AdlQZixMX_Zzpg244HT_KKTCYwvNOvIZl06zbojTEx1DmbCORkCKfIjTlhIn3Q82JmcpChv-_CoVGeK8e8yHs1sD&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=uPedcGpzSvHYKPHaoD1Neg&oh=00_AfHDaHGddih3i4__IEmsKZjQ5VTPo_Rxh1p5IesQSazQ2Q&oe=6811B3F1"
                  alt="">
              </div>
            </td>
            <td>
              <div class="grid grid-rows-4">
                <div class="grid grid-cols-2">
                  <p>email</p>
                  <p>{{ row?.email }}</p>
                </div>
                <div class="grid grid-cols-2">
                  <p>name</p>
                  <p>{{ row?.userProfile?.full_name }}</p>
                </div>
                <div class="grid grid-cols-2">
                  <p>tel</p>
                  <p>{{ row?.userProfile?.tel_phone }}</p>
                </div>
                <div class="grid grid-cols-2">
                  <p>Birth Day</p>
                  <p>{{ formatBrithDay(row?.userProfile?.birth_day) }}</p>
                </div>
              </div>
            </td>
            <td>
              <div class="relative inline-block text-left">
                <button @click="openDropdown = row.id"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs">
                  Actions
                </button>

                <!-- Dropdown Menu -->
                <div v-if="openDropdown === row.id" @click.outside="openDropdown = null"
                  class="absolute z-10 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul class="py-1 text-sm text-gray-700">
                    <li>
                      <button @click="onBlockUser(row)" class="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Block
                      </button>
                    </li>
                    <li>
                      <button @click="onUnBlockUser(row)" class="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Unblock
                      </button>
                    </li>
                    <li>
                      <button data-bs-toggle="modal" data-bs-target="#modalEditReward" @click="onEditUser(row)"
                        class="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Edit
                      </button>
                    </li>
                    <li>
                      <button @click="onDeleteUser(row)"
                        class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </td>

          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="flrx justify-center">
              <p class="text-1xl font-bold">user profile data false</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="grid grid-cols-2 mt-5">
      <div class="flex justify-center">
        <button class="btn btn-md btn-outline-primary" @click="nextPage">Next</button>
      </div>
      <div class="flex justify-center">
        <button class="btn btn-md btn-outline-primary" @click="prevPage">Back</button>
      </div>
    </div>
  </div>
</template>