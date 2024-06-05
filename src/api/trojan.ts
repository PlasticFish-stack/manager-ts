/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from 'boot/axios';

export function start() {
  return api.post('/trojan/start');
}

export function stop() {
  return api.post('/trojan/stop');
}

export function restart() {
  return api.post('/trojan/restart');
}

export function update() {
  return api.post('/trojan/update');
}

export function getLoglevel() {
  return api.get('/trojan/loglevel');
}

export function setLoglevel(data: any) {
  return api.post('/trojan/loglevel', data);
}

export function setDomain(data: any) {
  return api.post('/trojan/domain', data);
}

export function trojanSwitch(data: any) {
  return api.post('/trojan/switch', data);
}