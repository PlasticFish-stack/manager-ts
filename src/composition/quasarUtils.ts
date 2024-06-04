import { useQuasar } from 'quasar';
function isPlatformType(type: string): type is PlatformType {
  return ['desktop', 'mobile', 'electron', 'bex', 'capacitor', 'cordova', 'nativeMobile', 'webkit', 'chrome', 'firefox', 'safari', 'edgeChromium', 'edge', 'opera', 'vivaldi', 'win', 'linux', 'mac', 'cros', 'android', 'ios', 'winphone', 'iphone', 'ipad', 'ipod', 'kindle', 'silk'].includes(type);
}
export const useQuasarUtils = () => {
  const $q = useQuasar();
  function platform(type?: string) {
    const platform = $q.platform;
    if (type && isPlatformType(type)) {
      let bool: boolean | undefined = false;
      switch (true) {
        case type === 'touch':
          bool = platform.has.touch;
          break;
        case type === 'webStorage':
          bool = platform.has.webStorage;
          break;
        case type === 'iframe':
          bool = platform.within.iframe;
          break;
        default:
          bool = platform.is[type];
          break;
      }
      return bool;
    }
    return platform;
  }
  return { platform };
};
