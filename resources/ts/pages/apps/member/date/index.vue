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
    count: 4,
    settlementDate: '2024-10-21',
    memberId: 'Y001',
    memberName: 'Yosua',
    rank: 'Full member',
    branch: 'Cantorpus at',
    accountInfo: {
      bank: 'Bank Central Asia',
      number: '7105214379',
      name: 'Yosua'
    },
    referralBonus: '600,000',
    sponsorBonus: '600,000',
    matchingBonus: '0',
    rankBonus: '0',
    branchIntroBonus: '0',
    myTax: '39,600',
    remittanceFee: '500',
    actualPayment: '1,159,900'
  },
  {
    count: 1,
    memberId: 'M001',
    memberName: 'John Smith',
    accountInfo: '1234567890',
    referralBonus: '500',
    myTax: '16.50',
    remittanceFee: '25.00',
    actualPayment: '458.50',
    checkStatus: 'Pending'
  }
])

// Quick date options
const quickDateOptions = [
  { label: 'Today', value: 'today' },
  { label: 'A week', value: 'week' },
  { label: '15 days', value: '15days' },
  { label: '1 month', value: 'month' },
  { label: '2 months', value: '2months' },
]

const onSearch = () => {
  console.log(formData.value)
}

// Add computed property for totals
const totals = computed(() => ({
  referralBonus: '9,000,000',
  sponsorBonus: '9,000,000',
  matchingBonus: '5,600,000',
  rankBonus: '17,280,000',
  branchIntroBonus: '0',
  myTax: '1,349,040',
  remittanceFee: '6,000',
  actualPayment: '39,524,960'
}))
</script>

<template>
  <VCard title="Allowance details (by date)">
    <VCardText>
      <VForm @submit.prevent="onSearch">
        <VRow>
          <!-- Search by Period -->
          <VCol cols="12" class="d-flex align-center gap-4">
            <div style="inline-size: 200px;">
              <VSelect
                v-model="formData.periodType"
                label="Select period type"
                :items="[]"
              />
            </div>
            <VTextField
              v-model="formData.startDate"
              type="date"
              hide-details
            />
            <VTextField
              v-model="formData.endDate"
              type="date"
              hide-details
            />
            <div class="d-flex gap-2">
              <VBtn
                v-for="option in quickDateOptions"
                :key="option.value"
                variant="text"
                size="small"
              >
                {{ option.label }}
              </VBtn>
            </div>
          </VCol>

          <!-- Search by Detail -->
          <VCol cols="12" class="d-flex align-center gap-4">
            <div style="inline-size: 200px;">
              <VSelect
                v-model="formData.detailType"
                label="Select Detail Items"
                :items="[]"
              />
            </div>
            <VTextField
              v-model="formData.searchDetail"
              placeholder="Please enter a search term"
              hide-details
              style="flex-grow: 1;"
            />
            <VBtn
              type="submit"
              color="success"
              class="ml-2"
            >
              Search
            </VBtn>
          </VCol>
        </VRow>
      </VForm>

      <!-- Member Table -->
      <VTable class="mt-6">
        <thead>
          <tr>
            <th>Count</th>
            <th>Settlement date (↑↓)</th>
            <th>Member ID</th>
            <th>Member name</th>
            <th>Rank</th>
            <th>Branch</th>
            <th>Account information</th>
            <th>Referral Bonus</th>
            <th>Sponsor Bonus</th>
            <th>Matching Bonus</th>
            <th>Rank Bonus</th>
            <th>Branch Introduction Bonus</th>
            <th>My tax (3.3%)</th>
            <th>Remittance Fee</th>
            <th>Actual payment amount</th>
            <th>Check settlement</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="memberList.length === 0">
            <td colspan="16" class="text-center">There is no registered data.</td>
          </tr>
          <tr v-else v-for="item in memberList" :key="item.count">
            <td>{{ item.count }}</td>
            <td>{{ item.settlementDate }}</td>
            <td>{{ item.memberId }}</td>
            <td>{{ item.memberName }}</td>
            <td>{{ item.rank }}</td>
            <td>{{ item.branch }}</td>
            <td>
              {{ typeof item.accountInfo === 'object' ? 
                `${item.accountInfo.bank}\n${item.accountInfo.number}\n${item.accountInfo.name}` : 
                item.accountInfo 
              }}
            </td>
            <td>{{ item.referralBonus }}</td>
            <td>{{ item.sponsorBonus }}</td>
            <td>{{ item.matchingBonus }}</td>
            <td>{{ item.rankBonus }}</td>
            <td>{{ item.branchIntroBonus }}</td>
            <td>{{ item.myTax }}</td>
            <td>{{ item.remittanceFee }}</td>
            <td>{{ item.actualPayment }}</td>
            <td>
              <VCheckbox hide-details density="compact" />
            </td>
          </tr>
          <!-- Add sum row -->
          <tr class="grey lighten-2">
            <td colspan="7">Sum</td>
            <td>{{ totals.referralBonus }}</td>
            <td>{{ totals.sponsorBonus }}</td>
            <td>{{ totals.matchingBonus }}</td>
            <td>{{ totals.rankBonus }}</td>
            <td>{{ totals.branchIntroBonus }}</td>
            <td>{{ totals.myTax }}</td>
            <td>{{ totals.remittanceFee }}</td>
            <td>{{ totals.actualPayment }}</td>
            <td></td>
          </tr>
        </tbody>
      </VTable>

      <!-- Update Settlement button -->
      <div class="d-flex justify-end mt-4">
        <VBtn color="primary" class="text-capitalize">
          Settlement Completion Processing
        </VBtn>
      </div>

      <!-- Pagination -->
      <VPagination
        v-model="page"
        :length="10"
        class="mt-4"
      />
    </VCardText>
  </VCard>
</template>
