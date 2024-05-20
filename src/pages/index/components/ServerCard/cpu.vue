<template>
  <div>
    <div class="title">CPU</div>
    <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">处理器</span>
  </div>
  <div v-if="props.msg" style="font-size: 1.1rem; font-weight: 600;" :class="level((props.msg))">{{
    (props.msg).toFixed(2) + '%' }}
  </div>
</template>

<script setup lang="ts">
import { level } from './utils';
const props = defineProps(['msg'])
</script>

<style scoped lang="scss">
@import './app.scss'
</style>
