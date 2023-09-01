import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();
app.use(pinia)
app.use(router)

router.isReady().then(() => {
  app.mount("#app");
});

watch(
  pinia.state,
  (state) => {
    //HACK: not sure why this is being set to undefined on refresh.. 
    if (state.auth){
      localStorage.setItem("auth", JSON.stringify(state.auth));
    }
    if(state.game){
      localStorage.setItem("game", JSON.stringify(state.game));
    }
  },
  { deep: true }
);