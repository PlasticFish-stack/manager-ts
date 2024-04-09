import { boot } from 'quasar/wrappers';
import { UseLoginState } from 'stores/login-store';

const whiteList: string[] = ['login'];
export default boot(({ router }) => {
  router.beforeEach((to) => {
    const loginStore = UseLoginState();
    if (typeof to.name === 'string' && !whiteList.includes(to.name)) {
      if (loginStore.localLoginState === false) {
        return { name: 'login' };
      }
    } else {
      if (loginStore.localLoginState !== false) {
        return { name: 'index' };
      }
    }
  });
});
