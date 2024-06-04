/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';

// 登录接口
export function login(data: object) {
  return api.post('/auth/login', data);
}
//注册接口
export function register(data: any) {
  return api.post('/auth/register', data);
}
//检查有没有初始化接口
export function check() {
  return api.get('/auth/check');
}
// 重置密码接口
export function resetPass(data: any) {
  return api.post('/auth/reset_pass', data);
}
// 获取请求用户名
export function loginUser() {
  return api.get('/auth/loginUser');
}
