<template>
  <q-page class="row q-pt-xs q-pb-md q-px-sm q-pl-xs" style="overflow: hidden;">
    <div class="column" style="width: 850px; border-radius: 8px; ">
      <div class="column">
        <div class="row q-gutter-x-md">
          <ServerCard :msg="serverMsg" style="flex: 1;" />
        </div>
      </div>
    </div>
    <div class="bg-blue column " style="flex: 1;border-radius: 8px; overflow: hidden;"
      :class="[screen.name != 'xs' ? 'q-ml-md' : '']">

    </div>
  </q-page>
</template>

<script setup lang="ts">
import ServerCard from './ServerCard'
import { useInfo } from 'src/composition/serverInfo';
import { useScreen } from 'src/composition/screenInfo';
const { screen } = useScreen()
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
