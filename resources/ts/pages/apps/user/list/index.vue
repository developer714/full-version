<script setup lang="ts">
import AddNewUserDrawer from "@/views/apps/user/list/AddNewUserDrawer.vue";
import data from "@/views/demos/forms/tables/data-table/datatable";
import type { UserProperties } from "@db/apps/users/types";
import type { membersData } from "@db/pages/datatable/types";
import { computed, onMounted, ref, watch } from "vue";
import { VCol, VRow } from "vuetify/components";

// Search state
const searchQuery = ref("");
const searchCriteria = ref("");
const searchValue = ref("");
const startDate = ref("");
const endDate = ref("");
const selectedRank = ref("");
const selectedSuspension = ref("");
const selectedCirculationRate = ref("");

// Dialog state
const editDialog = ref(false);
const deleteDialog = ref(false);
const isAddNewUserDrawerVisible = ref(false);

// Data state
const editedIndex = ref(-1);
const userList = ref<membersData[]>([]);

// API data
const { data: membersData, execute: fetchMembers } = await useApi<any>(
  "http://18.119.72.52/api/v1/auth/members"
);
const members = computed(() => membersData.value);

// Constants
const periodOptions = ["Registration Date"];
const periodQuickSelectOptions = [
  { label: "A week", value: "week" },
  { label: "15 Days", value: "15days" }, 
  { label: "1 Month", value: "1month" },
];

const searchOptions = {
  memberId: [
    { name: "Member ID", value: "member_id" },
    { name: "Member Name", value: "name" },
    { name: "Branch", value: "branch_id" },
    { name: "Recommender", value: "recommender_name" },
    { name: "Concierge", value: "concierge" }
  ],
  rank: [
    "Associate Member",
    "Full Member", 
    "Advertiser",
    "Exaggeration",
    "Team Leader",
    "Senior Team Leader",
    "Headquarters Manager",
  ],
  suspension: ["Normal", "Stop"],
  circulationRate: ["400%", "500%"],
  selectedPeriodType: ["Registration Date"]
};

const defaultItem = ref<membersData>({
  id: 0,
  no: 0,
  member_id: 0,
  manager_name: "",
  account_number: "",
  account_holder: "",
  name: "",
  email: "",
  rank: "",
  image: "",
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

// Table headers
const headers = [
  { title: "No", key: "count", sortable: true },
  { title: "Member Name", key: "memberName", sortable: true },
  { title: "Member ID", key: "memberId", sortable: true },
  { title: "Cell Phone", key: "cellPhone", sortable: true },
  { title: "Rank", key: "rank", sortable: true },
  { title: "Registration Date", key: "registrationDate", sortable: true },
  { title: "Concierge", key: "concierge", sortable: true },
  { title: "Recommender", key: "recommender", sortable: true },
  { title: "Branch", key: "branch", sortable: true },
  { title: "Suggestion", key: "suggestion", sortable: true },
  { title: "Mountain and Rivers", key: "mountainAndRivers", sortable: true },
  { title: "Cumulative PV", key: "cumulativePV", sortable: true },
  { title: "Payment Amount", key: "paymentAmount", sortable: true },
  { title: "Circulation Rate (%)", key: "circulationRate", sortable: true },
  { title: "Recognition Account", key: "recognitionAccount", sortable: true },
  { title: "Suspension Of Benefit", key: "suspensionOfBenefit", sortable: true },
  { title: "Zip Code", key: "zipCode", sortable: true },
  { title: "Address", key: "address", sortable: true },
  { title: "Settlement Details", key: "settlementDetails" },
  { title: "Management Organization Chart", key: "managementOrganization" },
  { title: "Recommended Organization Chart", key: "recommendedOrganization" },
  { title: "Modify/Delete", key: "actions", sortable: false },
];

// Methods
const searchUser = () => {
  let filteredMembers = members.value;

  // Search by Period
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    filteredMembers = filteredMembers.filter((member: membersData) => {
      const registrationDate = new Date(member.created_at);
      return registrationDate >= start && registrationDate <= end;
    });
  }

  // Search by Detail
  if (searchCriteria.value && searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    const criteria = searchOptions.memberId.find(option => option.name === searchCriteria.value)?.value as keyof membersData;
    filteredMembers = filteredMembers.filter((member: membersData) => {
      const memberValue = String(member[criteria]).toLowerCase();
      return memberValue.includes(query);
    });
  }

  // Other Searches
  if (selectedRank.value || selectedSuspension.value || selectedCirculationRate.value) {
    filteredMembers = filteredMembers.filter((member: membersData) => {
      const matchesRank = !selectedRank.value || member.rank === selectedRank.value;
      const matchesSuspension = !selectedSuspension.value || member.suspension_of_benefits === selectedSuspension.value;
      const matchesCirculationRate = !selectedCirculationRate.value || member.circulation_rate === selectedCirculationRate.value;
      return matchesRank && matchesSuspension && matchesCirculationRate;
    });
  }

  membersData.value = filteredMembers;
};

const setQuickSelectPeriod = (period: string) => {
  const today = new Date();
  let startDateValue = new Date();

  switch (period) {
    case "week":
      startDateValue.setDate(today.getDate() - 7);
      break;
    case "15days":
      startDateValue.setDate(today.getDate() - 15);
      break;
    case "1month":
      startDateValue.setMonth(today.getMonth() - 1);
      break;
    default:
      return;
  }

  startDate.value = startDateValue.toISOString().split("T")[0];
  endDate.value = today.toISOString().split("T")[0];
};

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
  resetEditedItem();
};

const closeDelete = () => {
  deleteDialog.value = false;
  resetEditedItem();
};

const resetEditedItem = () => {
  editedIndex.value = -1;
  editedItem.value = { ...defaultItem.value };
};

const save = () => {
  if (editedIndex.value > -1) {
    Object.assign(userList.value[editedIndex.value], editedItem.value);
  } else {
    updateUser(editedItem.value.id, editedItem.value);
  }
  close();
};

const deleteItemConfirm = (id: number) => {
  deleteUser(id);
  closeDelete();
};

// API Methods
const addNewUser = async (userData: UserProperties) => {
  await $api("http://18.119.72.52/api/v1/auth/members", {
    method: "POST",
    body: userData,
  });
  fetchMembers();
};

const deleteUser = async (id: number) => {
  await $api(`http://18.119.72.52/api/v1/auth/members/${id}`, {
    method: "DELETE",
  });
  fetchMembers();
};

const updateUser = async (id: number, data: any) => {
  await $api(`http://18.119.72.52/api/v1/auth/members/${id}`, {
    method: "PUT",
    body: data,
  });
  fetchMembers();
};

// Watchers
watch([searchCriteria, searchValue], searchUser);

// Lifecycle
onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data));
  userList.value.forEach((item, index) => {
    item.no = index + 1;
  });
});
</script>

<template>
  <section>
    <VCard class="mb-6">
      <VCardItem class="pb-4">
        <VCardTitle>Filters</VCardTitle>
      </VCardItem>
      <VCardText>
        <VRow cols="12" sm="12" class="mb-4 align-center">
          <VCol cols="12" sm="2" class="ml-2">
            <label for="search-period" class="font-weight-bold mb-2">Search by period</label>
          </VCol>
          <VCol cols="12" sm="2">
            <AppSelect
              v-model="searchOptions.selectedPeriodType"
              placeholder="Select period type"
              :items="periodOptions"
              clearable
              clear-icon="bx-x"
            />
          </VCol>
          <VCol cols="12" sm="2">
            <VTextField
              v-model="startDate"
              type="date"
              outlined
              dense
            />
          </VCol>
          <VCol cols="12" sm="2">
            <VTextField
              v-model="endDate"
              type="date"
              outlined
              dense
            />
          </VCol>
          <VCol cols="12" sm="3">
            <VBtn
              v-for="option in periodQuickSelectOptions"
              :key="option.value"
              @click="setQuickSelectPeriod(option.value)"
              text
              class="mx-1"
            >
              {{ option.label }}
            </VBtn>
          </VCol>
        </VRow>

        <VCol>
          <VRow cols="12" sm="12" class="mb-4 align-center">
            <VCol cols="12" sm="2">
              <label for="search-detail" class="font-weight-bold mb-2">Search by Detail</label>
            </VCol>
            <VCol cols="12" sm="3">
              <AppSelect
                v-model="searchCriteria"
                placeholder="Search by Detail"
                :items="searchOptions.memberId.map(option => option.name)"
                clearable
                clear-icon="bx-x"
              />
            </VCol>
            <VCol cols="12" sm="7">
              <AppTextField
                v-model="searchQuery"
                placeholder="Enter search term"
                outlined
                dense
              />
            </VCol>
          </VRow>
          <VRow cols="12" sm="12" class="mb-4 mt-2 align-center">
            <VCol cols="12" sm="2">
              <label for="other-service" class="font-weight-bold mb-2">Other Searches</label>
            </VCol>
            <VCol cols="12" sm="3">
              <AppSelect
                v-model="selectedRank"
                placeholder="Member Rank"
                :items="searchOptions.rank"
                clearable
                clear-icon="bx-x"
              />
            </VCol>
            <VCol cols="12" sm="3">
              <AppSelect
                v-model="selectedSuspension"
                placeholder="Suspension Level"
                :items="searchOptions.suspension"
                clearable
                clear-icon="bx-x"
              />
            </VCol>
            <VCol cols="12" sm="3">
              <AppSelect
                v-model="selectedCirculationRate"
                placeholder="Circulation Status"
                :items="searchOptions.circulationRate"
                clearable
                clear-icon="bx-x"
              />
            </VCol>
          </VRow>
        </VCol>
        <VDivider />        
      </VCardText>

      <VCardText class="d-flex flex-wrap gap-4">
        <VSpacer />

        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
          <VBtn
            prepend-icon="bx-search"
            @click="searchUser" 
            class="mt-2 align-center"
            position="right"
          >
            Search
          </VBtn>

          <VBtn variant="tonal" color="secondary" prepend-icon="bx-export">
            Export
          </VBtn>

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
      <VDataTable
        :headers="headers"
        :items="membersData"
        :items-per-page="5"
        show-select
        item-value="name"
      >
        <template #item.no="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.no }}
          </div>
        </template>

        <template #item.memberName="{ item }">
          <div class="d-flex align-center">
            <VAvatar
              size="32"
              :color="item.image ? '' : 'primary'"
              :class="item.image ? '' : 'v-avatar-light-bg primary--text'"
              :variant="!item.image ? 'tonal' : undefined"
            >
              <VImg v-if="item.image" :src="item.image" />
              <span v-else>{{ avatarText(item.fullName) }}</span>
            </VAvatar>

            <div class="d-flex flex-column ms-3">
              <RouterLink
                :to="{ name: 'apps-user-view-id', params: { id: item.id } }"
                class="font-weight-medium text-link"
              >
                <span class="d-block font-weight-medium text-high-emphasis text-truncate">
                  {{ item.name }}
                </span>
              </RouterLink>
              <small>{{ item.rank }}</small>
            </div>
          </div>
        </template>

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
              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.member_id"
                  label="Member ID"
                />
              </VCol>
              <VCol cols="12" sm="6">
                <AppTextField v-model="editedItem.name" label="Member Name" />
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
                <AppTextField v-model="editedItem.branch_id" label="Branch" />
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
