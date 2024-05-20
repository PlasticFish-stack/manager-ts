import gsap from 'gsap';
import { quasarDesign } from 'src/utils/color';
function level(data: number): string {
  let res: string = '';
  switch (true) {
    case data > 80:
      res = 'text-red-6';
      break;
    case data > 60:
      res = 'text-deep-orange-6';
      break;
    case data > 25:
      res = 'text-orange-6';
      break;
    case data > 0:
      res = 'text-teal-6';
      break;
  }
  return res;
}
function byte(data: number) {
  return +(data / 1024 / 1024).toFixed(2);
}
function randomColor(): string {
  return gsap.utils.random(quasarDesign);
}
export { level, byte, randomColor };
