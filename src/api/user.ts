/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';

export function userList() {
  return api.get('/trojan/user');
}

export function addUser(data: any) {
  return api.post('/trojan/user', data);
}

export function updateUser(data: any) {
  return api.post('/trojan/user/update', data);
}

export function delUser(id: any) {
  return api.delete(`/trojan/user?id=${id}`);
}

export function setExpire(data: any) {
  return api.post('/trojan/user/expire', data);
}

export function cancelExpire(id: any) {
  return api.delete(`/trojan/user/expire?id=${id}`);
}
