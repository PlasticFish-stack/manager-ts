import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage } from 'quasar';
import { useRouter } from 'vue-router';

// import { loginStateReg } from '@/utils/request.js'
export const UseLoginStore = defineStore('login', () => {
  const router = useRouter();
  const loginToken = ref<string | null>(null);
  const resLocalToken: string | undefined = LocalStorage.getItem('token')?.toString();
  if (resLocalToken != undefined && resLocalToken.length != 0) {
    loginToken.value = resLocalToken;
  } else {
    loginExit();
  }
  function loginExit() {
    loginToken.value = null;
    router.push('/login');
  }
  function login(val: string) {
    loginToken.value = val;
    LocalStorage.set('token', val);
  }
  return { loginToken, loginExit, login };
});
