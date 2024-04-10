import { defineStore } from 'pinia';
import { ref } from 'vue';

export const UseProgressStore = defineStore('progress', () => {
  const progress = ref(0);
  const timer = ref<number | undefined | null>(null);
  const status = ref(false);
  return { progress, timer, status };
});
