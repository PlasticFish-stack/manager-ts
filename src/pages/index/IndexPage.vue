<template>
  <q-page class="row q-pt-xs q-pb-md q-px-sm q-pl-xs" style="overflow: hidden;">
    <div class="column" style="width: 850px; border-radius: 8px; ">
      <div class="column no-wrap" style="flex: 1;">
        <div class="row">
          <ServerCard :msg="serverMsg" style="flex: 1;" />
        </div>
        <div class="row  q-mt-md" style="flex: 1 ">
          <DomainCard style="flex: 1;"></DomainCard>
        </div>
        <div class="row bg-blue q-mt-md desktop-only" v-if="screen.height > 1080" style="flex: 1;">

        </div>
      </div>
    </div>
    <div class="bg-green column q-ml-md desktop-only" style="flex: 1;border-radius: 4px; overflow: hidden;">

    </div>
  </q-page>
</template>

<script setup lang="ts">
import ServerCard from './ServerCard'
import DomainCard from './DomainCard'
import { useInfo } from 'src/composition/serverInfo';
import { useScreen } from 'src/composition/screenInfo';
const { screen } = useScreen()
console.log(screen.height);

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
