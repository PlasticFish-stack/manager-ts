<template>
  <q-layout view="lHh lpr lFf" v-touch-swipe.left.right="swipeDrawer">
    <q-header class="q-pa-sm transparent">
      <div class="fillet-dark q-py-xs">
        <q-toolbar>
          <q-avatar rounded>
            <img src="src/assets/anime/404.png">
            <q-menu :offset="[10, 20]">
              <div class="column q-pa-xl no-wrap items-center justify-between">
                <q-avatar size="120px">
                  <img src="src/assets/anime/404.png">
                </q-avatar>
                <div class="text-h6">
                  管理员
                </div>
                <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
              </div>
            </q-menu>
          </q-avatar>
          <q-space />
          <!-- <div class="mobile-only text-h5"> {{ titleStore.webTitle }}</div> -->
          <q-space />
          <q-btn padding="sm" color="red-7" :icon="swipeDrawerOpen ? 'menu_open' : 'menu'" @click="DrawerOpen"
            class="q-mini-drawer-hide mobile-only" />
        </q-toolbar>
      </div>

    </q-header>

    <q-drawer class="q-py-sm column hide-scrollbar" persistent show-if-above v-model="swipeDrawerOpen"
      :mini="leftDrawerOpen" :mini-width="56" no-swipe-close no-swipe-open no-swipe-backdrop :width="200" side="left">
      <q-list>
        <q-item clickable @click="toggleLeftDrawer" class="desktop-only">
          <q-item-section avatar>
            <q-icon :name="!leftDrawerOpen ? 'menu_open' : 'menu'" />
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'home'" @click="link = 'home'"
          to="home">
          <q-item-section avatar>
            <q-icon name="cruelty_free" />
          </q-item-section>
          <q-item-section>首页</q-item-section>
        </q-item>
        <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'robot'" @click="link = 'robot'">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section class="text-">GPT Chat</q-item-section>
        </q-item>
        <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'group'" @click="link = 'group'">
          <q-item-section avatar>
            <q-icon name="groups" />
          </q-item-section>
          <q-item-section>用户管理</q-item-section>
        </q-item>
      </q-list>
      <q-space />
      <!-- <q-btn @click="() => { mode }">123</q-btn> -->
      <Transition name="modeMoblie" class="mobile-only">
        <div class="row justify-center full-width" v-show="swipeDrawerOpen">
          <DarkMode style="transform: scale(0.4);" />
        </div>
      </Transition>
      <Transition name="modeDesktop" class="desktop-only">
        <div class="row justify-center cursor-pointer full-width" v-show="!leftDrawerOpen">
          <DarkMode style="transform: scale(0.35);" />
        </div>
      </Transition>

    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginUser } from 'src/api/permission';
// import { UseTitleStore } from 'src/stores/title-store';
import DarkMode from 'components/DarkMode.vue'
interface SwiperTouch {
  evt?: Event,
  touch?: boolean,
  mouse?: boolean,
  direction?: string,
  duration?: number,
  distance?: object
}
// const titleStore = UseTitleStore()
let link = ref('home')
const user = ref<string>('')
const leftDrawerOpen = ref(true);
const swipeDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function swipeDrawer({ ...info }: SwiperTouch) {
  if (info.direction == 'left') {
    return swipeDrawerOpen.value = false
  }
  return swipeDrawerOpen.value = true
}
function DrawerOpen() {
  swipeDrawerOpen.value = !swipeDrawerOpen.value
}
async function verify() {
  try {
    const res = await loginUser()
    user.value = res.data.username
  } catch {
    console.log('登录状态异常,请重新登录');
  }
}
verify()
</script>
<style lang="scss">
.modeMoblie-enter-active {
  animation: flipInX 0.5s;
}

.modeDesktop-enter-from {
  opacity: 1;
}

.modeDesktop-enter-active {
  animation: flipInX 0.5s;
}

.modeDesktop-enter-to {
  opacity: 1;
}

.modeDesktop-leave-to {
  opacity: 0;
}
</style>
