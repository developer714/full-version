<script setup lang="ts">
const formData = ref({
  queryType: 'based',
  period: 'day',
  dateRange: {
    start: '',
    end: ''
  }
})

const periodOptions = [
  { title: '1 Day', value: 'day' },
  { title: '1 Week', value: 'week' }, 
  { title: '1 Month', value: 'month' },
  { title: '3 Months', value: 'quarter' }
]

const queryTypes = [
  { title: 'Based on the deposit', value: 'based' },
  { title: 'general', value: 'general' }
]

const salesInfo = ref([
  { period: '2023-10', numPurchases: 120, purchaseAmount: 25000, perPurchase: 208.33, totalSales: 28000 }
])

const settlementInfo = ref([
  { period: '2023-10', suggestion: 'Approved', level: 'Gold', matching: 2500, spot: 1200, sum: 3700 }
])

const onSubmit = () => {
  // Handle form submission
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Report">
    <VCardText>
      <VForm @submit.prevent="onSubmit">
        <VRow>
          <!-- Query Type -->
          <VCol cols="12" md="6">
            <VSelect
              v-model="formData.queryType"
              :items="queryTypes"
              item-title="title"
              item-value="value"
              label="Query type"
            />
          </VCol>

          <!-- Period -->
          <VCol cols="12" md="6">
            <VSelect
              v-model="formData.period"
              :items="periodOptions"
              item-title="title"
              item-value="value"
              label="Inquiry period"
            />
          </VCol>

          <!-- Date Range -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.dateRange.start"
              type="date"
              label="Start date"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.dateRange.end"
              type="date"
              label="End date"
            />
          </VCol>
        </VRow>

        <!-- Search Button -->
        <VBtn
          type="submit"
          color="success"
          class="mt-4"
        >
          Search
        </VBtn>
      </VForm>

      <!-- Sales Information Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Period</th>
            <th>Number of purchases</th>
            <th>Purchase quantity</th>
            <th>Per purchase</th>
            <th>Total sales</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in salesInfo" :key="item.period">
            <td>{{ item.period }}</td>
            <td>{{ item.numPurchases }}</td>
            <td>{{ item.purchaseAmount }}</td>
            <td>{{ item.perPurchase }}</td>
            <td>{{ item.totalSales }}</td>
          </tr>
        </tbody>
      </VTable>

      <!-- Settlement Information Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Period</th>
            <th>Suggestion</th>
            <th>Level</th>
            <th>Matching</th>
            <th>Spot</th>
            <th>Sum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in settlementInfo" :key="item.period">
            <td>{{ item.period }}</td>
            <td>{{ item.suggestion }}</td>
            <td>{{ item.level }}</td>
            <td>{{ item.matching }}</td>
            <td>{{ item.spot }}</td>
            <td>{{ item.sum }}</td>
          </tr>
        </tbody>
      </VTable>
    </VCardText>
  </VCard>
</template>
