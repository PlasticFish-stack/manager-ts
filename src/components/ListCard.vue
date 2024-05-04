<script setup lang="ts">
import { ref, computed } from 'vue'
import { UseDarkStore } from 'stores/dark-store'
const props = defineProps(['ratio', 'info', 'title', 'fixed', 'circle'])
const darkStore = UseDarkStore()
const columns = [
  {
    name: 'ID',
    required: true,
    label: 'ID',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'Username', align: 'center', label: '用户名', field: 'calories', sortable: true },
  { name: 'Download', label: '下载', field: 'protein' },
  { name: 'Upload', label: '上传', field: 'sodium' },
]
const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
]
</script>

<template>
  <q-card :class="[darkStore.dark ? 'dark' : 'light', props.ratio !== undefined ? 'ratio' : '']" id="card"
    class="column card" :bordered="false">
    <q-card-section>
      <div class="row justify-between items-center text-uppercase col-12" style="font-size: 1.1rem; font-weight: 500;">
        <span>Trojan</span>
      </div>
    </q-card-section>
    <q-card-section>
      <div style="font-size: 0.9rem; font-weight: 600;">使用流量</div>
      <q-table :rows="rows" :columns="columns" row-key="name" />
    </q-card-section>
  </q-card>
</template>

<style lang='scss' scoped>
#card {
  flex: 1;
  border-radius: 8px;
  position: relative;
  box-shadow: inset 0 0px 2px 0px rgb(0 0 0 / 20%),
    0px 50px 45px -20px rgba(212, 206, 206, 0.4);
  z-index: 1;
}

.light {
  background-color: white;
  color: $blue-grey-8;
}

.dark {
  background-color: rgb(48, 48, 48);
  color: white;
}
</style>
