import { defineStore } from 'pinia';
import { ref } from 'vue'
import { LocalStorage } from 'quasar'

export const useDarkStore = defineStore('dark', () => {
  const dark = ref<boolean>(false);
  if (LocalStorage.getItem('dark') !== null) {
    const res = LocalStorage.getItem('dark')
    dark.value = res === 'true'
  } else {
    LocalStorage.set('dark', false)
  }
  function darkStateChange(): void {
    dark.value = true
    LocalStorage.set('dark', dark.value)
  }
  return { dark, darkStateChange }
});
