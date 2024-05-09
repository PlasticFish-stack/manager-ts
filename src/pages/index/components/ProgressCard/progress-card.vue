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

const props = defineProps(['msg'])
console.log(props.msg);

const { layoutFormat } = useScreen()
const layoutsFormat: Record<string, Layout> = reactive({
  container: {
    mobile: {
      css: {
        height: '8rem',
        width: '100%'
      },
      class: [
        'row'
      ]
    },
    desktop: {
      css: {
        height: '8rem',
        width: '100%'
      },
      class: [

      ]
    }
  }
})
const layouts = layoutFormat(layoutsFormat)
console.log(layouts.value, 'i');

</script>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  // background-color: rgb(191, 29, 231);
  background: linear-gradient(90deg, #5a67e0, #a811da)
}
</style>
