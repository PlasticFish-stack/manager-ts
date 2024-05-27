<template>
  <div>
    <div class="title">SWAP</div>
    <span class="content" style="font-size: 0.9rem; font-weight: 600;">交换空间</span>
  </div>
  <div style="position: relative; width: 60%; align-items: center; font-size: 0.7rem; font-weight: 500;"
    v-if="props.msg" class="row">
    <div style="flex: 1; height: 100%; display: flex; justify-content: right;">
      <div v-if="byte(props.msg['total']) != 0" style="color: rgb(243, 62, 62); font-size: 0.9rem; font-weight: 600;">
        服务器未启用SWAP</div>
      <div v-if="byte(props.msg['total']) == 0"
        style="overflow: hidden; justify-content: space-around; width: 100%;border-radius: 4px;"
        class="q-py-sm row swap">
        <div class="column items-center" style="flex: 1; border-right: 1px solid white;">
          <div class="swapTitle">Free(MB)</div>
          <div class="swapContent">{{ byte(props.msg.free) }}</div>
        </div>
        <div class="column items-center" style="flex: 1; border-right: 1px solid white;">
          <div class="swapTitle">Used(MB)</div>
          <div class="swapContent">{{ byte(props.msg.used) }}</div>
        </div>
        <div class="column items-center" style="flex: 1;">
          <div class="swapTitle">Total(MB)</div>
          <div class="swapContent">{{ byte(props.msg.total) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { byte } from '../utils';
const props = defineProps(['msg'])
console.log(props.msg);

</script>

<style scoped lang="scss">
@import '../app.scss';

.swap {
  background: linear-gradient(120deg, rgb(223, 223, 223), rgb(185, 185, 185));
}

.swapTitle {
  color: rgb(29, 29, 29);
  font-size: 0.7rem;
  font-weight: 600;
}

.swapContent {
  color: rgb(110, 110, 110);
  font-size: 0.6rem;
  font-weight: 800;
}
</style>
