<script setup lang="ts">
const formData = ref({
  dateRange: {
    start: '',
    end: ''
  }
})

const page = ref(1)

const notificationList = ref([
  {
    count: 1,
    type: 'Notice',
    periodDatetime: '2024-01-16 02:55:37',
    location: 'Global',
    note: 'System maintenance notice',
    modifyAction: 'Modify/Delete'
  },
  {
    count: 2,
    type: 'Event', 
    periodDatetime: '2024-01-15 14:30:00',
    location: 'Asia',
    note: 'New feature release',
    modifyAction: 'Modify/Delete'
  }
])

const onSearch = () => {
  // Handle search
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Pop-up list">
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

      <!-- Notification Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Count</th>
            <th>Type</th>
            <th>Period/Date/Time</th>
            <th>Location</th>
            <th>Note</th>
            <th>Modify/Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in notificationList" :key="item.count">
            <td>{{ item.count }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.periodDatetime }}</td>
            <td>{{ item.location }}</td>
            <td>{{ item.note }}</td>
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
