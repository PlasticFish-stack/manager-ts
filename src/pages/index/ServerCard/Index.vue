<template>
  <div class="q-pa-lg container">
    <div :class="[screen.name != 'xs' ? 'column' : 'row  justify-between']">
      <span>Server Info</span>
      <span class="title" style="font-size: 1.1rem; font-weight: 600;">服务器信息</span>
    </div>
    <div class="cpu q-mt-sm row items-center justify-between ">
      <cpu v-if="props.msg.cpu" :msg="(props.msg.cpu)[0]" />
      <q-skeleton v-if="!props.msg.cpu" type="QRange" width="100%" />
    </div>
    <div class="disk title q-mt-md row items-end justify-between">
      <disk v-if="props.msg.disk" :msg="props.msg.disk" />
      <q-skeleton v-if="!props.msg.disk" type="QRange" width="100%" />
    </div>
    <div class="q-mt-md memory title row items-end justify-between">
      <memory v-if="props.msg.memory" :msg="props.msg.memory" />
      <q-skeleton v-if="!props.msg.memory" type="QRange" width="100%" />
    </div>
    <div class="q-mt-md swap title row items-center justify-between">
      <swap v-if="props.msg.swap" :msg="props.msg.swap" />
      <q-skeleton v-if="!props.msg.swap" type="QRange" width="100%" />
    </div>
    <div class="q-mt-md q-mb-sm load title row items-center justify-between">
      <load v-if="props.msg.load" :msg="props.msg.load" />
      <q-skeleton v-if="!props.msg.load" type="QRange" width="100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import cpu from './components/cpu.vue'
import disk from './components/disk.vue'
import memory from './components/memory.vue'
import swap from './components/swap.vue'
import load from './components/load.vue'

import { useScreen } from 'src/composition/screenInfo';
const props = defineProps(['msg'])
const { screen } = useScreen()
console.log(screen.name);

</script>

<style scoped lang="scss">
@import '../app.scss'
</style>
