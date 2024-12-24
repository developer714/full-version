<script setup lang="ts">
interface Member {
  memberId: string
  memberName: string
  paymentAmount: string
  circulationRate: string
  settlementDetails: {
    vipMembershipFee: number
    monthlyMembershipFee: number
    paymentProcessingFee: number
    taxCredit: number
    totalCredit: number
    managementOrganizationPercentage: number
    recommendedOrganizationPercentage: number
    actualAmount: number
  }
}

const member = ref<Member>({
  memberId: 'M001',
  memberName: 'John Smith', 
  paymentAmount: '500,000',
  circulationRate: '400%',
  settlementDetails: {
    vipMembershipFee: 100000,
    monthlyMembershipFee: 10000,
    paymentProcessingFee: 5000,
    taxCredit: 15000,
    totalCredit: 130000,
    managementOrganizationPercentage: 15,
    recommendedOrganizationPercentage: 5,
    actualAmount: 355000
  }
})

const executeSettlement = () => {
  // Implementation for executing settlement
  console.log('Settlement executed')
}
</script>

<template>
  <VCard>
    <VCardText>
      <VForm>
        <VRow>
          <!-- Member Info -->
          <VCol cols="12" md="6">
            <VTextField
              v-model="member.memberId"
              label="Member ID"
              readonly
            />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField
              v-model="member.memberName"
              label="Member Name"
              readonly
            />
          </VCol>

          <!-- Settlement Details -->
          <VCol cols="12">
            <h3>Settlement Details</h3>
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.vipMembershipFee"
              label="VIP Membership Fee"
              readonly
              prefix="¥"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.monthlyMembershipFee"
              label="Monthly Membership Fee"
              readonly
              prefix="¥"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.paymentProcessingFee"
              label="Payment Processing Fee"
              readonly
              prefix="¥"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.taxCredit"
              label="Tax Credit"
              readonly
              prefix="¥"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.totalCredit"
              label="Total Credit"
              readonly
              prefix="¥"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.managementOrganizationPercentage"
              label="Management Organization %"
              readonly
              suffix="%"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.recommendedOrganizationPercentage"
              label="Recommended Organization %"
              readonly
              suffix="%"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="member.settlementDetails.actualAmount"
              label="Actual Settlement Amount"
              readonly
              prefix="¥"
            />
          </VCol>

          <VCol cols="12" class="text-center">
            <VBtn color="primary" @click="executeSettlement">
              Execute Settlement
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </VCardText>
  </VCard>
</template>
