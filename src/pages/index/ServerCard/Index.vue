<template>
  <div class="q-pa-lg" :class="layouts.container.class" :style="(layouts.container.css as StyleValue)">
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
    <button @click="console.log(darkStore.dark)"></button>
  </div>
</template>

<script setup lang="ts">
import cpu from './components/cpu.vue'
import disk from './components/disk.vue'
import memory from './components/memory.vue'

import { useScreen } from 'src/composition/screenInfo';
import { StyleValue } from 'vue';
import { UseDarkStore } from 'stores/dark-store'

// interface Layout {
//   mobile: { [key: string]: object };
//   desktop: { [key: string]: object };
// }

const props = defineProps(['msg'])
const darkStore = UseDarkStore()

const { layoutFormat } = useScreen()
const layoutsFormat = () => {
  return {
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
          'column', darkStore.dark ? 'container_dark' : 'container'
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
    }
  }
}

let layouts = layoutFormat(layoutsFormat, true)


</script>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  // font-weight: ;
  background: linear-gradient(90deg, rgb(247, 247, 247), rgb(255, 255, 255));
  box-shadow: 2px 2px 3px 2px rgb(212, 206, 206);
}

.container_dark {
  box-shadow: none;
  background-color: rgb(83, 83, 83);
}
</style>
