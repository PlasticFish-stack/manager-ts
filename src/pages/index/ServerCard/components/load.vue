<template>
  <div>
    <div class="title">LOAD</div>
    <span class="content" style="font-size: 0.9rem; font-weight: 600;">负载</span>
  </div>
  <div style="position: relative; width: 60%;  font-size: 0.7rem; font-weight: 500;" v-if="props.msg"
    class="row justify-around">
    <div class="column items-center justify-center">
      <div class="loadRatio">Load1</div>
      <div>{{ props.msg.load1 }}</div>
    </div>
    <div class="column items-center justify-center">
      <div class="loadRatio">Load5</div>
      <div>{{ props.msg.load5 }}</div>
    </div>
    <div class="column items-center justify-center">
      <div class="loadRatio">Load15</div>
      <div>{{ props.msg.load15 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['msg'])
</script>

<style scoped lang="scss">
@import '../app.scss'
</style>
