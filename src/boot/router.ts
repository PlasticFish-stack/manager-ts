import { boot } from 'quasar/wrappers';
import { UseLoginStore } from 'stores/login-store';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ router }) => {
  const whiteList: string[] = ['login'];
  router.beforeEach(to => {
    const loginStore = UseLoginStore();
    if (typeof to.name === 'string' && !whiteList.includes(to.name)) {
      if (loginStore.loginToken === null) {
        return { name: 'login' };
      }
    }
    if (whiteList.includes(to.name as string)) {
      if (loginStore.loginToken !== null) {
        return { name: 'home' };
      }
    }
  });
});
