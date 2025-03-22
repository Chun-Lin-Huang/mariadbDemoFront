import { createApp } from 'vue';
import App from './views/App.tsx';
import ElementPlus from 'element-plus';
import router from './router/router.ts';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.mount('#app');