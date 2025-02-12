<script setup>
const defaultProfileImage =
  "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=_8IVpzSUJz8Q7kNvgH981ad&_nc_oc=AdjwNRCxXwtMr0TUQFjkBXTSR68KItzLfOXsS06bglRQ93A4l_N8TKdv4UJtxEVVgHa4BQVpEdDKu6htxiHQdrbk&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AhlEAgeCssMinnIwKJwfgMQ&oh=00_AYBEFNyZ8w4XoptZM9dz2smOltNWG3lclgbLROlVgZYUVg&oe=67B024F1";
import { ref, onMounted, reactive } from "vue";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
DataTable.use(DataTablesCore);

const { adminAPIGETuserProfiles, deleteUserProfile } =
  useAdminUserProfileStore();

const storeAPI = useAdminUserProfileStore();
const userProfiles = ref([]);

onMounted(async () => {
  await storeAPI.adminAPIGETuserProfiles();
  userProfiles.value = storeAPI.storeUserProfiles.map((profile) => ({
    id: profile.id,
    imageProfile: profile.userProfileImage.image_data || null,
    titleName: profile.titleName,
    fullName: profile.fullName,
    nickName: profile.nickName,
    birthDay: formatDate(profile.birthDay),
    telPhone: profile.telPhone,
  }));
});

function formatDate(date) {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const columns = [
  {
    title: "id",
    data: "id",
  },
  {
    title: "image",
    data: "imageProfile",
    render(html) {
      return `
        <img :src="${imageProfile}">
      `;
    }
  },
  {
    title: "fullname",
    data: "id",
    render(html) {
      return `
        <span class='m-auto text-sm'>${titleName}</span>
        <span class='m-auto text-sm'>${fullName}</span>
      `;
    }
  },
  {
    title: "nickName",
    data: "nickName",
  },
  {
    title: "birthDay",
    data: "birthDay",
  },
  {
    title: "telPhone",
    data: "telPhone",
  },
  {
    title: "Event",
    data: "id",
    render(data) {
      return `
              <div class="btn-group dropend">
                <button class="btn btn-primary btn-sm dropdown-toggle dropdown-toggle-split" type="button" 
                data-bs-toggle="dropdown" aria-expanded="false">
                Event
              </button>
          <ul class="dropdown-menu">
            <li>
              <button class="dropdown-item btn btn-sm btn-warning event-edit" data-id="${data}">
                Edit
              </button>
            </li>
            <li>
              <button class="dropdown-item btn btn-sm btn-danger event-delete" data-id="${data}">
                Delete
              </button>
            </li>
          </ul>
        </div>
        `;
    },
  },
];

const option = reactive({
  paging: true,
  searching: true,
  ordering: true,
  response: true,
  drawCallback: function () {
    const table = document.querySelector(".table-report-userprofiles");

    table.addEventListener("click", (event) => {
      console.log(event.target.getAttribute("data-id"));
      let userID = event.target.getAttribute("data-id");

      if (event.target.matches(".event-edit")) {
        console.log("Edit function", userID);
      }

      if (event.target.matches(".event-delete")) {
        console.log("Delete function", userID);
        btnEventDelete(userID);
      }

    });
  },
});

const btnEventDelete = async (userID) => {
  console.log("btnEventDelete ", userID);
  await deleteUserProfile(userID);
};

</script>

<template>
  <div class="container">
    <h2>Report userprofiles.</h2>
    <p>DataTables + Vue3 example + Bootstrap 5</p>

    <DataTable
      :columns="columns"
      :data="userProfiles"
      class="table table-hover table-striped table-report-userprofiles"
      width="100%"
    >
      <thead></thead>
      <tbody></tbody>
      <tfoot></tfoot>
    </DataTable>
  </div>
</template>

<style>
@import "bootstrap";
@import "datatables.net-bs5";
</style>
