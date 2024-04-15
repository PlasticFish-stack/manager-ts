import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
// import { UseLoginStore } from 'stores/login-store';
import { UseProgressStore } from 'stores/progress-store';
import { UseLoginStore } from 'stores/login-store';
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton api here;
// If any client changes this (global) api, it might be a
// good idea to move this api creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: '/api',
  validateStatus,
});

api.interceptors.response.use(function (config) {
  return config.data;
});

api.interceptors.request.use(
  function (config) {
    const loginStore = UseLoginStore();
    const progressStore = UseProgressStore();
    if (loginStore.loginToken) {
      config.headers.Authorization = `Bearer ${loginStore.loginToken}`;
    }
    // const loginStore = UseLoginStore();
    progressStore.progress = 0;
    progressStore.timer = null;
    // if (loginStore.token) {
    //   config.headers.Authorization = `Bearer ${loginStore.token}`;
    // }
    if (progressStore.status == true) {
      config.onUploadProgress = e => {
        if (e.total == undefined) return;
        const complete = (e.loaded / e.total) * 100;
        if (complete >= 80) {
          if (progressStore.timer) return;
          progressStore.timer = window.setInterval(() => {
            if (progressStore.status == false && progressStore.timer != null && progressStore.timer != undefined) {
              window.clearInterval(progressStore.timer);
              return (progressStore.progress = 100);
            }
            progressStore.progress += (100 - progressStore.progress) * 0.2;
            if (progressStore.progress > 99) {
              progressStore.timer && window.clearInterval(progressStore.timer);
            }
          }, 100);
        } else {
          progressStore.progress = complete;
        }
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

function validateStatus(status: number): boolean {
  const loginStore = UseLoginStore();
  switch (status) {
    case 200:
      break;
    case 400:
      break;
    case 401:
      console.log('错');
      loginStore.verify = false;
    case 403:
      break;
    case 404:
      break;
    case 500:
      break;
  }
  return status >= 200 && status < 300;
}
export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
