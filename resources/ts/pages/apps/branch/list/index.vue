<script setup lang="ts">
import type { BranchData } from "@/views/apps/user/list/AddNewBranchDrawer.vue";
import AddNewBranchDrawer from "@/views/apps/user/list/AddNewBranchDrawer.vue"; // Fixed typo in import name
import data from "@/views/demos/forms/tables/data-table/datatable";
import type { branchData } from "@db/pages/datatable/types";
import { computed, onMounted, ref, watch } from "vue";

// Search state
const searchQuery = ref("");
const searchCriteria = ref("");
const startDate = ref("");
const endDate = ref("");

// Constants
const API_BASE_URL = "http://18.119.72.52/api/v1/auth";

const SEARCH_OPTIONS = {
  memberId: [
    { name: "Branch ID", value: "branch_id" },
    { name: "Branch Name", value: "branch_name" },
    { name: "Branch Manager", value: "branch_manager" },
    { name: "Phone Number", value: "phone_number" },
    { name: "Cell Phone", value: "cell_phone" }
  ],
  selectedPeriodType: ["Registration Date"]
} as const;

const PERIOD_OPTIONS = ["Registration Date"] as const;

const PERIOD_QUICK_SELECT_OPTIONS = [
  { label: "A week", value: "week", days: 7 },
  { label: "15 Days", value: "15days", days: 15 }, 
  { label: "1 Month", value: "1month", days: 30 }
] as const;

// Dialog state
const editDialog = ref(false);
const deleteDialog = ref(false);
const isAddNewBranchDrawerVisible = ref(false);

// Data fetching
const { data: branchData, execute: fetchMembers } = await useApi<any>(
  `${API_BASE_URL}/members`
);

const members = computed(() => branchData.value);

// Default branch item
const defaultItem = ref<branchData>({
  id: 0,
  branch_id: "",
  branch_name: "",
  numberOfMembers: "",
  branchManager: "",
  cellPhone: "",
  phoneNumber: "",
  faxNumber: "",
  accountNumber: "",
  created_at: "",
  bankName: "",
  accountHolder: "",
  recommender: "",
  memo: ""
});

const editedItem = ref<branchData>({ ...defaultItem.value });
const editedIndex = ref(-1);
const userList = ref<branchData[]>([]);

// Table headers
const headers = [
  { title: "Count", key: "count" },
  { title: "Branch ID", key: "branchId" },
  { title: "Branch Name", key: "branchName" },
  { title: "Number of Members (actual/accumulated/recognition)", key: "numberOfMembers" },
  { title: "Branch Manager", key: "branchManager" },
  { title: "Cell Phone", key: "cellPhone" },
  { title: "Phone Number", key: "phoneNumber" },
  { title: "Fax Number", key: "faxNumber" },
  { title: "Account Number", key: "accountNumber" },
  { title: "Deposit/Withdrawal History", key: "depositWithdrawalHistory" },
  { title: "List of Affiliated Members", key: "affiliatedMembers" },
  { title: "Drop Out/Other Areas", key: "dropOutOtherAreas" },
  { title: "Modify/Delete", key: "actions", sortable: false }
];

// Methods
const setQuickSelectPeriod = (period: string) => {
  const today = new Date();
  const option = PERIOD_QUICK_SELECT_OPTIONS.find(opt => opt.value === period);
  
  if (!option) return;

  const startDateValue = new Date(today);
  startDateValue.setDate(today.getDate() - option.days);
  
  startDate.value = startDateValue.toISOString().split("T")[0];
  endDate.value = today.toISOString().split("T")[0];
};

const searchUser = () => {
  let filteredMembers = members.value;

  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    
    filteredMembers = filteredMembers.filter((member: branchData) => {
      const registrationDate = new Date(member.created_at);
      return registrationDate >= start && registrationDate <= end;
    });
  }

  if (searchCriteria.value && searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    const criteria = SEARCH_OPTIONS.memberId.find(
      option => option.name === searchCriteria.value
    )?.value;

    if (criteria) {
      filteredMembers = filteredMembers.filter((member: branchData) => {
        const memberValue = String(member[criteria as keyof branchData]).toLowerCase();
        return memberValue.includes(query);
      });
    }
  }

  branchData.value = filteredMembers;
};

const editItem = (item: branchData) => {
  editedIndex.value = userList.value.indexOf(item);
  editedItem.value = { ...item };
  editDialog.value = true;
};

const deleteItem = (item: branchData) => {
  editedIndex.value = userList.value.indexOf(item);
  editedItem.value = { ...item };
  deleteDialog.value = true;
};

const resetEditedItem = () => {
  editedItem.value = { ...defaultItem.value };
  editedIndex.value = -1;
};

const close = () => {
  editDialog.value = false;
  resetEditedItem();
};

const closeDelete = () => {
  deleteDialog.value = false;
  resetEditedItem();
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

// API calls
const addNewBranch = async (branchData: BranchData) => {
  await $api(`${API_BASE_URL}/members`, {
    method: "POST",
    body: branchData,
  });
  fetchMembers();
};

const deleteUser = async (id: number) => {
  await $api(`${API_BASE_URL}/members/${id}`, {
    method: "DELETE",
  });
  fetchMembers();
};

const updateUser = async (id: number, data: any) => {
  await $api(`${API_BASE_URL}/members/${id}`, {
    method: "PUT",
    body: data,
  });
  fetchMembers();
};

// Watchers
watch([searchCriteria, searchQuery], searchUser);

// Lifecycle
onMounted(() => {
  userList.value = JSON.parse(JSON.stringify(data));
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
              v-model="SEARCH_OPTIONS.selectedPeriodType"
              placeholder="Select period type"
              :items="PERIOD_OPTIONS"
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
              v-for="option in PERIOD_QUICK_SELECT_OPTIONS"
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
                :items="SEARCH_OPTIONS.memberId.map(option => option.name)"
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
          >
            Search
          </VBtn>

          <VBtn 
            variant="tonal" 
            color="secondary" 
            prepend-icon="bx-export"
          >
            Export
          </VBtn>

          <VBtn
            prepend-icon="bx-plus"
            @click="isAddNewBranchDrawerVisible = true"
          >
            Add New Branch
          </VBtn>
        </div>
      </VCardText>

      <VDivider />

      <VDataTable 
        :headers="headers" 
        :items="branchData" 
        :items-per-page="5" 
        show-select
      >
        <template #item.branchId="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.branch_id }}
          </div>
        </template>

        <template #item.branchName="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.name }}
          </div>
        </template>

        <template #item.cellPhone="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.phone }}
          </div>
        </template>

        <template #item.phoneNumber="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.phoneNumber }}
          </div>
        </template>

        <template #item.faxNumber="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.faxNumber }}
          </div>
        </template>

        <template #item.accountNumber="{ item }">
          <div class="text-body-1 text-high-emphasis text-capitalize">
            {{ item.accountNumber }}
          </div>
        </template>

        <template #item.depositWithdrawalHistory="{ item }">
          <IconBtn>
            <VIcon icon="bx-show" />
          </IconBtn>
        </template>

        <template #item.affiliatedMembers="{ item }">
          <IconBtn>
            <VIcon icon="bx-show" />
          </IconBtn>
        </template>

        <template #item.dropOutOtherAreas="{ item }">
          <IconBtn>
            <VIcon icon="bx-show" />
          </IconBtn>
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

      <!-- Edit Dialog -->
      <VDialog v-model="editDialog" max-width="600px">
        <VCard title="Edit Item">
          <VCardText>
            <VRow>
              <VCol cols="12" sm="6">
                <AppTextField
                  v-model="editedItem.branch_id"
                  label="Branch ID"
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.branch_name" 
                  label="Branch Name" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.numberOfMembers" 
                  label="Number of branch members" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.branchManager" 
                  label="Branch Manager" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.cellPhone" 
                  label="Cell Phone" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.phoneNumber" 
                  label="Phone Number" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.faxNumber" 
                  label="Fax Number" 
                />
              </VCol>

              <VCol cols="12" sm="6">
                <AppTextField 
                  v-model="editedItem.accountNumber" 
                  label="Account Number" 
                />
              </VCol>
            </VRow>
          </VCardText>

          <VCardText>
            <div class="self-align-end d-flex gap-4 justify-end">
              <VBtn 
                color="error" 
                variant="outlined" 
                @click="close"
              >
                Cancel
              </VBtn>
              <VBtn 
                color="success" 
                variant="elevated" 
                @click="save"
              >
                Save
              </VBtn>
            </div>
          </VCardText>
        </VCard>
      </VDialog>

      <!-- Delete Dialog -->
      <VDialog v-model="deleteDialog" max-width="500px">
        <VCard title="Are you sure you want to delete this item?">
          <VCardText>
            <div class="d-flex justify-center gap-4">
              <VBtn 
                color="error" 
                variant="outlined" 
                @click="closeDelete"
              >
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

    <AddNewBranchDrawer
      v-model:isDrawerOpen="isAddNewBranchDrawerVisible"
      @branch-data="addNewBranch"
    />
  </section>
</template>
