<script setup lang="ts">
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

import type { VForm } from 'vuetify/components/VForm';

import type { UserProperties } from '@db/apps/users/types';

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'userData', value: UserProperties): void
}

interface Props {
  isDrawerOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const isFormValid = ref(false)
const refForm = ref<VForm>()
const member_name = ref('')
const member_id = ref('')
const email = ref('')
const rank = ref('')
const manager_name = ref('')
const account_number = ref('')
const account_holder = ref('')
const avatar = ref('')
const concierge = ref('')
const recommender_name = ref('')
const phone = ref('')
const branch_id = ref('')
const created_at = ref(new Date().toISOString().split('T')[0])
const password = ref('12345678')
const suggestion = ref('')
const mountains_and_rivers = ref(-1)
const cumulative_pv = ref('')
const payment_amount = ref('')
const circulation_rate = ref('')
const suspension_of_benefits = ref('')
const zip_code = ref('')
const address = ref('')
const recognition_account = ref('')

// 👉 drawer close
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)

  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      emit('userData', {
        recognition_account: recognition_account.value,
        password: password.value,
        member_id: member_id.value,
        name: member_name.value,
        email: email.value,
        manager_name: manager_name.value,
        account_number: account_number.value,
        account_holder: account_holder.value,
        avatar: avatar.value,
        concierge: concierge.value,
        recommender_name: recommender_name.value,
        phone: phone.value,
        branch_id: branch_id.value,
        created_at: created_at.value,
        suggestion: suggestion.value,
        mountains_and_rivers: mountains_and_rivers.value,
        cumulative_pv: cumulative_pv.value,
        payment_amount: payment_amount.value,
        circulation_rate: circulation_rate.value,
        suspension_of_benefits: suspension_of_benefits.value,
        zip_code: zip_code.value,
        address: address.value,
        rank: rank.value, // Added the missing 'rank' property
        status: 1,
      })
      emit('update:isDrawerOpen', false)
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VNavigationDrawer
    temporary
    :width="400"
    location="end"
    border="none"
    class="scrollable-content"
    :model-value="props.isDrawerOpen"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Title -->
    <AppDrawerHeaderSection
      title="Add New User"
      @cancel="closeNavigationDrawer"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <!-- 👉 Form -->
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- 👉 Full name -->
              <VCol cols="12">
                <AppTextField
                  v-model="member_name"
                  :rules="[requiredValidator]"
                  label="Member Name"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Member ID -->
              <VCol cols="12">
                <AppTextField
                  v-model="member_id"
                  :rules="[requiredValidator]"
                  label="Member ID"
                  placeholder="1234567890"
                />
              </VCol>

              <!-- 👉 Email -->
              <VCol cols="12">
                <AppTextField
                  v-model="email"
                  :rules="[requiredValidator, emailValidator]"
                  label="Email"
                  placeholder="johndoe@email.com"
                />
              </VCol>

              <!-- 👉 Manager Name -->
              <VCol cols="12">
                <AppTextField
                  v-model="manager_name"
                  :rules="[requiredValidator]"
                  label="Manager Name"
                  placeholder="John Doe"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="phone"
                  :rules="[requiredValidator]"
                  label="Phone"
                  placeholder="+1-541-754-3010"
                />
              </VCol>

              <!-- 👉 Contact -->
              <VCol cols="12">
                <AppTextField
                  v-model="rank"
                  :rules="[requiredValidator]"
                  label="Rank"
                  placeholder="Full Member"
                />
              </VCol>

              <!-- 👉 Registration date -->
              <!-- <VCol cols="12">
                <AppTextField
                  v-model="created_at"
                  :rules="[requiredValidator]"
                  label="Registration date"
                  placeholder="2024-01-01"
                />
              </VCol> -->

              <!-- 👉 Concierge -->
              <VCol cols="12">
                <AppTextField
                  v-model="concierge"
                  :rules="[requiredValidator]"
                  label="Concierge"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Recommender -->
              <VCol cols="12">
                <AppTextField
                  v-model="recommender_name"
                  :rules="[requiredValidator]"
                  label="Recommender"
                  placeholder="John Doe"
                />
              </VCol>

              <!-- 👉 Branch -->
              <VCol cols="12">
                <AppTextField
                  v-model="branch_id"
                  :rules="[requiredValidator]"
                  label="Branch"
                  placeholder="Cantorpusat"
                />
              </VCol>

              <!-- 👉 Suggestion -->
              <VCol cols="12">
                <AppTextField
                  v-model="suggestion"
                  :rules="[requiredValidator]"
                  label="Suggestion"
                  placeholder="0"
                />
              </VCol>

              <!-- 👉 Mountains and rivers -->
              <VCol cols="12">
                <AppTextField
                  v-model="mountains_and_rivers"
                  :rules="[requiredValidator]"
                  label="Mountains and rivers"
                  placeholder=":"
                />
              </VCol>

              <!-- 👉 Cumulative PV -->
              <VCol cols="12">
                <AppTextField
                  v-model="cumulative_pv"
                  :rules="[requiredValidator]"
                  label="Cumulative PV"
                  placeholder="1,000,000"
                />
              </VCol>


              <!-- 👉 Payment amount -->
              <VCol cols="12">
                <AppTextField
                  v-model="payment_amount"
                  :rules="[requiredValidator]"
                  label="Payment amount"
                  placeholder="1"
                />
              </VCol>

              <!-- 👉 Circulation Rate -->
              <VCol cols="12">
                <AppTextField
                  v-model="circulation_rate"
                  :rules="[requiredValidator]"
                  label="Circulation Rate"
                  placeholder="0%"
                />
              </VCol>

              <!-- 👉 Recognition account -->
              <VCol cols="12">
                <AppTextField
                  v-model="recognition_account"
                  :rules="[requiredValidator]"
                  label="Recognition account"
                  placeholder="1"
                />
              </VCol>

              <!-- 👉 Suspension of benefits -->
              <VCol cols="12">
                <AppTextField
                  v-model="suspension_of_benefits"
                  :rules="[requiredValidator]"
                  label="Suspension of benefits"
                  placeholder="N"
                />
              </VCol>

              <!-- 👉 Address -->
              <VCol cols="12">
                <AppTextField
                  v-model="address"
                  :rules="[requiredValidator]"
                  label="Address"
                  placeholder="New York, NY 10001"
                />
              </VCol>

              <!-- 👉 Zip code -->
              <VCol cols="12">
                <AppTextField
                  v-model="zip_code"
                  :rules="[requiredValidator]"
                  label="Zip code"
                  placeholder="55401"
                />
              </VCol> 

              <!-- 👉 Submit and Cancel -->
              <VCol cols="12">
                <VBtn
                  type="submit"
                  class="me-4"
                >
                  Submit
                </VBtn>
                <VBtn
                  type="reset"
                  variant="tonal"
                  color="error"
                  @click="closeNavigationDrawer"
                >
                  Cancel
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>
