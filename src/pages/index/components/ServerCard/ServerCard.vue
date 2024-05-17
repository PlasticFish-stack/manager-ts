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
    <div class="disk title q-mt-sm row items-center justify-between">
      <div>
        <div class="title">DISK</div>
        <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">磁盘</span>
      </div>
      <div style="width: 50%; font-size: 0.7rem; font-weight: 500;" v-if="props.msg.disk" class="row items-center">
        <div style="position: absolute; width: 300px; margin-top: -35px;">
          已用{{ byte(props.msg.disk['used']) }}MB/{{ byte(props.msg.disk['used'] + props.msg.disk['free']) }}MB
        </div>
        <div style="flex: 1; height: 100%; display: flex; justify-content: center;">
          <q-linear-progress reverse stripe rounded size="20px" track-color="grey"
            :value="byte(props.msg.disk['used']) / byte(props.msg.disk['used'] + props.msg.disk['free'])" color="red" />
        </div>

      </div>
    </div>
    <div class="memory title row items-center justify-between">
      <div>
        <div class="title">MEMORY</div>
        <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">运行内存</span>
      </div>
      <div style="width: 50%; font-size: 0.7rem; font-weight: 500;" v-if="props.msg.disk" class="row items-center">
        <div style="position: absolute; width: 300px; margin-top: -35px;">
          已用{{ byte(props.msg.memory['used']) }}MB/{{ byte(props.msg.memory['total']) }}MB
        </div>
        <div :class="(+(props.msg.memory['used'] / props.msg.memory['total'] * 100).toFixed(2)) > 80 ? 'text-red-6' :
    (+(props.msg.memory['used'] / props.msg.memory['total'] * 100).toFixed(2)) > 60 ? 'text-deep-orange-6' :
      (+(props.msg.memory['used'] / props.msg.memory['total'] * 100).toFixed(2)) > 25 ? 'text-orange-6' :
        (+(props.msg.memory['used'] / props.msg.memory['total'] * 100).toFixed(2)) > 0 ? 'text-teal-6' : ''
    " style="position: absolute; width: 50px; margin-left: -55px; display: flex; justify-content: flex-end">
          {{ (props.msg.memory['used'] / props.msg.memory['total'] * 100).toFixed(2) }}%
        </div>
        <div style="flex: 1; height: 100%; display: flex; justify-content: center;">
          <q-linear-progress reverse stripe rounded size="20px" track-color="grey"
            :value="byte(props.msg.memory['used']) / byte(props.msg.memory['total'])" color="red" />
        </div>

      </div>
    </div>
    <div class="load title row items-center justify-between">
      <div>
        <div class="title">LOAD</div>
        <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">负载</span>
      </div>
      <div style="width: 50%; font-size: 0.7rem; font-weight: 500;" v-if="props.msg.disk" class="row items-center">
        <div style="position: absolute; width: 300px; margin-top: -35px;">
          已用{{ byte(props.msg.memory['used']) }}MB/{{ byte(props.msg.memory['total']) }}MB
        </div>
        <div style="flex: 1; height: 100%; display: flex; justify-content: center;">
          <q-linear-progress reverse stripe rounded size="20px" track-color="grey"
            :value="byte(props.msg.memory['used']) / byte(props.msg.memory['total'])" color="red" />
        </div>

      </div>
    </div>
    <div class="memory title row items-center justify-between">
      <div>
        <div class="title">MEMORY</div>
        <span style="font-size: 0.9rem; font-weight: 600;" class="text-grey-8">运行内存</span>
      </div>
      <div style="width: 50%; font-size: 0.7rem; font-weight: 500;" v-if="props.msg.disk" class="row items-center">
        <div style="position: absolute; width: 300px; margin-top: -35px;">
          已用{{ byte(props.msg.memory['used']) }}MB/{{ byte(props.msg.memory['total']) }}MB
        </div>
        <div style="flex: 1; height: 100%; display: flex; justify-content: center;">
          <q-linear-progress reverse stripe rounded size="20px" track-color="grey"
            :value="byte(props.msg.memory['used']) / byte(props.msg.memory['total'])" color="red" />
        </div>

      </div>
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
function byte(data: number) {
  return +(data / 1024 / 1024).toFixed(2)
}
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
