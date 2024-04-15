<template>
  <q-layout view="hHh lpr lFf">
    <q-header class="q-pa-sm transparent">
      <div class="fillet-dark q-pa-xs">
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
        </q-toolbar>
      </div>

    </q-header>

    <q-drawer class="q-py-sm" persistent show-if-above :model-value="true" :mini="leftDrawerOpen" :mini-width="56"
      :width="200" side="left">
      <q-list>
        <q-item clickable @click="toggleLeftDrawer">
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
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
let link = ref('home')
const leftDrawerOpen = ref(true);

function toggleLeftDrawer() {
  console.log(leftDrawerOpen.value);

  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
