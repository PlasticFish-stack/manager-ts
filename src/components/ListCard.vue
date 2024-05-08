<script setup lang="ts">
import { UseDarkStore } from 'stores/dark-store'
import { QTableProps } from 'quasar'
const props = defineProps(['ratio', 'info', 'title', 'fixed', 'circle'])
const darkStore = UseDarkStore()
const columns: QTableProps['columns'] = [
  {
    name: 'ID',
    label: 'ID',
    align: 'center',
    field: 'ID',
    sortable: true
  },
  { name: 'Username', label: '用户名', field: 'Username', align: 'center' },
  { name: 'Download', label: '下载', field: 'Download', align: 'center', format: (val: number) => `${(+val / 1024 / 1024 / 1024).toFixed(2)}GB` },
  { name: 'Upload', label: '上传', field: 'Upload', align: 'center', format: (val: number) => `${(+val / 1024 / 1024 / 1024).toFixed(2)}GB` },
  { name: 'Quota', label: '限额', field: 'Quota', align: 'center', format: (val: number) => { if (val == -1) { return } else { return `${(+val / 1024 / 1024 / 1024).toFixed(2)}GB` } } },
  { name: 'UseDays', label: '到期时间', field: 'UseDays', align: 'center' },

]
const rows = ref(props.info.userList)
watchEffect(() => {
  rows.value = props.info.userList;
});

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
      <q-table :rows="rows" :columns="columns" row-key="name" flat square v-if="rows != null" class="transparent" />
    </q-card-section>
  </q-card>
</template>

<style lang='scss' scoped>
#card {
  flex: 1;
  border-radius: 8px;
  position: relative;
  z-index: 1;
}
</style>
