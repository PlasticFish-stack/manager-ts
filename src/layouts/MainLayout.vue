<template>
  <q-layout view="lHh lpr lFf" v-touch-swipe.left.right="swipeDrawer" @scroll="scrollHandler" class="scrollWindow">
    <q-header class="header" :class="headerBg ? 'transparent q-pa-sm' : ''">
      <div class="headerInner q-py-xs" :class="headerBg ? 'fillet-dark' : ''">
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
          <div class="mobile-only titleLink">
            <q-icon :name="titleLink" />
          </div>
          <q-space />
          <q-btn padding="sm" :icon="swipeDrawerOpen ? 'menu_open' : 'menu'" @click="DrawerOpen"
            class="q-mini-drawer-hide mobile-only barBtn" />
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
        <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'home'" @click="linkJump('home')"
          to="home">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>首页</q-item-section>
        </q-item>
        <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'robot'" @click="linkJump('robot')"
          to="robot">
          <q-item-section avatar>
            <q-icon name="smart_toy" />
          </q-item-section>
          <q-item-section class="text-">GPT Chat</q-item-section>
        </q-item>
        <q-item clickable v-ripple active-class="my-menu-link" :active="link === 'group'" @click="linkJump('group')"
          to="group">
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
          <DarkBtn style="transform: scale(0.4);" />
        </div>
      </Transition>
      <Transition name="modeDesktop" class="desktop-only">
        <div class="row justify-center cursor-pointer full-width" v-show="!leftDrawerOpen">
          <DarkBtn style="transform: scale(0.35);" />
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
import gsap from 'gsap'
import { dom } from 'quasar'


defineOptions({
  preFetch() {
    async function verify() {
      try {
        await loginUser()
      } catch {
        console.log('登录状态异常,请重新登录');
      }
    }
    verify()
  }
})
// import { UseTitleStore } from 'src/stores/title-store';
interface SwiperTouch {
  evt?: Event,
  touch?: boolean,
  mouse?: boolean,
  direction?: string,
  duration?: number,
  distance?: object
}
const { height } = dom
// const titleStore = UseTitleStore()
let link = ref('home')
const titleLink = computed(() => {
  let res = ''
  switch (true) {
    case link.value == 'home':
      res = 'home';
      break;
    case link.value == 'robot':
      res = 'smart_toy';
      break;
    case link.value == 'group':
      res = 'groups';
      break;
  }
  return res
})
const user = ref<string>('')
const headerBg = ref(true)
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
onMounted(() => {
  let ele = document.querySelector('.headerInner')
  if (ele) {
    headerInner.value = height(ele)
  }
})
const headerInner = ref(0)
const complete = ref(true)
const inner = gsap.timeline()
function scrollHandler(evt: { position: number; }) {

  if (evt.position > 1 && headerBg.value) {
    headerBg.value = false
    if (complete.value) {
      console.log(complete.value);
      inner.to('.headerInner', {
        immediateRender: true,
        overwrite: true,
        height: headerInner.value + 12,
        duration: 0.4,
        ease: 'none',
        onStart: () => {
          complete.value = false
        },
        onComplete: () => {
          complete.value = true
        }
      }).to('.barBtn', {
        immediateRender: true,
        duration: 0,
        background: 'rgb(241, 187, 87)'
      }, 0.2).to('.barBtn', {
        immediateRender: true,
        duration: 0,
        background: 'linear-gradient(90deg, rgb(241, 187, 87), rgb(255, 156, 27))'
      }, 0.4)
    }

    return
  }
  if (evt.position <= 1) {
    headerBg.value = true
    if (complete.value) {
      inner.to('.headerInner', {
        height: headerInner.value,
        duration: 0,
        ease: 'none',
        onStart: () => {
          complete.value = true
        },
      }).to('.barBtn', {
        immediateRender: true,
        duration: 0,
        background: 'rgb(235, 111, 111)'
      }, 0.2).to('.barBtn', {
        background: 'linear-gradient(180deg, rgb(235, 111, 111), rgb(201, 53, 53))'
      }, 0.4)
    }
  }
}
function linkJump(str: string) {
  if (link.value == str) {
    return
  }
  link.value = str
  swipeDrawerOpen.value = false
  // if (window.scrollY > 1 && headerBg.value) {
  //   headerBg.value = false
  //   if (complete.value) {
  //     console.log(complete.value);
  //     inner.to('.headerInner', {
  //       immediateRender: true,
  //       overwrite: true,
  //       height: headerInner.value + 12,
  //       duration: 0.4,
  //       ease: 'none',
  //       onStart: () => {
  //         complete.value = false
  //       },
  //       onComplete: () => {
  //         complete.value = true
  //       }
  //     }).to('.barBtn', {
  //       immediateRender: true,
  //       duration: 0,
  //       background: 'rgb(241, 187, 87)'
  //     }, 0.2).to('.barBtn', {
  //       immediateRender: true,
  //       duration: 0,
  //       background: 'linear-gradient(90deg, rgb(241, 187, 87), rgb(255, 156, 27))'
  //     }, 0.4)
  //   }
  //   return
  // }
  if (window.scrollY <= 1) {
    headerBg.value = true
    if (complete.value) {
      inner.to('.headerInner', {
        height: headerInner.value,
        duration: 0,
        ease: 'none',
        onStart: () => {
          complete.value = true
        },
      }).to('.barBtn', {
        immediateRender: true,
        duration: 0,
        background: 'rgb(235, 111, 111)'
      }, 0.2).to('.barBtn', {
        background: 'linear-gradient(180deg, rgb(235, 111, 111), rgb(201, 53, 53))'
      }, 0.4)
    }
  }
}
async function loginVerify() {
  try {
    const res = await loginUser()
    user.value = res.data.username
  } catch {
    console.log('登录状态异常,请重新登录');
  }
}
loginVerify()
onMounted(() => {
  // gsap.to('.barBtn', {
  //   background: 'black'
  // })
})
</script>
<style lang="scss">
.barBtn {
  background: linear-gradient(180deg, rgb(235, 111, 111), rgb(201, 53, 53))
}

.titleLink {
  color: var(--title-link);
  font-size: 1.8rem;
  display: flex;

}

.header {
  background: var(--gradient-bar);
  border-radius: 0px 0px 5px 5px;
  overflow: hidden;
}

.headerInner {
  display: flex;
  justify-content: center;
  overflow: hidden;
}

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
