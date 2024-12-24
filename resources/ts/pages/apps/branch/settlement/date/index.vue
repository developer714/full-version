
<script setup lang="ts">
const formData = ref({
  dateRange: {
    start: '',
    end: ''
  }
})

const page = ref(1)

const settlementList = ref([
  {
    order: 1,
    allowanceType: 'Suggestion',
    branchId: 'BR001',
    branchName: 'Main Branch',
    accountInfo: '1234567890',
    source: 'Direct',
    status: 'Pending',
    allowanceFee: '500.00',
    accumulatedAmount: '2500.00',
    checkSettlement: 'Pending Review'
  },
  {
    order: 2,
    allowanceType: 'Level',
    branchId: 'BR002', 
    branchName: 'Branch A',
    accountInfo: '0987654321',
    source: 'Indirect',
    status: 'Completed',
    allowanceFee: '750.00',
    accumulatedAmount: '3000.00',
    checkSettlement: 'Approved'
  }
])

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Settlement Details">
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
        </VRow>

        <VBtn
          type="submit"
          color="success"
          class="mt-4"
        >
          Search
        </VBtn>
      </VForm>

      <!-- Settlement Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Order</th>
            <th>Allowance Type</th>
            <th>Branch ID</th>
            <th>Branch Name</th>
            <th>Account Information</th>
            <th>Source</th>
            <th>Status</th>
            <th>Allowance Fee</th>
            <th>Accumulated Amount</th>
            <th>Check Settlement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in settlementList" :key="item.order">
            <td>{{ item.order }}</td>
            <td>{{ item.allowanceType }}</td>
            <td>{{ item.branchId }}</td>
            <td>{{ item.branchName }}</td>
            <td>{{ item.accountInfo }}</td>
            <td>{{ item.source }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.allowanceFee }}</td>
            <td>{{ item.accumulatedAmount }}</td>
            <td>{{ item.checkSettlement }}</td>
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
