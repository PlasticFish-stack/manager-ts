import { api } from 'boot/axios';

export function userList() {
  return api.get('/trojan/user');
}

export function addUser(data) {
  return api.post('/trojan/user', data);
}

export function updateUser(data) {
  return api.post('/trojan/user/update', data);
}

export function delUser(id) {
  return api.delete(`/trojan/user?id=${id}`);
}

export function setExpire(data) {
  return api.post('/trojan/user/expire', data);
}

export function cancelExpire(id) {
  return api.delete(`/trojan/user/expire?id=${id}`);
}
