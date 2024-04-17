<script setup lang="ts">
import { quasarDesign } from 'src/utils/color'
import { computed, watchEffect, ref } from 'vue'
import { UseDarkStore } from 'src/stores/dark-store';
import gsap from 'gsap';
const props = defineProps(['ratio', 'info', 'title', 'fixed', 'circle', 'compact'])
const darkStore = UseDarkStore()
function randomColor(): string {
  return gsap.utils.random(quasarDesign)
}
function randomValue(): number {
  return Math.floor(Math.random() * 360)
}
const outCircle: string = randomColor();
const innerCircle: string = randomColor();
const innerCircleAngle: number = randomValue()
const titleChinese = ref<string>('')
watchEffect(() => {
  switch (props.title) {
    case 'cpu':
      titleChinese.value = '处理器'
      break;
    case 'memory':
      titleChinese.value = '运行内存'

  }
})

const progress = computed(() => {
  let res: number = 0
  switch (props.title) {
    case 'cpu':
      res = +(props.info['0'].toFixed(2))
      break;
    case 'memory':
      res = +(((props.info['used'] / props.info['total']) * 100).toFixed(2))
  }
  return res
});
</script>

<template>
  <q-card v-if="props.circle !== undefined"
    :class="[darkStore.dark ? 'dark' : 'light', props.ratio !== undefined ? 'ratio' : '']" id="card"
    class="column circleProgess" :bordered="false">
    <q-card-section>
      <div class="row justify-between items-center text-uppercase col-12" style="font-size: 1.1rem; font-weight: 500;">
        <span>{{ props.title }}</span>
        <span style="font-size: 0.9rem; font-weight: 600;">{{ titleChinese }}</span>
      </div>
    </q-card-section>
    <q-card-section v-if="props.info === null" class="fit justify-center row items-center" tag="div" style="flex: 1;">
      <q-skeleton type="rect" width="100%" height="100%" />
    </q-card-section>
    <q-card-section v-if="props.info !== null" class="full-width justify-center row items-center" tag="div"
      style="flex: 1;">``
      <q-circular-progress rounded :angle="props.fixed !== undefined ? 225 : innerCircleAngle"
        :value="props.fixed !== undefined ? 75 : Math.floor(Math.random() * (95 - 40) + 40)" :thickness="0.14"
        size="9rem" :color="innerCircle" class="q-ma-md"
        style="position: absolute; transform: translate(0px, -12px);" />
      <q-circular-progress show-value :value="progress" size="6rem" :thickness="0.22" :color="outCircle"
        :rounded="props.fixed !== undefined" track-color="grey-3" class="q-mb-lg">
        <template v-slot:default>
          <div style="font-size: 1.2rem;;"
            :style="{ 'transform': props.fixed !== undefined ? 'translate(3px, 60px)' : 'translateX(3px)' }">
            {{ progress }}%
          </div>
        </template>
      </q-circular-progress>
    </q-card-section>
  </q-card>
  <q-card v-if="props.circle === undefined && $props.compact !== undefined"
    :class="[darkStore.dark ? 'dark' : 'light', props.ratio !== undefined ? 'ratio' : '']" id="card" class="column card"
    :bordered="false">
    <q-card-section>
      <div class="row justify-between items-center text-uppercase col-12" style="font-size: 1.1rem; font-weight: 500;">
        <span>{{ props.title }}</span>
        <span v-if="titleChinese !== ''" style="font-size: 0.9rem; font-weight: 600;">{{ titleChinese }}</span>
      </div>
    </q-card-section>
    <q-card-section>
      <div>123</div>
    </q-card-section>
  </q-card>
</template>

<style lang='scss' scoped>
.ratio {
  aspect-ratio: 1;
  height: auto !important;
}

.circleProgess {
  height: 20rem;
  width: 14rem;
}

.card {
  height: 25rem;
  width: 30rem;
}

#card {

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
src/utils/color
