<template>
  <div class="q-pa-lg" :class="[darkStore.dark ? 'container_dark' : 'container']">
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

import { UseDarkStore } from 'src/stores/dark-store';
import { useScreen } from 'src/composition/screenInfo';
const props = defineProps(['msg'])
const darkStore = UseDarkStore()
const { screen } = useScreen()
console.log(screen.name);

</script>

<style scoped lang="scss">
.container {
  border-radius: 6px;
  // font-weight: ;
  background: linear-gradient(90deg, rgb(247, 247, 247), rgb(255, 255, 255));
  box-shadow: 1px 2px 3px 2px rgb(212, 206, 206);
}

.container_dark {
  border-radius: 6px;
  box-shadow: none;
  background: linear-gradient(100deg, rgb(29, 29, 29), rgb(20, 20, 20))
}
</style>
