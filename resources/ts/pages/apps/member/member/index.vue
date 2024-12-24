<script setup lang="ts">
const formData = ref({
  periodType: '',
  startDate: '', 
  endDate: '',
  searchDetail: '',
  detailType: ''
})

const page = ref(1)

const memberList = ref([
  {
    count: 1,
    memberId: 'F001',
    name: 'Emily',
    rank: 'Full member',
    branch: 'Central Branch',
    accountInfo: {
      bank: 'Bank Central Asia',
      number: '8675309123',
      name: 'Emily Smith'
    },
    referralBonus: '600,000',
    sponsorBonus: '600,000', 
    matchingBonus: '0',
    rankBonus: '0',
    branchIntroBonus: '0',
    myTax: '39,600',
    remittanceFee: '500',
    actualPayment: '1,159,900',
    checkStatus: 'Pending'
  },
  {
    count: 2,
    memberId: 'M001', 
    name: 'Michael',
    rank: 'Associate Member',
    branch: 'West Branch',
    accountInfo: {
      bank: 'Bank Central Asia',
      number: '7654321098',
      name: 'Michael Johnson'
    },
    referralBonus: '300,000',
    sponsorBonus: '0',
    matchingBonus: '0', 
    rankBonus: '0',
    branchIntroBonus: '0',
    myTax: '9,900',
    remittanceFee: '500',
    actualPayment: '289,600',
    checkStatus: 'Pending'
  }
])

const totals = computed(() => {
  return memberList.value.reduce((acc, item) => {
    acc.referralBonus += Number(item.referralBonus.replace(/,/g, ''))
    acc.sponsorBonus += Number(item.sponsorBonus.replace(/,/g, ''))
    acc.matchingBonus += Number(item.matchingBonus.replace(/,/g, ''))
    acc.rankBonus += Number(item.rankBonus.replace(/,/g, ''))
    acc.branchIntroBonus += Number(item.branchIntroBonus.replace(/,/g, ''))
    acc.myTax += Number(item.myTax.replace(/,/g, ''))
    acc.remittanceFee += Number(item.remittanceFee.replace(/,/g, ''))
    acc.actualPayment += Number(item.actualPayment.replace(/,/g, ''))
    return acc
  }, {
    referralBonus: 0,
    sponsorBonus: 0,
    matchingBonus: 0,
    rankBonus: 0,
    branchIntroBonus: 0,
    myTax: 0,
    remittanceFee: 0,
    actualPayment: 0
  })
})

const search = () => {
  // Implement search logic
}

const reset = () => {
  formData.value = {
    periodType: '',
    startDate: '',
    endDate: '',
    searchDetail: '',
    detailType: ''
  }
}
</script>

<template>
  <VCard elevation="3" class="rounded-lg">
    <VCardText>
      <!-- Search Form -->
      <VForm @submit.prevent class="mb-8">
        <VRow>
          <VCol cols="12" md="4">
            <VSelect
              v-model="formData.periodType"
              label="Period Type"
              :items="['Registration Date']"
              variant="outlined"
              density="comfortable"
              hide-details
              class="rounded-lg"
            />
          </VCol>

          <VCol cols="12" md="4">
            <VTextField
              v-model="formData.startDate"
              label="Start Date"
              type="date"
              variant="outlined"
              density="comfortable"
              hide-details
              class="rounded-lg"
            />
          </VCol>

          <VCol cols="12" md="4">
            <VTextField
              v-model="formData.endDate"
              label="End Date" 
              type="date"
              variant="outlined"
              density="comfortable"
              hide-details
              class="rounded-lg"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VSelect
              v-model="formData.detailType"
              label="Search Detail"
              :items="[
                'Member ID',
                'Member Name', 
                'Branch',
                'Recommender',
                'Concierge'
              ]"
              variant="outlined"
              density="comfortable"
              hide-details
              class="rounded-lg"
            />
          </VCol>

          <VCol cols="12" md="6">
            <VTextField
              v-model="formData.searchDetail"
              label="Search Value"
              variant="outlined"
              density="comfortable"
              hide-details
              class="rounded-lg"
            />
          </VCol>
        </VRow>

        <div class="d-flex gap-4 mt-6">
          <VBtn 
            color="primary"
            size="large"
            prepend-icon="mdi-magnify"
            @click="search"
            class="text-capitalize px-6"
          >
            Search
          </VBtn>
          <VBtn 
            color="secondary" 
            variant="outlined"
            size="large"
            prepend-icon="mdi-refresh"
            @click="reset"
            class="text-capitalize px-6"
          >
            Reset
          </VBtn>
        </div>
      </VForm>

      <!-- Table -->
      <VCard variant="flat" border class="mb-6">
        <VTable hover class="text-no-wrap">
          <thead>
            <tr>
              <th scope="col">Count</th>
              <th scope="col">Member ID</th>
              <th scope="col">Name</th>
              <th scope="col">Rank</th>
              <th scope="col">Branch</th>
              <th scope="col">Account Information</th>
              <th scope="col">Referral Bonus</th>
              <th scope="col">Sponsor Bonus</th>
              <th scope="col">Matching Bonus</th>
              <th scope="col">Rank Bonus</th>
              <th scope="col">Branch Intro Bonus</th>
              <th scope="col">My Tax (3.3%)</th>
              <th scope="col">Remittance Fee</th>
              <th scope="col">Actual Payment Amount</th>
              <th scope="col">Check Settlement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in memberList" :key="item.count">
              <td>{{ item.count }}</td>
              <td>{{ item.memberId }}</td>
              <td>{{ item.name }}</td>
              <td>
                <VChip
                  :color="item.rank === 'Full member' ? 'success' : 'warning'"
                  size="small"
                  class="text-capitalize"
                >
                  {{ item.rank }}
                </VChip>
              </td>
              <td>{{ item.branch }}</td>
              <td class="text-wrap">
                <div v-if="typeof item.accountInfo === 'object'" class="d-flex flex-column gap-1">
                  <span class="font-weight-medium">{{ item.accountInfo.bank }}</span>
                  <span class="text-medium-emphasis">{{ item.accountInfo.number }}</span>
                  <span class="text-medium-emphasis">{{ item.accountInfo.name }}</span>
                </div>
                <span v-else>{{ item.accountInfo }}</span>
              </td>
              <td>${{ item.referralBonus }}</td>
              <td>${{ item.sponsorBonus }}</td>
              <td>${{ item.matchingBonus }}</td>
              <td>${{ item.rankBonus }}</td>
              <td>${{ item.branchIntroBonus }}</td>
              <td>${{ item.myTax }}</td>
              <td>${{ item.remittanceFee }}</td>
              <td class="font-weight-bold">${{ item.actualPayment }}</td>
              <td>
                <VCheckbox hide-details density="compact" color="primary" />
              </td>
            </tr>
            <!-- Sum row -->
            <tr class="grey lighten-4 font-weight-bold">
              <td colspan="6" class="text-right">Total Sum</td>
              <td>${{ totals.referralBonus.toLocaleString() }}</td>
              <td>${{ totals.sponsorBonus.toLocaleString() }}</td>
              <td>${{ totals.matchingBonus.toLocaleString() }}</td>
              <td>${{ totals.rankBonus.toLocaleString() }}</td>
              <td>${{ totals.branchIntroBonus.toLocaleString() }}</td>
              <td>${{ totals.myTax.toLocaleString() }}</td>
              <td>${{ totals.remittanceFee.toLocaleString() }}</td>
              <td>${{ totals.actualPayment.toLocaleString() }}</td>
              <td></td>
            </tr>
          </tbody>
        </VTable>
      </VCard>

      <div class="d-flex flex-wrap justify-space-between align-center gap-4">
        <VPagination
          v-model="page"
          :length="10"
          rounded="circle"
        />

        <VBtn
          color="primary"
          size="large"
          prepend-icon="mdi-check-circle"
          class="text-capitalize px-6"
        >
          Settlement Completion Processing
        </VBtn>
      </div>

    </VCardText>
  </VCard>
</template>
