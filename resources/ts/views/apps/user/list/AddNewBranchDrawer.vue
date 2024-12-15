<script setup lang="ts">
import { debounce } from 'lodash';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import type { VForm } from 'vuetify/components/VForm';

// Types
interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
  (e: 'branchData', value: BranchData): void
}

interface Props {
  isDrawerOpen: boolean
}

export interface BranchData {
  password: string
  name: string
  branch_manager: string
  cell_phone: string
  phone_number: string
  fax_number: string
  address: string
  bank_name: string
  account_number: string
  account_holder: string
  recommender: string
  memo: string
}

interface Member {
  member_id: number
  name: string
  phone: string
  rank: string
  direct_coefficient: number
  branch_id?: number
}

// Props & Emits
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

// Refs
const isFormValid = ref(false)
const refForm = ref<VForm>()
const branchId = ref('')
const password = ref('')
const branchName = ref('')
const branchManager = ref('')
const cellPhone = ref('')
const phoneNumber = ref('')
const faxNumber = ref('')
const address = ref('')
const accountNumber = ref('')
const isDuplicateId = ref(false)
const isCheckingId = ref(true)
const recommender = ref('')
const recommenderName = ref('')
const bankName = ref('')  
const accountHolder = ref('')
const showMemberSearch = ref(false)
const searchTerm = ref('')
const memo = ref('')
const filteredMembers = ref<Member[]>([])

// API endpoint
const API_BASE_URL = 'http://18.119.72.52/api/v1'

// Methods
const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  nextTick(() => {
    refForm.value?.reset()
    refForm.value?.resetValidation()
  })
}

const checkDuplicateId = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/members`)
    const data: Member[] = await response.json()
    const existingMember = data.find(member => member.branch_id === parseInt(id))
    isDuplicateId.value = !!existingMember
    isCheckingId.value = false
    return !!existingMember
  } catch (error) {
    console.error('Error checking duplicate ID:', error)
    return false
  }
}

const onSubmit = () => {
  refForm.value?.validate().then(({ valid }) => {
    if (valid) {
      const branchData: BranchData = {
        password: password.value,
        name: branchName.value,
        branch_manager: branchManager.value,
        cell_phone: cellPhone.value,
        phone_number: phoneNumber.value,
        fax_number: faxNumber.value,
        address: address.value,
        bank_name: bankName.value,
        account_number: accountNumber.value,
        account_holder: accountHolder.value,
        recommender: recommender.value,
        memo: memo.value
      }
      
      emit('branchData', branchData)
      emit('update:isDrawerOpen', false)
      
      nextTick(() => {
        refForm.value?.reset()
        refForm.value?.resetValidation()
      })
    }
  })
}

const debouncedCheckId = debounce(async (value: string) => {
  if (value) {
    isDuplicateId.value = await checkDuplicateId(value)
  }
}, 500)

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

const handleMemberSearch = async (searchTerm: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/members`)
    const data: Member[] = await response.json()
    
    filteredMembers.value = data.filter(member => 
      member.member_id?.toString().includes(searchTerm) || 
      member.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    return filteredMembers.value
  } catch (error) {
    console.error('Error searching members:', error)
    return []
  }
}

const selectRecommender = (member: Member) => {
  recommender.value = member.member_id.toString()
  recommenderName.value = member.name
  showMemberSearch.value = false
}

// Watchers
watch(branchId, (newValue) => {
  if (newValue) {
    debouncedCheckId(newValue)
  }
})
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
    <AppDrawerHeaderSection
      title="Add New Branch"
      @cancel="closeNavigationDrawer"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onSubmit"
          >
              <VCol cols="12">
                <AppTextField
                  v-model="branchId"
                  :rules="[
                    async (v: string) => !(await checkDuplicateId(v)) || 'This Branch ID already exists',
                    (v: string) => /^[a-zA-Z0-9]{4,12}$/.test(v) || '4-12 characters, letters & numbers only'
                  ]"
                  label="Branch ID"
                  :error-messages="isDuplicateId ? 'This Branch ID is already in use' : ''"
                  :loading="isCheckingId" 
                  :disabled="isCheckingId"
                  placeholder="Enter branch ID"
                  persistent-hint
                />
                <div 
                  v-if="branchId && !isDuplicateId && !isCheckingId" 
                  class="text-body-2 text-success mt-2"
                >
                  This Branch ID is available in Database
                </div>
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="password"
                  :rules="[requiredValidator]"
                  label="Password"
                  type="password"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="branchName"
                  :rules="[requiredValidator]"
                  label="Branch Name"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="branchManager"
                  :rules="[requiredValidator]"
                  label="Branch Manager"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="cellPhone"
                  :rules="[requiredValidator]"
                  label="Cell Phone"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="phoneNumber"
                  :rules="[requiredValidator]"
                  label="Phone Number"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="faxNumber"
                  :rules="[requiredValidator]"
                  label="Fax Number"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="address"
                  :rules="[requiredValidator]"
                  label="Address"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="bankName"
                  :rules="[requiredValidator]"
                  label="Bank Name"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="accountNumber"
                  :rules="[requiredValidator]"
                  label="Account Number"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="accountHolder"
                  :rules="[requiredValidator]"
                  label="Account Holder"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="recommenderName"
                  label="Recommender"
                  readonly
                  @click="showMemberSearch = true"
                />
              </VCol>

              <VCol cols="12">
                <AppTextarea
                  v-model="memo"
                  label="Memo"
                  rows="4"
                  type="textarea"
                />
              </VCol>

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
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>

    <VDialog
      v-model="showMemberSearch"
      max-width="600px"
    >
      <VCard>
        <VCardTitle>
          Member Search
          <VBtn
            icon
            @click="showMemberSearch = false"
          >
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </VCardTitle>
        <VCardText>
          <VRow>
            <VCol cols="12">
              <VRow>
                <VCol cols="9">
                  <AppTextField
                    v-model="searchTerm"
                    label="Member name"
                    append-inner-icon="mdi-magnify"
                    @click:append-inner="handleMemberSearch(searchTerm)"
                  />
                </VCol>
                <VCol cols="3">
                  <VBtn
                    color="primary"
                    @click="handleMemberSearch(searchTerm)"
                  >
                    Search
                  </VBtn>
                </VCol>
              </VRow>
            </VCol>
          </VRow>
          <VTable>
            <thead>
              <tr>
                <th>Member Code</th>
                <th>Member name</th>
                <th>Cell phone</th>
                <th>Rank</th>
                <th>Direct coefficient</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="member in filteredMembers" 
                :key="member.member_id"
                style="cursor: pointer;"
                @click="selectRecommender(member)"
              >
                <td>{{ member.member_id }}</td>
                <td>{{ member.name }}</td>
                <td>{{ member.phone }}</td>
                <td>{{ member.rank }}</td>
                <td>{{ member.direct_coefficient }}</td>
              </tr>
            </tbody>
          </VTable>
        </VCardText>
      </VCard>
    </VDialog>
  </VNavigationDrawer>
</template>
