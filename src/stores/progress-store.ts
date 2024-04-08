import { defineStore } from 'pinia';
import { ref } from 'vue';

export const UseProgressState = defineStore('progress', () => {
  const progress = ref(0);
  const timer = ref(null);
  const status = ref(false);
  return { progress, timer, status };
});
