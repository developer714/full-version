<script setup lang="ts">
interface FormData {
  settlementDate: string
  settlementCountry: string
}

const formData = ref<FormData>({
  settlementDate: '',
  settlementCountry: 'IDN'
})

const handleCancellation = () => {
  // Implementation for settlement cancellation
  console.log('Settlement cancelled:', formData.value)
}
</script>

<template>
  <VCard>
    <VCardText>
      <div class="d-flex align-center mb-6">
        <VIcon
          icon="mdi-alert-circle"
          color="warning"
          size="32"
          class="me-4"
        />
        <h2 class="text-h4 font-weight-medium">
          Settlement Cancellation
        </h2>
      </div>

      <!-- Precautions -->
      <VAlert
        color="warning"
        variant="tonal"
        class="mb-6"
      >
        <template #prepend>
          <VIcon
            icon="mdi-information"
            start
          />
        </template>
        <div class="font-weight-medium mb-2">Important Precautions</div>
        <ul class="ps-4 mb-0">
          <li>All data will be initialized on the settlement date</li>
          <li>Please verify any existing deposits before proceeding with cancellation</li>
        </ul>
      </VAlert>

      <VForm @submit.prevent="handleCancellation">
        <VRow>
          <!-- Settlement Date -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.settlementDate"
              label="Settlement Date"
              type="date"
              placeholder="Select date"
              prepend-inner-icon="mdi-calendar"
              hide-details="auto"
              class="mb-4"
            />
          </VCol>

          <!-- Settlement Country -->
          <VCol cols="12" md="6">
            <VSelect
              v-model="formData.settlementCountry"
              label="Settlement Country"
              :items="[{ title: 'Indonesia', value: 'IDN' }]"
              prepend-inner-icon="mdi-earth"
              hide-details="auto"
              class="mb-4"
            />
          </VCol>
        </VRow>

        <!-- Submit Button -->
        <div class="d-flex justify-end gap-4 mt-6">
          <VBtn
            color="error"
            @click="handleCancellation"
            prepend-icon="mdi-close-circle"
          >
            Cancel Settlement
          </VBtn>
        </div>
      </VForm>
    </VCardText>
  </VCard>
</template>
