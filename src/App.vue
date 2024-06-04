<template>
  <router-view />
</template>

<script setup lang="ts">
// import { onMounted } from 'vue'
// import { useScreen } from 'src/composition/screenInfo';
// const { instancing } = useScreen()
import { UseTitleStore } from 'stores/title-store'
import request from 'src/api/index'
const titleStore = UseTitleStore()
console.log(request);

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
