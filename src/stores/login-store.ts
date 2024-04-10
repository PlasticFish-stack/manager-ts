import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';

// import { loginStateReg } from '@/utils/request.js'
export const UseLoginStore = defineStore('login', () => {
  const router = useRouter();
  const loginState = ref<boolean>(false);
  if (LocalStorage.getItem('login') !== null) {
    const res = LocalStorage.getItem('login');
    loginState.value = res === true;
  } else {
    LocalStorage.set('login', false);
  }
  function loginExit() {
    loginState.value = false;
    router.push('/login');
  }
  function login() {
    loginState.value = true;
    LocalStorage.set('login', true);
  }
  return { loginState, loginExit, login };
});
