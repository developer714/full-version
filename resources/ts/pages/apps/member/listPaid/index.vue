<script setup lang="ts">
interface FormData {
  periodType: string
  startDate: string
  endDate: string
  searchDetail: string
  detailType: string
}

interface Member {
  count: number
  memberId: string
  memberName: string
  cellPhone: string
  rank: string
  registrationDate: string
  concierge: string
  recommender: string
  branch: string
  suggestion: string
  mountainAndRivers: number
  cumulativePV: string
  paymentAmount: string
  circulationRate: string
  recognitionAccount: string
  suspensionOfBenefit: string
  zipCode: string
  address: string
  settlementDetails: string
  managementOrganization: string
  recommendedOrganization: string
}

const formData = ref<FormData>({
  periodType: '',
  startDate: '',
  endDate: '',
  searchDetail: '',
  detailType: ''
})

const page = ref(1)

const memberList = ref<Member[]>([
  {
    count: 1,
    memberId: 'M001', 
    memberName: 'John Smith',
    cellPhone: '123-456-7890',
    rank: 'Gold',
    registrationDate: '2023-01-15',
    concierge: 'Jane Doe',
    recommender: 'Mike Johnson', 
    branch: 'Main Branch',
    suggestion: 'Yes',
    mountainAndRivers: 5,
    cumulativePV: '1,200',
    paymentAmount: '500,000',
    circulationRate: '400%',
    recognitionAccount: 'ACC123456',
    suspensionOfBenefit: 'Normal',
    zipCode: '12345',
    address: '123 Main St, City',
    settlementDetails: '',
    managementOrganization: '',
    recommendedOrganization: ''
  }
])

const searchOptions = {
  memberId: [
    { name: 'Member ID', value: 'memberId' },
    { name: 'Member Name', value: 'memberName' },
    { name: 'Branch', value: 'branch' },
    { name: 'Recommender', value: 'recommender' },
    { name: 'Concierge', value: 'concierge' }
  ],
  selectedPeriodType: ['Registration Date']
}

const searchCriteria = ref('')
const searchQuery = ref('')
const selectedRank = ref('')
const selectedSuspension = ref('')
const selectedCirculationRate = ref('')
const startDate = ref('')
const endDate = ref('')

const editDialog = ref(false)
const deleteDialog = ref(false)
const editedIndex = ref(-1)
const members = ref<Member[]>(memberList.value)
const membersData = ref<Member[]>(memberList.value)

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
  { title: "Management Organization", key: "managementOrganization" },
  { title: "Recommended Organization", key: "recommendedOrganization" }
]

// Search and filter methods
const handleSearch = () => {
  let filteredData = [...memberList.value]

  // Filter by search criteria and query
  if (searchCriteria.value && searchQuery.value) {
    filteredData = filteredData.filter(item => {
      const value = item[searchCriteria.value as keyof Member]
      return String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  }

  // Filter by rank
  if (selectedRank.value) {
    filteredData = filteredData.filter(item => item.rank === selectedRank.value)
  }

  // Filter by suspension status
  if (selectedSuspension.value) {
    filteredData = filteredData.filter(item => item.suspensionOfBenefit === selectedSuspension.value)
  }

  // Filter by circulation rate
  if (selectedCirculationRate.value) {
    filteredData = filteredData.filter(item => item.circulationRate === selectedCirculationRate.value)
  }

  // Filter by date range
  if (startDate.value && endDate.value) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.registrationDate)
      const start = new Date(startDate.value)
      const end = new Date(endDate.value)
      return itemDate >= start && itemDate <= end
    })
  }

  membersData.value = filteredData
}

const resetSearch = () => {
  formData.value = {
    periodType: '',
    startDate: '',
    endDate: '',
    searchDetail: '',
    detailType: ''
  }
  searchCriteria.value = ''
  searchQuery.value = ''
  selectedRank.value = ''
  selectedSuspension.value = ''
  selectedCirculationRate.value = ''
  startDate.value = ''
  endDate.value = ''
  membersData.value = memberList.value
}

// Dialog methods
const openSettlementDetails = (item: Member) => {
  editedIndex.value = membersData.value.indexOf(item)
  editDialog.value = true
}

const closeSettlementDetails = () => {
  editDialog.value = false
  editedIndex.value = -1
}
</script>

<template>
  <VCard>
    <VCardText>
      <!-- Search Form -->
      <VForm @submit.prevent="handleSearch">
        <VRow>
          <VCol cols="12" md="4">
            <VSelect
              v-model="formData.periodType"
              label="Period Type"
              :items="searchOptions.selectedPeriodType"
            />
          </VCol>

          <VCol cols="12" md="4">
            <VTextField
              v-model="startDate"
              label="Start Date"
              type="date"
            />
          </VCol>

          <VCol cols="12" md="4">
            <VTextField
              v-model="endDate"
              label="End Date"
              type="date"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VSelect
              v-model="searchCriteria"
              label="Search Detail"
              :items="searchOptions.memberId"
              item-title="name"
              item-value="value"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="searchQuery"
              label="Search Value"
            />
          </VCol>
        </VRow>

        <div class="d-flex gap-4 mt-4 justify-end">
          <VBtn color="primary" type="submit">
            Search
          </VBtn>
          <VBtn color="secondary" variant="outlined" @click="resetSearch">
            Reset
          </VBtn>
        </div>
      </VForm>

      <!-- Table -->
      <VDataTable
        :headers="headers"
        :items="membersData"
        :items-per-page="10"
        class="mt-4"
      >
        <template #item.settlementDetails="{ item }">
          <VBtn
            color="primary"
            size="small"
            @click="openSettlementDetails(item)"
          >
            View Details
          </VBtn>
        </template>
      </VDataTable>

      <!-- Pagination -->
      <VPagination
        v-model="page"
        :length="Math.ceil(membersData.length / 10)"
        class="mt-4"
      />

      <!-- Settlement Details Dialog -->
      <VDialog v-model="editDialog" max-width="600px">
        <VCard>
          <VCardTitle>
            <span class="text-h5">Settlement Details</span>
          </VCardTitle>
          <VCardText>
            <VContainer v-if="editedIndex > -1">
              <VRow>
                <VCol cols="12" sm="6">
                  <strong>Member ID:</strong> {{ membersData[editedIndex].memberId }}
                </VCol>
                <VCol cols="12" sm="6">
                  <strong>Member Name:</strong> {{ membersData[editedIndex].memberName }}
                </VCol>
                <VCol cols="12" sm="6">
                  <strong>Payment Amount:</strong> {{ membersData[editedIndex].paymentAmount }}
                </VCol>
                <VCol cols="12" sm="6">
                  <strong>Circulation Rate:</strong> {{ membersData[editedIndex].circulationRate }}
                </VCol>
              </VRow>
            </VContainer>
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn color="primary" variant="text" @click="closeSettlementDetails">
              Close
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VCardText>
  </VCard>
</template>
