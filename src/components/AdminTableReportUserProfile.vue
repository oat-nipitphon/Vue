<script setup>
import { ref, onMounted, reactive } from "vue";
import { useAdminUserProfileStore } from "@/stores/admin.user.profile";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";

DataTable.use(DataTablesCore);
const defaultProfileImage =
  "https://scontent.fkkc3-1.fna.fbcdn.net/v/t39.30808-6/461897536_3707658799483986_794048670785055411_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHVG0UH5FgwbVkdtl70b39it0I862Qbciu3QjzrZBtyK4PmJExwkjQwGNMpc0Sbm9HeXRE2Yi7Fvc_GrvrUrXJN&_nc_ohc=_8IVpzSUJz8Q7kNvgH981ad&_nc_oc=AdjwNRCxXwtMr0TUQFjkBXTSR68KItzLfOXsS06bglRQ93A4l_N8TKdv4UJtxEVVgHa4BQVpEdDKu6htxiHQdrbk&_nc_zt=23&_nc_ht=scontent.fkkc3-1.fna&_nc_gid=AhlEAgeCssMinnIwKJwfgMQ&oh=00_AYBEFNyZ8w4XoptZM9dz2smOltNWG3lclgbLROlVgZYUVg&oe=67B024F1";

const { adminAPIGETuserProfiles, deleteUserProfile } =
  useAdminUserProfileStore();
const storeAPI = useAdminUserProfileStore();
const userProfiles = ref([]);



onMounted(async () => {
  await storeAPI.adminAPIGETuserProfiles();
  userProfiles.value = storeAPI.storeUserProfiles.map((profile) => ({
    id: profile.id,
    imageProfile: profile.userProfileImage?.image_data || defaultProfileImage,
    titleName: profile.userProfile.title_name || "",
    fullName: profile.userProfile.full_name || "",
    nickName: profile.userProfile.nick_name || "",
    birthDay: formatDate(profile.userProfile.birth_day) || "",
    telPhone: profile.userProfile.tel_phone || "",
  }));
});

function formatDate(date) {
  if (!date) return "N/A";
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

const columns = [
  { title: "ID", data: "id" },
  {
    title: "Image",
    data: "imageProfile",
    render: (data) =>
      `<img src="${data}" class="rounded-circle" width="50" height="50">`,
  },
  {
    title: "Full Name",
    data: null,
    render: (data) =>
      `<span class='text-sm'>${data.titleName} ${data.fullName}</span>`,
  },
  { title: "Nickname", data: "nickName" },
  { title: "Birth Date", data: "birthDay" },
  { title: "Phone", data: "telPhone" },
  {
    title: "Actions",
    data: "id",
    render: (data) => `
      <div class="btn-group dropend">
        <button class="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Event
        </button>
        <ul class="dropdown-menu">
          <li><button class="dropdown-item event-edit" data-id="${data}">Edit</button></li>
          <li><button class="dropdown-item event-delete text-danger" data-id="${data}">Delete</button></li>
        </ul>
      </div>
    `,
  },
];

const option = reactive({
  paging: true,
  searching: true,
  ordering: true,
  responsive: true,
  drawCallback: function () {
    document
      .querySelector(".table-report-userprofiles")
      .removeEventListener("click", handleTableClick);
    document
      .querySelector(".table-report-userprofiles")
      .addEventListener("click", handleTableClick);
  },
});

function handleTableClick(event) {
  const userID = event.target.getAttribute("data-id");
  if (!userID) return;

  if (event.target.matches(".event-edit")) {
    console.log("Edit function", userID);
  } else if (event.target.matches(".event-delete")) {
    console.log("Delete function", userID);
    btnEventDelete(userID);
  }
}

const btnEventDelete = async (userID) => {
  console.log("Deleting user:", userID);
  await deleteUserProfile(userID);
};
</script>

<template>
  <div class="container">
    <h2>Report User Profiles</h2>
    <p>DataTables + Vue3 Example + Bootstrap 5</p>

    <DataTable
      :columns="columns"
      :data="userProfiles"
      :options="option"
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

img {
  object-fit: cover;
}
</style>
