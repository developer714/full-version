<script setup lang="ts">
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import data from "@/views/demos/forms/tables/data-table/datatable";
import type { UserProperties } from "@db/apps/users/types";
import type { membersData } from "@db/pages/datatable/types";
import { computed, onMounted, ref } from "vue";

const searchQuery = ref("");
const selectedRole = ref();
const selectedPlan = ref();
const selectedStatus = ref();

// Data table options
const itemsPerPage = ref(10);
const page = ref(1);
const sortBy = ref();
const orderBy = ref();
const selectedRows = ref([]);

// Update data table options
const updateOptions = (options: any) => {
  sortBy.value = options.sortBy[0]?.key;
  orderBy.value = options.sortBy[0]?.order;
};

const roles = [
  { title: "Admin", value: "admin" },
  { title: "Author", value: "author" },
  { title: "Editor", value: "editor" },
  { title: "Maintainer", value: "maintainer" },
  { title: "Subscriber", value: "subscriber" },
];

const plans = [
  { title: "Basic", value: "basic" },
  { title: "Company", value: "company" },
  { title: "Enterprise", value: "enterprise" },
  { title: "Team", value: "team" },
];

const status = [
  { title: "Pending", value: "pending" },
  { title: "Active", value: "active" },
  { title: "Inactive", value: "inactive" },
];

const editDialog = ref(false);
const deleteDialog = ref(false);

const { data: membersData, execute: fetchMembers } = await useApi<any>(
  "http://18.119.72.52/api/v1/auth/members"
);
const members = computed(() => membersData.value);
const totalMembers = computed(() => membersData.value.length);
console.log(membersData.value);


const searchUser = () => {
  if (searchQuery.value.trim() === "") {
    fetchMembers(); // Fetch original data if search query is empty
  } else {
    const query = searchQuery.value.toLowerCase();
    const filteredMembers = [];
    for (const member of members.value) {
      for (const key in member) {
        if (String(member[key]).toLowerCase().includes(query)) {
          filteredMembers.push(member);
          break;
        }
      }
    }
    membersData.value = filteredMembers;
  }
};

watch(searchQuery, () => {
  searchUser();
});


const defaultItem = ref<membersData>({
  id: 0,
  member_id: 0,
  manager_name: "",
  account_number: "",
  account_holder: "",
  name: "",
  email: "",
  rank: "",
  avatar: "",
  concierge: "",
  recommender_name: "",
  phone: "",
  branch_id: "",
  created_at: "",
  suggestion: "",
  mountains_and_rivers: -1,
  recognition_account: "",
  cumulative_pv: "",
  payment_amount: "",
  circulation_rate: "",
  suspension_of_benefits: "",
  zip_code: "",
  address: "",
  status: -1,
});

const editedItem = ref<membersData>(defaultItem.value);
const editedIndex = ref(-1);
const userList = ref<membersData[]>([]);

// status options
const selectedOptions = [
  { text: "Current", value: 1 },
  { text: "Professional", value: 2 },
  { text: "Rejected", value: 3 },
  { text: "Resigned", value: 4 },
  { text: "Applied", value: 5 },
];

// headers
const headers = [
  { title: "Member Name", key: "memberName" },
  { title: "Member ID", key: "memberId" },
  { title: "Cell Phone", key: "cellPhone" },
  { title: "Rank", key: "rank" },
  { title: "Registration Date", key: "registrationDate" },
  { title: "Concierge", key: "concierge" },
  { title: "Recommender", key: "recommender" },
  { title: "Branch", key: "branch" },
  { title: "Suggestion", key: "suggestion" },
  { title: "Mountain and Rivers", key: "mountainAndRivers" },
  { title: "Cumulative PV", key: "cumulativePV" },
  { title: "Payment Amount", key: "paymentAmount" },
  { title: "Circulation Rate (%)", key: "circulationRate" },
  { title: "Recognition Account", key: "recognitionAccount" },
  { title: "Suspension Of Benefit", key: "suspensionOfBenefit" },
  { title: "Zip Code", key: "zipCode" },
  { title: "Address", key: "address" },
  { title: "Settlement Details", key: "settlementDetails" },
  { title: "Management Organization Chart", key: "managementOrganization" },
  { title: "Recommended Organization Chart", key: "recommendedOrganization" },
  { title: "Modify/Delete", key: "actions", sortable: false },
];

const resolveStatusVariant = (status: number) => {
  switch (status) {
    case 1:
      return { color: "primary", text: "Current" };
    case 2:
      return { color: "success", text: "Professional" };
    case 3:
      return { color: "error", text: "Rejected" };
    case 4:
      return { color: "warning", text: "Resigned" };
    default:
      return { color: "info", text: "Applied" };
  }
};

// 👉 methods
const editItem = (item: membersData) => {
  editedIndex.value = userList.value.indexOf(item);
  editedItem.value = { ...item };
  editDialog.value = true;
};

const deleteItem = (item: membersData) => {
  editedIndex.value = userList.value.indexOf(item);
  editedItem.value = { ...item };
  deleteDialog.value = true;
};

const close = () => {
  editDialog.value = false;
  editedIndex.value = -1;
  editedItem.value = { ...defaultItem.value };
};

const closeDelete = () => {
  deleteDialog.value = false;
  editedIndex.value = -1;
  editedItem.value = { ...defaultItem.value };
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(userList.value[editedIndex.value], editedItem.value);
    console.log("aq123", userList.value[editedIndex.value]);
  } else {
    updateUser(editedItem.value.id, editedItem.value);
  }
  close();
};

const deleteItemConfirm = (id: number) => {
  deleteUser(id);
  closeDelete();
};

onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data));
});

const isAddNewUserDrawerVisible = ref(false);

// 👉 Add new user
const addNewUser = async (userData: UserProperties) => {
  await $api("http://18.119.72.52/api/v1/auth/members", {
    method: "POST",
    body: userData,
  });

  // Refetch User
  fetchMembers();
};

// 👉 Delete user
const deleteUser = async (id: number) => {
  await $api(`http://18.119.72.52/api/v1/auth/members/${id}`, {
    method: "DELETE",
  });

  // refetch User
  fetchMembers();
};

// 👉 Update user
const updateUser = async (id: number, data: any) => {
  console.log("aq123", data);
  await $api(`http://18.119.72.52/api/v1/auth/members/${id}`, {
    method: "PUT",
    body: data,
  });

  // refetch User
  fetchMembers();
};
</script>

<template>
  <section>
    <VCard class="mb-6">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>

      <VCardText>
        <VRow>
          <!-- 👉 Select Role -->
          <VCol cols="12" sm="4">
            <AppSelect
              v-model="selectedRole"
              placeholder="Select Role"
              :items="roles"
              clearable
              clear-icon="bx-x"
            />
          </VCol>
          <!-- 👉 Select Plan -->
          <VCol cols="12" sm="4">
            <AppSelect
              v-model="selectedPlan"
              placeholder="Select Plan"
              :items="plans"
              clearable
              clear-icon="bx-x"
            />
          </VCol>
          <!-- 👉 Select Status -->
          <VCol cols="12" sm="4">
            <AppSelect
              v-model="selectedStatus"
              placeholder="Select Status"
              :items="status"
              clearable
              clear-icon="bx-x"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VDivider />

      <VCardText class="d-flex flex-wrap gap-4">
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <!-- 👉 Search  -->
          <div style="inline-size: 15.625rem;">
            <AppTextField v-model="searchQuery" placeholder="Search User" />
          </div>

          <!-- 👉 Export button -->
          <VBtn variant="tonal" color="secondary" prepend-icon="bx-export">
            Export
          </VBtn>

          <!-- 👉 Add user button -->
          <VBtn
            prepend-icon="bx-plus"
            @click="isAddNewUserDrawerVisible = true"
          >
            Add New User
          </VBtn>
        </div>
      </VCardText>
      <VDivider />
      <!-- 👉 Datatable  -->
      <VDataTable :headers="headers" :items="membersData" :items-per-page="5">
        <!-- full name -->
        <template #item.memberName="{ item }">
          <div class="d-flex align-center">
            <!-- avatar -->
            <VAvatar
              size="32"
              :color="item.avatar ? '' : 'primary'"
              :class="item.avatar ? '' : 'v-avatar-light-bg primary--text'"
              :variant="!item.avatar ? 'tonal' : undefined"
            >
              <VImg v-if="item.avatar" :src="item.avatar" />
              <span v-else>{{ avatarText(item.fullName) }}</span>
            </VAvatar>

            <div class="d-flex flex-column ms-3">
              <RouterLink
                  :to="{ name: 'apps-user-view-id', params: { id: item.id } }"
                  class="font-weight-medium text-link"
                >
              <span
                class="d-block font-weight-medium text-high-emphasis text-truncate"
                >{{ item.name }}</span
              >
            </RouterLink>
              <small>{{ item.rank }}</small>
            </div>
          </div>
        </template>

        <!-- status -->
        <template #item.concierge="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.concierge }}
          </div>
        </template>

        <template #item.memberId="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.member_id }}
          </div>
        </template>

        <template #item.recommender="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.recommender_name }}
          </div>
        </template>

        <template #item.cellPhone="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.phone }}
          </div>
        </template>

        <template #item.branch="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.branch_id }}
          </div>
        </template>

        <!-- Plan -->
        <template #item.plan="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.branch_id }}
          </div>
        </template>

        <template #item.recognitionAccount="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.recognition_account }}
          </div>
        </template>

        <template #item.registrationDate="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ new Date(item.created_at).toLocaleString() }}
          </div>
        </template>

        <template #item.suggestion="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.suggestion }}
          </div>
        </template>

        <template #item.mountainAndRivers="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.mountains_and_rivers }}
          </div>
        </template>

        <template #item.cumulativePV="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.cumulative_pv }}
          </div>
        </template>

        <template #item.paymentAmount="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.payment_amount }}
          </div>
        </template>

        <template #item.circulationRate="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.circulation_rate }}
          </div>
        </template>

        <template #item.suspensionOfBenefit="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.suspension_of_benefits }}
          </div>
        </template>

        <template #item.zipCode="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.zip_code }}
          </div>
        </template>

        <template #item.settlementDetails="{ item }">
          <div class="d-flex gap-1">
            <IconBtn>
              <VIcon icon="bx-show" />
            </IconBtn>
          </div>
        </template>

        <template #item.recommendedOrganization="{ item }">
          <div class="d-flex gap-1">
            <IconBtn>
              <VIcon icon="bx-show" />
            </IconBtn>
          </div>
        </template>

        <template #item.managementOrganization="{ item }">
          <div class="d-flex gap-1">
            <IconBtn>
              <VIcon icon="bx-show" />
            </IconBtn>
          </div>
        </template>

        <template #item.address="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.address }}
          </div>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <div class="d-flex gap-1">
            <IconBtn @click="editItem(item)">
              <VIcon icon="bx-edit" />
            </IconBtn>
            <IconBtn @click="deleteItem(item)">
              <VIcon icon="bx-trash" />
            </IconBtn>
          </div>
        </template>
      </VDataTable>

      <!-- 👉 Edit Dialog  -->
      <VDialog v-model="editDialog" max-width="600px">
        <VCard title="Edit Item">
          <VCardText>
            <div class="text-body-1 mb-6">
              Name: <span class="text-h6">{{ editedItem?.name }}</span>
            </div>
            <VRow>
              <!-- member id -->
              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.member_id"
                  label="Member ID"
                />
              </VCol>
              <!-- fullName -->
              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.name"
                  label="Member Name"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField v-model="editedItem.phone" label="Cell Phone" />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField v-model="editedItem.rank" label="Rank" />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.concierge"
                  label="Concierge"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.created_at"
                  label="Registration Date"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.recommender_name"
                  label="Recommender"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                v-model="editedItem.branch_id" 
                label="Branch" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.suggestion"
                  label="Suggestion"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.mountains_and_rivers"
                  label="Mountain and Rivers"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.cumulative_pv"
                  label="Cumulative PV"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.payment_amount"
                  label="Payment Amount"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.circulation_rate"
                  label="Circulation Rate"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.recognition_account"
                  label="Recognition Account"
                />
              </VCol>


              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.suspension_of_benefits"
                  label="Suspension Of Benefit"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField v-model="editedItem.zip_code" label="Zip Code" />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField v-model="editedItem.address" label="Address" />
              </VCol>
            </VRow>
          </VCardText>

          <VCardText>
            <div class="self-align-end d-flex gap-4 justify-end">
              <VBtn color="error" variant="outlined" @click="close">
                Cancel
              </VBtn>
              <VBtn color="success" variant="elevated" @click="save">
                Save
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VDialog>

      <!-- 👉 Delete Dialog  -->
      <VDialog v-model="deleteDialog" max-width="500px">
        <VCard title="Are you sure you want to delete this item?">
          <VCardText>
            <div class="d-flex justify-center gap-4">
              <VBtn color="error" variant="outlined" @click="closeDelete">
                Cancel
              </VBtn>
              <VBtn
                color="success"
                variant="elevated"
                @click="deleteItemConfirm(editedItem.id)"
              >
                OK
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VDialog>
    </VCard>
    <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
    />
  </section>
</template>
