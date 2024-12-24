<script setup lang="ts">

interface UserData {
  id: number
  no: number
  recognition_account: string
  member_id: number
  name: string
  email: string
  manager_name: string
  account_number: string
  account_holder: string
  rank: string
  image: string
  concierge: string
  recommender_name: string
  phone: string
  branch_id: string
  created_at: string
  suggestion: string
  mountains_and_rivers: number
  cumulative_pv: string | number
  payment_amount: string
  circulation_rate: string
  suspension_of_benefits: string
  zip_code: string
  address: string
  status: number
}

interface Props {
  userData: UserData
  isDialogVisible: boolean
}

interface Emit {
  (e: 'submit', value: UserData): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = defineProps<Props>()

const emit = defineEmits<Emit>()

const userData = ref<UserData>(structuredClone(toRaw(props.userData)))
const isUseAsBillingAddress = ref(false)

watch(() => props, () => {
  userData.value = structuredClone(toRaw(props.userData))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', userData.value)
}

const onFormReset = () => {
  userData.value = structuredClone(toRaw(props.userData))
  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}

const refInputEl = ref<HTMLElement>()

const changeAvatar = (file: Event) => {
  const fileReader = new FileReader()
  const { files } = file.target as HTMLInputElement

  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        props.userData.image = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  props.userData.image = props.userData.image
}

</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-10 pa-2">
      <VCardText>
        <!-- 👉 Title -->
        <h4 class="text-h4 text-center mb-2">
          Edit User Information
        </h4>
        <p class="text-body-1 text-center mb-6">
          Updating user details will receive a privacy audit.
        </p>

        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >

        <div class="d-flex mb-4">
            <!-- 👉 Avatar -->
            <VAvatar
              rounded
              size="100"
              class="me-6"
              :image="props.userData.image"
            />
            <!-- 👉 Upload Photo -->
            <form class="d-flex flex-column justify-center gap-4">
              <div class="d-flex flex-wrap gap-4">
                <VBtn
                  color="primary"
                  @click="refInputEl?.click()"
                >
                  <VIcon
                    icon="bx-cloud-upload"
                    class="d-sm-none"
                  />
                  <span class="d-none d-sm-block">Upload new photo</span>
                </VBtn>
                <input
                  ref="refInputEl"
                  type="file"
                  name="file"
                  accept=".jpeg,.png,.jpg,GIF"
                  hidden
                  @input="changeAvatar"
                >
                <VBtn
                  type="reset"
                  color="secondary"
                  variant="tonal"
                  @click="resetAvatar"
                >
                  <span class="d-none d-sm-block">Reset</span>
                  <VIcon
                    icon="bx-refresh"
                    class="d-sm-none"
                  />
                </VBtn>
              </div>
              <p class="text-body-1 mb-0">
                Allowed JPG, GIF or PNG. Max size of 800K
              </p>
            </form>
          </div>
          <VRow>
            <!-- 👉 Name -->
            <VCol cols="12">
              <AppTextField
                v-model="userData.name"
                label="Name"
                placeholder="John Doe"
              />
            </VCol>

            <!-- 👉 Email -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.email"
                label="Email"
                placeholder="johndoe@email.com"
              />
            </VCol>

            <!-- 👉 Phone -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.phone"
                label="Phone Number"
                placeholder="+1 9876543210"
              />
            </VCol>

            <!-- 👉 Address -->
            <VCol cols="12">
              <AppTextField
                v-model="userData.address"
                label="Address"
                placeholder="1234 Main St"
              />
            </VCol>

            <!-- 👉 Zip Code -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.zip_code"
                label="Zip Code"
                placeholder="12345"
              />
            </VCol>

            <!-- 👉 Branch ID -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.branch_id"
                label="Branch ID"
                placeholder="BR001"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Submit
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancel
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
