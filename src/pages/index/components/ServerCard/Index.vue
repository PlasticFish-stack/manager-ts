<template>
  <div class="container q-pa-lg" :class="layouts.container.class" :style="(layouts.container.css as StyleValue)">
    <div :class="layouts.title.class" :style="(layouts.title.css as StyleValue)">
      <span>Server Info</span>
      <span style="font-size: 1.1rem; font-weight: 600;" class="text-grey-8">服务器信息</span>
    </div>
    <div class="cpu q-mt-sm row items-center justify-between">
      <cpu v-if="props.msg.cpu" :msg="(props.msg.cpu)[0]" />
    </div>
    <div class="disk title q-mt-sm row items-center justify-between">
      <disk v-if="props.msg.disk" :msg="props.msg.disk" />
    </div>
    <div class="memory title row items-center justify-between">
      <memory v-if="props.msg.memory" :msg="props.msg.memory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import cpu from './cpu.vue'
import disk from './disk.vue'
import memory from './memory.vue'

import { useScreen } from 'src/composition/screenInfo';
import { StyleValue } from 'vue';
interface Layout {
  mobile: { [key: string]: object };
  desktop: { [key: string]: object };
}

const props = defineProps(['msg'])
console.log(props.msg);

const { layoutFormat } = useScreen()
const layoutsFormat: Record<string, Layout> = reactive({
  container: {
    mobile: {
      css: {
        height: '100%',
        width: '100%'
      },
      class: [
        'column'
      ]
    },
    desktop: {
      css: {

      },
      class: [
        'column'
      ]
    }
  },
  title: {
    mobile: {
      css: {
        fontSize: '1.6rem',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'

      },
      class: [
        'text-grey-9'
      ]
    },
    desktop: {
      css: {
        fontSize: '1.6rem',
        fontWeight: '600',
        display: 'flex',
        flexDirection: 'column'
      },
      class: [
        'text-grey-9'
      ]
    }
  },
})
const layouts = layoutFormat(layoutsFormat)
</script>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  // font-weight: ;
  background: linear-gradient(90deg, rgb(255, 255, 255), rgb(236, 236, 236));
  box-shadow: 2px 2px 6px 2px rgb(212, 206, 206);
}
</style>
