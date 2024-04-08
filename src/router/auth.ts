import { boot } from 'quasar/wrappers';
const whiteList: string[] = ['login'];
export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const loginStore = UseLoginState();
    if (!whiteList.includes(to.name)) {
      if (loginStore.token === null) {
        return { name: 'login' };
      }
    } else {
      // if (loginStore.token !== null) {
      //   return { name: 'index' }
      // }
    }
    // Now you need to add your authentication logic here, like calling an API endpoint
  });
});
