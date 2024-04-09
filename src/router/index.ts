import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { UseLoginState } from 'stores/login-store';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });
  const whiteList: string[] = ['login'];
  Router.beforeEach((to) => {
    const loginStore = UseLoginState();
    console.log(to, 'to');
    console.log(loginStore.localLoginState);
    if (loginStore.localLoginState === null) {
      return { name: 'login' };
    }
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
  return Router;
});
