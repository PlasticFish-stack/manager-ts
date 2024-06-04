/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';

export function setQuota(data: any) {
  return api.post('/trojan/data', data);
}

export function cleanData(id: any) {
  return api.delete(`/trojan/data?id=${id}`);
}

export function getResetDay() {
  return api.get('/trojan/data/resetDay');
}

export function updateResetDay(data: any) {
  return api.post('/trojan/data/resetDay', data);
}
