import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment';

createApp(App).use(store).use(router).use(moment).mount('#app');
