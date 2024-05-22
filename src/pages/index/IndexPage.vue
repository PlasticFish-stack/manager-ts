<template>
  <q-page class="row q-pt-xs q-pb-md q-px-sm q-pl-xs" style="overflow: hidden;">
    <div class="column" style="width: 800px; border-radius: 8px; overflow: hidden;">
      <div class="column" :class="layouts.container.class" :style="(layouts.container.css as StyleValue)">
        <div class="row q-gutter-x-md">
          <ServerCard :msg="serverMsg" style="flex: 1;" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import ServerCard from './ServerCard'
import { useInfo } from 'src/composition/serverInfo';
import { onMounted, onUnmounted, StyleValue } from 'vue'
import { useScreen } from 'src/composition/screenInfo'
// interface Layout {
//   mobile: { [key: string]: object };
//   desktop: { [key: string]: object };
// }

const { layoutFormat } = useScreen()
const layoutsFormat = () => {
  return {
    container: {
      mobile: {
        css: {
          flex: '1',
          height: '100%'
        },
        class: [

        ]
      },
      desktop: {
        css: {

        },
        class: [
          'q-ma-xs'
        ]
      }
    }
  }
}
const layouts = layoutFormat(layoutsFormat)
// serverMsg,
const { InfoGet, serverMsg } = useInfo()
InfoGet()
let systemInformation: number | null | NodeJS.Timeout = null
onMounted(() => {
  systemInformation = setInterval(() => {
    InfoGet()
  }, 10000)
})
onUnmounted(() => {
  if (systemInformation !== null) {
    clearInterval(systemInformation)
  }

})
</script>
<style lang="scss"></style>
