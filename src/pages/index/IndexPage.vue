<template>
  <q-page class="row q-pt-xs q-pb-md q-px-sm q-pl-xs">
    <div class="column bg-grey-11" style="width: 1200px; border-radius: 8px; overflow: hidden;">

      <div class="column q-ma-sm">
        <ProgressCard class="col-auto" />
        <!-- <CircleProgessCard circle ratio :info="serverMsg['cpu']" title="cpu" />
        <CircleProgessCard circle :ratio="false" :info="serverMsg['memory']" title="memory" /> -->
      </div>
      <!-- <div class="" style="flex: 1; display: flex">
        <ListCard circle fixed :info="info.userMsg" />
      </div> -->
    </div>
    <!-- <div class="bg-deep-purple desktop-only gt-md " style="flex: 1; border-radius: 8px; overflow: hidden;">
      123
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
// import ListCard from './components/ListCard.vue';
// import CircleProgessCard from './components/CircleProgessCard.vue';
import ProgressCard from './components/ProgressCard'
import { useInfo } from 'src/composition/serverInfo';
import { onMounted, onUnmounted } from 'vue'
import { useScreen } from 'src/composition/screenInfo'
const layouts = {

}
console.log(layouts);
// serverMsg,
const { InfoGet } = useInfo()
const { screen } = useScreen()
watch(screen, (o, n) => {
  console.log(o, n);

})
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
