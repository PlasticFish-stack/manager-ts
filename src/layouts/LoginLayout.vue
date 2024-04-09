<script setup>
import { reactive, ref, computed } from 'vue'
import { UseDarkStore } from 'stores/dark-store'
import { UseProgressState } from 'stores/progress-store'
import { UseLoginState } from 'stores/login-store';
import { storeToRefs } from 'pinia';
import { login } from 'src/api/permission'
import CryptoJS from 'crypto-js'
import { useRouter } from 'vue-router';
defineOptions({
  preFetch() {
  }
});
const router = useRouter()
const darkStore = UseDarkStore();
const { dark } = storeToRefs(darkStore);
const progressStore = UseProgressState()
const loginStore = UseLoginState()
const loginInfomation = reactive({
  username: '',
  password: '',
});
const loadingState = ref(false)
const errorTip = ref(false)
const passwordDisplay = ref(true);
const progressFixed = computed(() => {
  return progressStore.progress / 100
})
async function handleLogin() {
  const { username, password } = loginInfomation
  if (username !== '' && password != '') {
    loadingState.value = true
    progressStore.status = true
    const loginInfo = Object.assign({}, loginInfomation)
    loginInfo.password = CryptoJS.SHA224(loginInfo.password).toString()
    try {
      const data = await login(loginInfo)
      progressStore.status = false
      loginStore.login()
      console.log(data, 'axios数据返回成功: login');
      setTimeout(() => {
        console.log(router);
        router.push({ name: 'index' })
      }, 500)
    } catch (error) {
      loadingState.value = false
      errorTip.value = true
      setTimeout(() => {
        errorTip.value = false
      }, 2500)
    }
  }
}//登录接口
</script>

<template>
  <div class="fullscreen acrylic-bg">
    <div class="login-box fixed-center">
      <q-img style="width: 45%;" :src="'src/assets/anime/login-light.jpg'" loading="eager" v-show="dark" />
      <q-img style="width: 45%;" :src="'src/assets/anime/login-dark.jpg'" loading="eager" v-show="!dark" />
      <div class="relative-position form">
        <q-form class="absolute-center q-pb-xl" style="width: 65%;" @submit="handleLogin">
          <!-- <div>
            <div class="q-pb-lg full-width text-center text-h4 text-weight-medium  text-capitalize"
              style="letter-spacing: 4px;">
              <q-skeleton square v-if="!titleStore.webTitle" animation="fade" />
              {{ titleStore.webTitle }}
            </div>
          </div> -->
          <q-input v-model="loginInfomation.username" class="q-pb-lg full-width" label="username" lazy-rules
            :rules="[val => !!val || '用户名不能为空']">
            <template v-slot:prepend>
              <q-icon :name="passwordDisplay ? 'sentiment_very_dissatisfied' : 'sentiment_very_satisfied'"
                @click="passwordDisplay = !passwordDisplay" />
            </template>
            <template v-slot:append>
              <q-icon v-if="loginInfomation.username != ''" name="close" @click="loginInfomation.username = ''"
                class="cursor-pointer" />
            </template>
          </q-input>
          <q-input v-model="loginInfomation.password" bottom-slots class="q-pb-md q-mb-lg full-width" label="password"
            :type="passwordDisplay ? 'password' : 'text'" :rules="[val => !!val || '密码不能为空']" lazy-rules>
            <template v-slot:prepend>
              <q-icon name="vpn_key" />
            </template>
            <template v-slot:append>
              <q-icon v-if="loginInfomation.password != ''" name="close" @click="loginInfomation.password = ''"
                class="cursor-pointer" />
            </template>
          </q-input>
          <TransitionGroup name="login" tag="div" style="position: relative;">
            <div class="row absolute items-center full-height full-width" v-if="!errorTip">
              <q-btn :loading="loadingState" outline color="red-13" class="col-12" unelevated size="md" type="submit"
                style="overflow: hidden;">
                登录
                <template v-slot:loading>
                  <q-linear-progress stripe animation-speed="300" rounded style="height: 90%; margin: 0 2px -1px 2px;"
                    :value="progressFixed" color="red" />
                </template>
              </q-btn>
            </div>
            <q-banner class="absolute full-height" style="background-color: transparent; margin-top: -10px;"
              v-if="errorTip">
              <template v-slot:avatar>
                <q-icon name="sentiment_very_dissatisfied" color="primary" />
              </template>
              您的账户或者密码有误,请重新登录
            </q-banner>
          </TransitionGroup>
        </q-form>

      </div>
    </div>

  </div>
</template>

<style lang='scss' scoped>
.login-box {
  display: flex;
  overflow: hidden;
  min-width: 1050px;
  border-radius: 8px;
  box-shadow: 9px 9px 9px rgba(0, 0, 0, 0.4);
  width: 45%
}

.form {
  background-image: url(assets/pattern/skulls.png);
  flex: 1;
}

.login-enter-active,
.login-leave-active {
  transition: all 0.5s ease;
}

.login-enter-from,
.login-leave-to {
  transform: translateX(300px);
  opacity: 0;

}
</style>
