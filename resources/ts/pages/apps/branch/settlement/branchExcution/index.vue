<script setup lang="ts">
const formData = ref({
  dateRange: {
    start: '',
    end: ''
  },
  branch: '',
  standard: '2% of reference',
  finalSettlementDate: '',
  settlementReferenceDate: '',
  settlementCountry: 'IDN',
  adjustment: ''
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
    settlementStatus: 'Pending'
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
    settlementStatus: 'Completed'
  }
])

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}

const onSettlementExecution = () => {
  console.log('Execute settlement', formData.value)
}
</script>

<template>
  <VCard title="Branch Settlement">
    <VCardText>
      <VForm @submit.prevent="onSearch">
        <VRow>
          <!-- Date Range -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.dateRange.start"
              type="date"
              label="Start Date"
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.dateRange.end"
              type="date"
              label="End Date"
            />
          </VCol>

          <!-- Branch Search -->
          <VCol cols="12">
            <VTextField
              v-model="formData.branch"
              label="Branch"
              placeholder="Search by branch name or ID"
            />
          </VCol>

          <!-- Standard Rate -->
          <VCol cols="12">
            <VTextField
              v-model="formData.standard"
              label="Standard"
              readonly
            />
          </VCol>

          <!-- Final Settlement Date -->
          <VCol cols="12">
            <VTextField
              v-model="formData.finalSettlementDate"
              label="Final settlement date"
              type="date"
            />
          </VCol>

          <!-- Settlement Reference Date -->
          <VCol cols="12">
            <VTextField
              v-model="formData.settlementReferenceDate"
              label="Settlement reference date"
              type="date"
            />
          </VCol>

          <!-- Settlement Country -->
          <VCol cols="12">
            <VSelect
              v-model="formData.settlementCountry"
              label="Settlement country"
              :items="['IDN']"
            />
          </VCol>

          <!-- Adjustment -->
          <VCol cols="12">
            <VTextField
              v-model="formData.adjustment"
              label="Adjustment"
            />
          </VCol>
        </VRow>

        <!-- Settlement Execution Button -->
        <VBtn
          color="warning"
          class="mt-4"
          @click="onSettlementExecution"
        >
          Settlement execution
        </VBtn>
      </VForm>

      <!-- Settlement Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Count</th>
            <th>Branch ID</th>
            <th>Branch Name</th>
            <th>Account Information</th>
            <th>Source</th>
            <th>By PV</th>
            <th>Monthly Fee</th>
            <th>Actual Payment Amount</th>
            <th>Settlement Status</th>
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
            <td>{{ item.settlementStatus }}</td>
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
