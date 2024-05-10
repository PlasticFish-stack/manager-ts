<template>
  <div class="container q-pa-lg" :class="layouts.container.class" :style="(layouts.container.css as StyleValue)">
    <div :class="layouts.title.class" :style="(layouts.title.css as StyleValue)">
      <span>Server Info</span>
      <span style="font-size: 1.1rem; font-weight: 600;" class="text-grey-8">服务器信息</span>
    </div>
    <div class="cpu q-mt-sm row items-center justify-between">
      <div>
        <div class="title">CPU</div>
        <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">处理器</span>
      </div>
      <div v-if="props.msg.cpu" style="font-size: 1.1rem; font-weight: 600;" :class="(props.msg.cpu)[0] > 80 ? 'text-red-6' :
    (props.msg.cpu)[0] > 60 ? 'text-deep-orange-6' :
      (props.msg.cpu)[0] > 25 ? 'text-orange-6' :
        (props.msg.cpu)[0] > 0 ? 'text-teal-6' : ''
    ">{{ (props.msg.cpu)[0].toFixed(2) + '%' }}
      </div>
    </div>
    <div class="disk title q-mt-sm">
      <div>
        <div class="title">DISK</div>
        <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">磁盘</span>
      </div>
      <div>
        {{ (props.msg.disk) }}
      </div>
    </div>
    <div class="memory title">
      memory {{ props.msg.memory }}
    </div>
    <div class="load title">
      load {{ props.msg.load }}
    </div>
    <div class="swap title">
      swap {{ props.msg.swap }}
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
        'column'
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
  },
})
const layouts = layoutFormat(layoutsFormat)
</script>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  // font-weight: ;
  background: linear-gradient(90deg, rgb(255, 255, 255), rgb(236, 236, 236));
  box-shadow: 2px 2px 6px 2px rgb(212, 206, 206);
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: $grey-9;
}
</style>
