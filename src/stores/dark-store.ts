import { defineStore } from 'pinia';
import { computed } from 'vue';
// import { useScreen } from 'src/composition/screenInfo';
import { LocalStorage, useQuasar } from 'quasar';

export const UseDarkStore = defineStore('dark', () => {
  const $q = useQuasar();
  // const screen = useScreen();
  const dark = computed(() => {
    return $q.dark.isActive;
  });
  if (LocalStorage.getItem('dark') !== null) {
    const res = LocalStorage.getItem('dark');
    $q.dark.set(res === true);
  } else {
    LocalStorage.set('dark', dark.value);
  }
  async function darkStateChange() {
    $q.dark.set(!dark.value);
    LocalStorage.set('dark', dark.value);
  }
  return { dark, darkStateChange };
});
