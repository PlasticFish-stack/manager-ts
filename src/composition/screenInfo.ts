import { debounce, useQuasar } from 'quasar';
import { QVueGlobals } from 'quasar';
interface Screen {
  height: number;
  width: number;
  name: string;
  [key: string]: number | string;
}

export const useScreen = () => {
  const $q = useQuasar();
  console.log($q);

  const screen = reactive<Screen>({
    height: 0,
    width: 0,
    name: '',
  });

  function getScreenType(screens: QVueGlobals['screen']) {
    for (const item in screen) {
      const res = screens[item as keyof QVueGlobals['screen']];
      if (typeof res != 'number' && typeof res != 'string') {
        break;
      }
      screen[item] = res;
    }
  }

  getScreenType($q.screen);
  window.addEventListener(
    'resize',
    debounce(() => {
      getScreenType($q.screen);
    }),
  );
  return { screen };
};
