import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import { check } from 'src/api/permission';
import { ref } from 'vue';

export const UseTitleStore = defineStore('title', () => {
  const webTitle = ref<string | null>(null);
  async function getTitle() {
    try {
      const res = await check();
      document.title = res.data.title;
      titleManager(res.data.title);
      return;
    } catch {
      console.log('获取失败重新获取');
      getTitle();
    }
  }

  function titleManager(title: string) {
    if (title) {
      LocalStorage.set('title', title);
      webTitle.value = title;
      document.title = title;
    }
    return LocalStorage.getItem('title');
  }
  return { webTitle, titleManager, getTitle };
});
