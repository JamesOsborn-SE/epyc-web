// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Paint from './components/Paint'
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.config.productionTip = false

Vue.component('Paint', Paint)

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  pinia
})