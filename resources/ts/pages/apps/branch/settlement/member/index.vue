<script setup lang="ts">
const formData = ref({
  periodType: '',
  startDate: '',
  endDate: '',
  searchDetail: '',
  detailType: ''
})

const page = ref(1)

const settlementList = ref([
  {
    count: 1,
    branchId: 'BR001',
    branchName: 'Main Branch', 
    accountInfo: '1234567890',
    source: 'Direct',
    byPv: '500',
    monthlyFee: '2500.00',
    actualPaymentAmount: '2000.00',
    checkSettlement: 'Pending Review'
  },
  {
    count: 2,
    branchId: 'BR002',
    branchName: 'Branch A',
    accountInfo: '0987654321', 
    source: 'Indirect',
    byPv: '750',
    monthlyFee: '3000.00',
    actualPaymentAmount: '3000.00',
    checkSettlement: 'Approved'
  }
])

// Add quick date options
const quickDateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'A week', value: 'week' },
  { label: '15 days', value: '15days' },
  { label: '1 month', value: 'month' },
  { label: '2 months', value: '2months' },
]

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Allowance details (by branch)">
    <VCardText>
      <VForm @submit.prevent="onSearch">
        <VRow>
          <!-- Search by Period -->
          <VCol cols="12" class="d-flex align-center gap-4">
            <div style="inline-size: 200px;">
              <VSelect
                v-model="formData.periodType"
                label="Select period type"
                :items="[]"
              />
            </div>
            <VTextField
              v-model="formData.startDate"
              type="date"
              hide-details
            />
            <VTextField
              v-model="formData.endDate"
              type="date"
              hide-details
            />
            <div class="d-flex gap-2">
              <VBtn
                v-for="option in quickDateOptions"
                :key="option.value"
                variant="text"
                size="small"
              >
                {{ option.label }}
              </VBtn>
            </div>
          </VCol>

          <!-- Search by Detail -->
          <VCol cols="12" class="d-flex align-center gap-4">
            <div style="inline-size: 200px;">
              <VSelect
                v-model="formData.detailType"
                label="Select Detail Items"
                :items="[]"
              />
            </div>
            <VTextField
              v-model="formData.searchDetail"
              placeholder="Please enter a search term"
              hide-details
              style="flex-grow: 1;"
            />
            <VBtn
              color="success"
              class="ml-2"
            >
              Search
            </VBtn>
          </VCol>
        </VRow>
      </VForm>

      <!-- Update table headers -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Count</th>
            <th>Branch ID</th>
            <th>Branch name</th>
            <th>Account information</th>
            <th>Bonus</th>
            <th>My tax (3.3%)</th>
            <th>Remittance Fee</th>
            <th>Actual payment amount</th>
            <th>Check settlement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in settlementList" :key="item.count">
            <td>{{ item.count }}</td>
            <td>{{ item.branchId }}</td>
            <td>{{ item.branchName }}</td>
            <td>{{ item.accountInfo }}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.byPv }}</td>
            <td>{{ item.monthlyFee }}</td>
            <td>{{ item.actualPaymentAmount }}</td>
            <td>{{ item.checkSettlement }}</td>
          </tr>
        </tbody>
      </VTable>

      <!-- Empty state message -->
      <div v-if="settlementList.length === 0" class="text-center py-4">
        There is no registered data
      </div>

      <!-- Settlement completion button -->
      <div class="d-flex justify-end mt-4">
        <VBtn
          color="warning"
        >
          Settlement Completion Processing
        </VBtn>
      </div>

      <!-- Pagination -->
      <VPagination
        v-model="page"
        :length="10"
        class="mt-4"
      />
    </VCardText>
  </VCard>
</template>
