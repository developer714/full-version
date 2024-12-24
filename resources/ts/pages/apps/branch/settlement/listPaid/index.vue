<script setup lang="ts">
const formData = ref({
  dateRange: {
    start: '',
    end: ''
  },
  searchDetail: '',
  searchDetailType: ''
})

// Add quick date selection options
const dateOptions = [
  { label: 'Today', days: 0 },
  { label: 'A week', days: 7 },
  { label: '15 days', days: 15 },
  { label: '1 month', days: 30 },
  { label: '2 months', days: 60 }
]

// Add detail search options
const searchDetailTypes = [
  'Branch ID',
  'Branch Name',
  'Account Information'
]

const setQuickDate = (days: number) => {
  const end = new Date()
  const start = new Date()
  start.setDate(start.getDate() - days)
  
  formData.value.dateRange.end = end.toISOString().split('T')[0]
  formData.value.dateRange.start = start.toISOString().split('T')[0]
}

const page = ref(1)

const settlementList = ref([
  {
    count: 1,
    paymentDate: '2023-10-15',
    branchId: 'BR001', 
    branchName: 'Main Branch',
    accountInfo: '1234567890',
    source: 'Direct',
    byPv: '500',
    monthlyFee: '2500.00',
    actualPaymentAmount: '2000.00'
  },
  {
    count: 2,
    paymentDate: '2023-10-16',
    branchId: 'BR002',
    branchName: 'Branch A',
    accountInfo: '0987654321',
    source: 'Indirect', 
    byPv: '750',
    monthlyFee: '3000.00',
    actualPaymentAmount: '3000.00'
  }
])

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}

const hasData = computed(() => settlementList.value.length > 0)
</script>

<template>
  <VCard title="List of allowances paid">
    <VCardText>
      <VForm @submit.prevent="onSearch">
        <VRow>
          <!-- Date Selection -->
          <VCol cols="12" md="6">
            <VSelect
              v-model="formData.searchDetailType"
              :items="searchDetailTypes"
              label="Select period type"
            />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField
              v-model="formData.dateRange.start"
              type="date"
              label="Start Date"
            />
          </VCol>
          <VCol cols="12" md="3">
            <VTextField
              v-model="formData.dateRange.end"
              type="date"
              label="End Date"
            />
          </VCol>

          <!-- Quick Date Buttons -->
          <VCol cols="12">
            <VBtnGroup>
              <VBtn
                v-for="option in dateOptions"
                :key="option.label"
                variant="outlined"
                @click="setQuickDate(option.days)"
              >
                {{ option.label }}
              </VBtn>
            </VBtnGroup>
          </VCol>

          <!-- Detail Search -->
          <VCol cols="12">
            <VSelect
              v-model="formData.searchDetailType"
              :items="searchDetailTypes"
              label="Select Detail Item"
            />
            <VTextField
              v-model="formData.searchDetail"
              label="Search Detail"
              placeholder="Please enter a search item"
              class="mt-2"
            />
          </VCol>
        </VRow>

        <VBtn
          type="submit"
          color="success"
          class="mt-4"
        >
          Search
        </VBtn>
      </VForm>

      <!-- Updated Settlement Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Count</th>
            <th>Settlement date (+3)</th>
            <th>Payment date (+4)</th>
            <th>Branch ID</th>
            <th>Branch name</th>
            <th>Account Information</th>
            <th>bonus</th>
            <th>My tax (2.5%)</th>
            <th>Remittance Fee</th>
            <th>Actual payment amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="!hasData">
            <td colspan="10" class="text-center">There is no registered data.</td>
          </tr>
          <tr v-else v-for="item in settlementList" :key="item.count">
            <td>{{ item.count }}</td>
            <td>{{ item.paymentDate }}</td>
            <td>{{ item.paymentDate }}</td>
            <td>{{ item.branchId }}</td>
            <td>{{ item.branchName }}</td>
            <td>{{ item.accountInfo }}</td>
            <td>{{ item.byPv }}</td>
            <td>{{ item.monthlyFee }}</td>
            <td>{{ item.actualPaymentAmount }}</td>
          </tr>
        </tbody>
      </VTable>

      <!-- Pagination -->
      <VPagination
        v-model="page"
        :length="10"
        class="mt-4"
      />
    </VCardText>
  </VCard>
</template>
