<script setup lang="ts">
const formData = ref({
  dateRange: {
    start: '',
    end: ''
  }
})

const page = ref(1)

const connectionList = ref([
  { 
    order: 373,
    type: 'member',
    date: '2024-01-16 02:55:37',
    ip: 'manager_id',
    notes: 'Administrative processing',
    connectionIp: '182.253.194.60'
  },
  {
    order: 372, 
    type: 'member',
    date: '2024-01-16 02:55:37',
    ip: 'manager_id',
    notes: 'Administrative processing',
    connectionIp: '182.253.194.60'
  }
])

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Connection list">
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

      <!-- Connection Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Order</th>
            <th>Connection type</th>
            <th>Connection date and time</th>
            <th>IP</th>
            <th>Notes</th>
            <th>Connection IP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in connectionList" :key="item.order">
            <td>{{ item.order }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.date }}</td>
            <td>{{ item.ip }}</td>
            <td>{{ item.notes }}</td>
            <td>{{ item.connectionIp }}</td>
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
