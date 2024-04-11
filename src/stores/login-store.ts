import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage, WebStorageGetMethodReturnType } from 'quasar';
import { useRouter } from 'vue-router';

// import { loginStateReg } from '@/utils/request.js'
export const UseLoginStore = defineStore('login', () => {
  const router = useRouter();
  const loginState = ref<WebStorageGetMethodReturnType | null>(null);
  if (LocalStorage.getItem('token') !== null) {
    const res = LocalStorage.getItem('token');
    console.log(res);

    loginState.value = res;
  } else {
    LocalStorage.set('token', '');
  }
  function loginExit() {
    loginState.value = null;
    router.push('/login');
  }
  function login(val: string) {
    loginState.value = true;
    LocalStorage.set('token', val);
  }
  return { loginState, loginExit, login };
});
