<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { UseDarkStore } from 'stores/dark-store'
import { gsap } from 'gsap';
const color = gsap.utils.random(['deep-purple-8', 'purple-7', 'red', 'teal', 'indigo', 'green-6', 'blue-7', 'deep-orange'])
const props = defineProps(['info', 'title'])
const darkStore = UseDarkStore()
const name = ref<string | null>(null);
let userFlow = computed(() => {
  if (props.title != 'user') return 0;
  return byte(props.info.reduce((prev: number, cur: { Download: number; }) => {
    if (!prev) { return cur.Download }
    return prev + cur.Download
  }, 0))
})
watchEffect(() => {
  switch (props.title) {
    case 'cpu':
      name.value = '处理器'
      break
    case 'disk':
      name.value = '磁盘'
      break
    case 'load':
      name.value = '负载(1/5/15)'
      break
    case 'memory':
      name.value = '运行内存'
      break
    case 'netCount':
      name.value = '数据包量'
      break
    case 'speed':
      name.value = '上传/下载'
      break
    case 'swap':
      name.value = '交换空间'
      break
    case 'user':
      name.value = '使用流量'
      break
    // 其他可能的情况...
    default:
      name.value = null
      break
  }
})

// 保持 userFlow 的已有定义不变

const information = computed(() => {
  let res
  switch (props.title) {
    case 'cpu':
      res = +props.info[0].toFixed(2)
      break
    case 'disk':
      res = +(props.info['usedPercent'].toFixed(2))
      break
    // 其他情况...
    // user 情况下的处理不在此计算属性中，因为需要引用到 userFlow，它本身是响应式的
    case 'user':
      return +((400 / +((userFlow.value / 1024).toFixed(2))).toFixed(2))
    default:
      res = 0 // 提供默认值
      break
  }
  return res === undefined ? 0 : res
})
function byte(data: number): number {
  return +(data / 1024 / 1024).toFixed(2)
}

</script>

<template>
  <div class="overflow-hidden q-pa-lg " style="border-radius: 8px;"
    :style="{ 'border': darkStore.dark ? '' : 'border: 1px solid white' }"
    :class="[darkStore.dark ? 'acrylic_gery ' : 'acrylic_light shadow-1', props.title]">
    <q-skeleton type="QRange" v-if="props.info == null" size="100%" />
    <div v-if="props.info != null">
      <div class="row items-center">
        <div class="text-overline">{{ props.title }}</div>
        <q-space></q-space>
      </div>
      <div class="row items-center">
        <div class="text-subtitle2">{{ name }}</div>
        <q-space></q-space>
        <div class="text-body1"
          v-if="(props.title != 'user' && props.title != 'speed' && props.title != 'netCount' && props.title != 'load')">
          {{ information }}%</div>
      </div>
      <div class="row items-center">
        <div v-if="props.title === 'memory'" class="text-caption text-grey-8">
          已用{{ byte(props.info['used']) }}MB/{{ byte(props.info['total']) }}MB</div>
        <div v-if="props.title === 'disk'" class="text-caption text-grey-8">
          已用{{ byte(props.info['used']) }}MB/{{ byte(props.info['used'] + props.info['free']) }}MB</div>
        <div v-if="props.title === 'swap'" class="text-caption text-grey-8">
          已用{{ byte(props.info['used']) }}MB/{{ byte(props.info['used'] + props.info['free']) }}MB<span
            v-if="props.info['used'] == 0 && props.info['total'] == 0" class="text-red">(未启用)</span></div>
        <div v-if="(props.title == 'speed' || props.title == 'netCount' || props.title == 'load')" class="text-grey-8">
          {{ information }}
        </div>
        <div v-if="props.title == 'user'" class="text-caption text-grey-8">
          已使用{{ (userFlow / 1024).toFixed(2) }}GB/总流量:400GB
        </div>
      </div>
      <div v-if="props.title != 'user' && props.title != 'speed' && props.title != 'netCount' && props.title != 'load'">
        <q-linear-progress stripe rounded size="20px" :value="information / 100" :color="color" class="q-mt-sm" />
      </div>
      <div v-if="props.title == 'user'">
        <q-linear-progress stripe rounded size="20px" :value="information / 100" :color="color" class="q-mt-sm" />
      </div>
      <div></div>
    </div>
  </div>

</template>

<style lang='scss' scoped>
.cpu {
  aspect-ratio: 1;
}

.disk {
  width: 100%;
}
</style>
