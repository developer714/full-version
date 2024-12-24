<script setup lang="ts">
interface Props {
  userData: {
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
}

const props = defineProps<Props>()

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

// 👉 Role variant resolver
const resolveUserRoleVariant = (rank: string) => {
  if (rank === 'Associate Member')
    return { color: 'warning', icon: 'bx-user' }
  if (rank === 'Full Member')
    return { color: 'success', icon: 'bx-check-circle' }
  if (rank === 'Team Leader')
    return { color: 'primary', icon: 'bx-pie-chart-alt' }
  if (rank === 'Senior Team Leader')
    return { color: 'info', icon: 'bx-pencil' }
  if (rank === 'Headquarters Manager')
    return { color: 'secondary', icon: 'bx-server' }

  return { color: 'primary', icon: 'bx-user' }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-12">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="120"
            :color="!props.userData.image ? 'primary' : undefined"
            :variant="!props.userData.image ? 'tonal' : undefined"
          >
            <VImg
              v-if="props.userData.image"
              :src="props.userData.image"
            />
            <span
              v-else
              class="text-5xl font-weight-medium"
            >
              {{ avatarText(props.userData.name) }}
            </span>
          </VAvatar>

          <!-- 👉 User name -->
          <h5 class="text-h5 mt-4">
            {{ props.userData.name }}
          </h5>

          <!-- 👉 Rank chip -->
          <VChip
            label
            :color="resolveUserRoleVariant(props.userData.rank).color"
            size="small"
            class="text-capitalize mt-4"
          >
            {{ props.userData.rank }}
          </VChip>
        </VCardText>

        <VCardText>
          <div class="d-flex justify-space-around gap-x-6 gap-y-2 flex-wrap mb-6">
            <!-- 👉 Mountains and Rivers -->
            <div class="d-flex align-center me-8">
              <VAvatar
                :size="40"
                rounded
                color="primary"
                variant="tonal"
                class="me-4"
              >
                <VIcon
                  icon="bx-check"
                  size="24"
                />
              </VAvatar>
              <div>
                <h5 class="text-h5">
                  {{ props.userData.mountains_and_rivers }}
                </h5>

                <span class="text-body-1 d-inline-block">Mountains and Rivers</span>
              </div>
            </div>

            <!-- 👉 Cumulative PV -->
            <div class="d-flex align-center me-4">
              <VAvatar
                :size="38"
                rounded
                color="primary"
                variant="tonal"
                class="me-4"
              >
                <VIcon
                  icon="bx-customize"
                  size="24"
                />
              </VAvatar>
              <div>
                <h5 class="text-h5">
                  {{ props.userData.cumulative_pv }}
                </h5>
                <span class="text-body-1 d-inline-block">Cumulative PV</span>
              </div>
            </div>
          </div>

          <!-- 👉 Details -->
          <h5 class="text-h5">
            Details
          </h5>

          <VDivider class="my-4" />

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Member Name:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.name }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Member ID:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.member_id }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Phone:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.phone }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Email:
                  <span class="text-body-1 d-inline-block">
                    {{ props.userData.email }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Status:
                  <div class="d-inline-block text-body-1 text-capitalize">
                    {{ props.userData.status }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Rank:
                  <div class="d-inline-block text-capitalize text-body-1">
                    {{ props.userData.rank }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Account Number:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.account_number }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Account Holder:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.account_holder }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Recommender Name:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.recommender_name }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Administrator Name:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.concierge }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Branch ID:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.branch_id }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Address:
                  <div class="d-inline-block text-body-1">
                    {{ props.userData.address }}
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center gap-x-4">
          <VBtn
            variant="elevated"
            @click="isUserInfoEditDialogVisible = true"
          >
            Edit
          </VBtn>

          <VBtn
            variant="tonal"
            color="error"
          >
            Suspend
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
@use "@core-scss/template/mixins" as templateMixins;

.card-list {
  --v-card-list-gap: 0.5rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));

  @include templateMixins.custom-elevation(var(--v-theme-primary), "sm");
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
