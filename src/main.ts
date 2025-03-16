import { createApp } from 'vue'
import './style.css'
import App from './App.tsx'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
