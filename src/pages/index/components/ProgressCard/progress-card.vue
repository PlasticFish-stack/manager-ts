<template>
  <div class="container " :class="layouts.container.class" :style="(layouts.container.css as StyleValue)">
    <div class="info">
      <div id="title">1</div>
      <div id="name">2</div>
    </div>
    <div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useScreen } from 'src/composition/screenInfo';
import { StyleValue } from 'vue';
interface Layout {
  mobile: { [key: string]: object };
  desktop: { [key: string]: object };
}
interface Res {
  [key: string]: {
    [key: string]: object | string[];
  };
}
const props = defineProps(['msg'])
console.log(props.msg);

const { screen } = useScreen()
const layoutsFormat: Record<string, Layout> = reactive({
  container: {
    mobile: {
      css: {
        width: '100%'
      },
      class: [
        'bg-green',
        'row'
      ]
    },
    desktop: {
      css: {

      },
      class: [
        'bg-red',
      ]
    }
  }
})
const layouts = computed(() => {
  const res: Res = {}; // 明确定义res的类型
  for (let item in layoutsFormat) {
    if (screen.name === 'xs') {
      res[item] = layoutsFormat[item].mobile;
    } else {
      res[item] = layoutsFormat[item].desktop;
    }
  }
  return res;
});
console.log(layouts.value, 'i');

</script>

<style scoped lang="scss">
.container {
  border-radius: 8px;
}
</style>
