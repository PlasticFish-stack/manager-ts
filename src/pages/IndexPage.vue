<template>
  <q-page class="row q-pt-xs q-pb-md q-px-sm q-pl-xs">
    <div class="column q-pa-md bg-grey-11" style="flex: 1; border-radius: 8px; overflow: hidden;">
      <CircleProgessCard ratio :info="info.serverMsg['cpu']" title="cpu" />
      <!-- <div class="row q-mb-md" style=" height: 10rem;">
        <CircleProgessCard />
        <ServerInfocard class="q-mr-md" style="height: 100%;" :info="info.serverMsg['cpu']" title="cpu" />
        <ServerInfocard style="flex: 1;" :info="info.serverMsg['memory']" title="memory" />
      </div>
      <div class="row q-mb-md gt-md" style="flex: 1;">
        <ServerInfocard class="q-mr-md full-width" :info="info.serverMsg['disk']" title="disk" />
      </div>
      <div class="row q-mb-md" style="flex: 1;">
        <ServerInfocard style="flex: 1;" class="q-mr-md lt-lg" :info="info.serverMsg['disk']" title="disk" />
        <ServerInfocard style="flex: 1;" class="q-mr-md" :info="info.serverMsg['disk']" title="disk" />
        <ServerInfocard style="flex: 1;" :info="info.serverMsg['swap']" title="swap" />
      </div>
      <div class="row" style="height: 10rem;">
        <ServerInfocard class="q-mr-md" style="flex: 1;" :info="info.serverMsg['netCount']" title="netCount" />
        <ServerInfocard class="q-mr-md" style="flex: 1;" :info="info.serverMsg['load']" title="load" />
        <ServerInfocard style="flex: 1;" :info="info.serverMsg['speed']" title="speed" />
      </div> -->
    </div>
    <div class="bg-deep-purple q-ml-md desktop-only col-7 gt-md" style="border-radius: 8px; overflow: hidden;">

    </div>
  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import ServerInfocard from 'components/ServerInfocard.vue';
import CircleProgessCard from 'components/CircleProgessCard.vue';

import { useInfo } from 'src/composition/serverInfo';
import { onMounted, onUnmounted } from 'vue'
const info = useInfo()
info.InfoGet()

let systemInformation: number | null | NodeJS.Timeout = null
onMounted(() => {
  systemInformation = setInterval(() => {
    info.InfoGet()
  }, 10000)
})
onUnmounted(() => {
  if (systemInformation !== null) {
    clearInterval(systemInformation)
  }

})
</script>
<style lang="scss"></style>
