import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { initPlatform } from '@/utils/common-tools';

initPlatform();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
