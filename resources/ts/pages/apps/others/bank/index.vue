<script setup lang="ts">
const formData = ref({
  dateRange: {
    start: '',
    end: ''
  }
})

const page = ref(1)

const bankList = ref([
  {
    order: 22,
    bankCode: 22,
    bankName: 'PT BANK RAKYAT IND (PERSERO)',
    holder: 'Org',
    modifyAction: 'Confirm / Delete'
  },
  {
    order: 21, 
    bankCode: 21,
    bankName: 'PT BANK CENTRAL ASIA TBK',
    holder: 'Org',
    modifyAction: 'Confirm / Delete'
  },
  {
    order: 20,
    bankCode: 20,
    bankName: 'PT BANK MANDIRI (PERSERO)',
    holder: 'Org', 
    modifyAction: 'Confirm / Delete'
  }
])

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Bank List">
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

      <!-- Bank Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Order</th>
            <th>Bank code</th>
            <th>Bank name</th>
            <th>Holder</th>
            <th>Modify/Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in bankList" :key="item.order">
            <td>{{ item.order }}</td>
            <td>{{ item.bankCode }}</td>
            <td>{{ item.bankName }}</td>
            <td>{{ item.holder }}</td>
            <td>{{ item.modifyAction }}</td>
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
