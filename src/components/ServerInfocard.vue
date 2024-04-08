<template>
  <q-card class="q-pa-md card" flat>
    <q-card-section class="horizontal">
      <div class="text-overline"></div>
      <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
      <div class="text-caption text-grey" v-if="false"></div>
      <q-linear-progress stripe rounded size="20px" class="q-mt-sm" />
    </q-card-section>
  </q-card>
</template>
<script setup lang="ts">
// import { ref } from 'vue'
// const props = defineProps(['title', 'name', 'infomation'])
</script>
<style lang="scss" scoped>
.card {
  border-radius: 8px;
}
</style>
