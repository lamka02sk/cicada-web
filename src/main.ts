import './sass/main.scss'
import './axios'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import Router from './router/main'
import App from './App.vue'

const app = createApp(App)

app.use(Router);
app.use(createPinia())
app.mount('#app')
