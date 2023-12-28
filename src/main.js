import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import App from './App.vue';
import router from './router';
import { currency, date } from './methods/filters';
import $httpMessageState from './methods/pushMessageState';

// 每次更改 router，畫面都回到最上方
router.afterEach((to, from, failure) => {
    window.scrollTo(0,0);
});

const app = createApp(App);
app.config.globalProperties.$filters = {
    date,
    currency, // 數字千分號
};
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
app.config.globalProperties.$httpMessageState = $httpMessageState;

app.use(VueAxios, axios);
app.use(router);
app.component('Loading', Loading);
app.mount('#app');
