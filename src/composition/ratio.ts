import { computed, ref } from 'vue';
import { dom, debounce } from 'quasar';

const { height, width } = dom;

const heightValue = ref(height(document.body));
const widthValue = ref(width(document.body));
window.addEventListener(
  'resize',
  debounce(() => {
    heightValue.value = height(document.body);
    widthValue.value = width(document.body);
    console.log(heightRatio.value, widthRatio.value);
  }),
);
const heightRatio = computed(() => {
  return +(heightValue.value / 1080).toFixed(2);
});
const widthRatio = computed(() => {
  return +(widthValue.value / 1920).toFixed(2);
});
export { heightValue, widthValue, heightRatio, widthRatio };
