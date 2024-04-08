import { api } from 'boot/axios';

export function setQuota(data) {
  return api.post('/trojan/data', data);
}

export function cleanData(id) {
  return api.delete(`/trojan/data?id=${id}`);
}

export function getResetDay() {
  return api.get('/trojan/data/resetDay');
}

export function updateResetDay(data) {
  return api.post('/trojan/data/resetDay', data);
}
