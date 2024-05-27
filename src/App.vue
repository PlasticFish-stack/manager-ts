<template>
  <router-view />
</template>

<script setup lang="ts">
// import { onMounted } from 'vue'
// import { useScreen } from 'src/composition/screenInfo';
// const { instancing } = useScreen()
import { UseTitleStore } from 'stores/title-store'
const titleStore = UseTitleStore()
onMounted(() => {
  titleStore.getTitle()
})
defineOptions({
  name: 'App'
});
// onMounted(() => {
//   instancing()
// })
</script>
