import { defineStore } from 'pinia';
import { computed } from 'vue';
import { LocalStorage, useQuasar } from 'quasar';

export const UseDarkStore = defineStore('dark', () => {
  const $q = useQuasar();
  const dark = computed(() => {
    return $q.dark.isActive;
  });
  if (LocalStorage.getItem('dark') !== null) {
    const res = LocalStorage.getItem('dark');
    $q.dark.set(res === true);
  } else {
    LocalStorage.set('dark', dark.value);
  }
  function darkStateChange(): void {
    $q.dark.set(!dark.value);
    LocalStorage.set('dark', dark.value);
    (async () => {
      await nextTick();
    })();
  }
  return { dark, darkStateChange };
});
