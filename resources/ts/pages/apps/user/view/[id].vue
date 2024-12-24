<script setup lang="ts">
import UserBioPanel from '@/views/apps/user/view/UserBioPanel.vue';
import type { membersData } from "@db/pages/datatable/types";
const route = useRoute('apps-user-view-id')
const AppBaseUrl = "http://18.119.72.52/api/v1"
const { data: userData } = await useApi<membersData>(`${AppBaseUrl}/auth/members/${route.params.id}`)

if (userData.value) {
  const [name] = userData.value.name.split(' ')

  userData.value.name = name
}
</script>

<template>
  <VRow v-if="userData">
    <VCol cols="12" md="6" class="mx-auto">
      <UserBioPanel :user-data="userData" />
    </VCol>
  </VRow>
</template>
