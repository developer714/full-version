<script setup lang="ts">
const formData = ref({
  setCountry: 'id',
  companyName: 'Magista Indonesia Global',
  homepageName: 'Bagus500',
  shoppingDomain: 'www.Bagus500.com',
  representativeInfo: 'magista 156-06-2068-1952',
  manager: 'staff1',
  contact: '02-2222-3333',
  stopMessage: {
    status: 'normal',
    message: 'asdasd'
  }
})

const onSubmit = () => {
  // Handle form submission
  console.log(formData.value)
}
</script>

<template>
  <VCard title="Basic information management">
    <VCardText>
      <VForm @submit.prevent="onSubmit">
        <VRow>
          <!-- Set Country -->
          <VCol cols="12">
            <VTextField
              v-model="formData.setCountry"
              label="Set country"
              placeholder="id"
            />
          </VCol>

          <!-- Company Name -->
          <VCol cols="12">
            <VTextField
              v-model="formData.companyName" 
              label="Company name"
              placeholder="Enter company name"
            />
          </VCol>

          <!-- Homepage Name -->
          <VCol cols="12">
            <VTextField
              v-model="formData.homepageName"
              label="Homepage Name"
              placeholder="Enter homepage name"
            />
          </VCol>

          <!-- Shopping Mall Domain -->
          <VCol cols="12">
            <VTextField
              v-model="formData.shoppingDomain"
              label="Shopping mall domain"
              placeholder="Enter domain"
            />
          </VCol>

          <!-- Representative Account Info -->
          <VCol cols="12">
            <VTextField
              v-model="formData.representativeInfo"
              label="Representative Account Information"
              placeholder="Enter account info"
            />
          </VCol>

          <!-- Manager -->
          <VCol cols="12">
            <VTextField
              v-model="formData.manager"
              label="Manager"
              placeholder="Enter manager name"
            />
          </VCol>

          <!-- Contact -->
          <VCol cols="12">
            <VTextField
              v-model="formData.contact"
              label="Contact"
              placeholder="Enter contact number"
            />
          </VCol>

          <!-- Stop Using Message -->
          <VCol cols="12">
            <VSelect
              v-model="formData.stopMessage.status"
              label="Stop using"
              :items="['normal', 'stopped']"
            />
            <VTextField
              v-model="formData.stopMessage.message"
              label="Message"
              placeholder="Enter stop message"
              class="mt-2"
            />
          </VCol>
        </VRow>

        <VBtn
          type="submit"
          color="success"
          class="mt-4"
        >
          Modify
        </VBtn>
      </VForm>
    </VCardText>
  </VCard>
</template>
