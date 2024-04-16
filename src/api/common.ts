import { api } from 'boot/axios';

export function version() {
  return api.get('/common/version');
}

export function serverInfo() {
  return api.get('/common/serverInfo');
}

// export function setLoginInfo(data) {
//   return api.post('/common/loginInfo', data);
// }

// export function setClashRules(data) {
//   return api.post('/common/clashRules', data);
// }

export function getClashRules() {
  return api.get('/common/clashRules');
}

export function resetClashRules() {
  return api.delete('/common/clashRules');
}
