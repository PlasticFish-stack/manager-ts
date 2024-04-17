<script setup lang="ts">
import { quasarDesign } from 'src/utils/color'
import { computed } from 'vue'
import { UseDarkStore } from 'src/stores/dark-store';
import gsap from 'gsap';
const props = defineProps(['ratio', 'info', 'title'])
const darkStore = UseDarkStore()
console.log(props.info);

function randomColor(): string {
  return gsap.utils.random(quasarDesign)
}
function randomValue(): number {
  return Math.floor(Math.random() * 360)
}
const outCircle: string = randomColor();
const innerCircle: string = randomColor();
const innerCircleAngle: number = randomValue()



const progress = computed(() => {
  return props.info !== null ? +(props.info['0'].toFixed(2)) : 0
});

</script>

<template>
  <q-card :class="[darkStore.dark ? 'dark' : 'light', props.ratio !== undefined ? 'ratio' : '']" id="card"
    class="column" :bordered="false">
    <q-card-section>
      <div class="row justify-between text-uppercase col-12" style="font-size: 1.1rem; font-weight: 500;">
        <span>{{ props.title }}</span>
        <!-- <span style="font-size: 1rem; font-weight: 600;">处理器</span> -->
      </div>
    </q-card-section>
    <q-card-section v-if="props.info === null" class="fit justify-center row items-center" tag="div" style="flex: 1;">
      <q-skeleton type="rect" width="100%" height="100%" />
    </q-card-section>
    <q-card-section v-if="props.info !== null" class="full-width justify-center row items-center" tag="div"
      style="flex: 1;">``
      <q-circular-progress rounded :angle="innerCircleAngle" :value="Math.floor(Math.random() * (95 - 40) + 40)"
        :thickness="0.14" size="9rem" :color="innerCircle" class="q-ma-md"
        style="position: absolute; transform: translate(0px, -12px);" />
      <q-circular-progress show-value :value="progress" size="6rem" :thickness="0.22" :color="outCircle"
        track-color="grey-3" class="q-mb-lg">
        <template v-slot:default>
          <div style="font-size: 1.2rem; transform: translateX(3px);">
            {{ progress }}%
          </div>
        </template>
      </q-circular-progress>
    </q-card-section>
  </q-card>
</template>

<style lang='scss' scoped>
.ratio {
  aspect-ratio: 1;
  height: auto !important;
}

#card {
  height: 20rem;
  width: 14rem;
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
