import { debounce, useQuasar } from 'quasar';
import { QVueGlobals } from 'quasar';
interface Screen {
  height: number;
  width: number;
  name: string;
  [key: string]: number | string;
}
interface Res {
  [key: string]: {
    [key: string]: object | string[];
  };
}
// interface Layout {
//   mobile: { [key: string]: object };
//   desktop: { [key: string]: object };
// }
export const useScreen = () => {
  const $q = useQuasar();
  const screen = reactive<Screen>({
    height: 0,
    width: 0,
    name: '',
  });
  const funcStack: ((() => object) | undefined)[] = [];
  let response = reactive({});
  function getScreenType(screens: QVueGlobals['screen']) {
    for (const item in screen) {
      const res = screens[item as keyof QVueGlobals['screen']];
      if (typeof res != 'number' && typeof res != 'string') {
        break;
      }
      screen[item] = res;
    }
  }
  function layoutFormat(func: () => object, bool?: boolean) {
    if (bool) {
      funcStack.push(func);
    } else {
      response = Object.assign(response, func());
    }

    console.log(response, funcStack, 'response');

    const layout = func();
    const layouts = computed(() => {
      const res: Res = {}; // 明确定义res的类型
      for (const item in layout) {
        if (screen.name === 'xs') {
          res[item] = layout[item].mobile;
        } else {
          res[item] = layout[item].desktop;
        }
      }
      return res;
    });
    return layouts;
  }
  getScreenType($q.screen);
  window.addEventListener(
    'resize',
    debounce(() => {
      getScreenType($q.screen);
    }),
  );
  return { screen, layoutFormat };
};
