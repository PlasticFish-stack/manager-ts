import { reactive } from 'vue';
import { serverInfo } from 'src/api/common';
import { userList } from 'src/api/user';
interface SMsg {
  cpu?: null;
  disk?: null;
  load?: null;
  memory?: null;
  netCount?: null;
  speed?: null;
  swap?: null;
  [key: string]: null | undefined;
}
interface UMsg {
  domain?: null;
  port?: null;
  userList?: null;
  [key: string]: null | undefined;
}
interface resMsg {
  Duration: string;
  Data: SMsg | UMsg;
  Msg: string;
  [key: string]: string | object;
}
export function useInfo() {
  const serverMsg: SMsg = reactive({
    cpu: null,
    disk: null,
    load: null,
    memory: null,
    netCount: null,
    speed: null,
    swap: null,
  });
  const userMsg: UMsg = reactive({
    domain: null,
    port: null,
    userList: null,
  });
  async function InfoGet() {
    try {
      const infoResponse = (await serverInfo()) as unknown as resMsg;
      const userResponse = (await userList()) as unknown as resMsg;
      // console.log(infoResponse, userResponse);

      if (infoResponse.Data && userResponse.Data) {
        for (const key in infoResponse.Data) {
          serverMsg[key] = infoResponse.Data[key];
        }
        for (const key in userResponse.Data) {
          userMsg[key] = userResponse.Data[key];
        }
      }
    } catch {
      console.log('获取服务器资源失败');
    }
  }
  return { serverMsg, userMsg, InfoGet };
}
