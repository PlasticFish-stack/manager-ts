<template>
  <q-page class="row q-py-md q-pr-sm q-pl-xs">
    <div class="bg-blue row" style="flex: 1">
      <div class="col-5 column">
        <ServerInfocard />

      </div>
      <div class="col-7 row">
        <div class="bg-red" style="flex: 1;">1</div>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
// import { ref } from 'vue';
import ServerInfocard from 'components/ServerInfocard.vue';

defineOptions({
  name: 'IndexPage'
});
</script>
