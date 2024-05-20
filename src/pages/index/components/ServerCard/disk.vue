<template>
  <div>
    <div class="title">DISK</div>
    <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">磁盘</span>
  </div>
  <div style="width: 60%; font-size: 0.7rem; font-weight: 500;" v-if="props.msg" class="row items-center">
    <div style="position: absolute; width: 400px; margin-top: -35px; display: flex;">
      已用{{ byte(props.msg['used']) }}MB/{{ byte(props.msg['used'] + props.msg['free']) }}MB
      <div :class="level(+(props.msg['used'] / props.msg['total'] * 100).toFixed(2))"
        style="width: 50px; display: flex; margin-left: 2px;">
        {{ (props.msg['used'] / props.msg['total'] * 100).toFixed(2) }}%
      </div>
    </div>
    <div style="flex: 1; height: 100%; display: flex; justify-content: center;">
      <q-linear-progress reverse stripe rounded size="20px" track-color="grey"
        :value="byte(props.msg['used']) / byte(props.msg['used'] + props.msg['free'])" :color="color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { level, byte, randomColor } from './utils';
const color = randomColor()
const props = defineProps(['msg'])
</script>

<style scoped lang="scss">
@import './app.scss'
</style>
