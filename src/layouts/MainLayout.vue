<template>
  <q-layout view="hHh lpr lFf">
    <q-header class="q-pa-sm transparent">
      <div class="fillet-dark ">
        <q-toolbar>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        </q-toolbar>
      </div>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
