import './sass/main.scss'
import './axios'

import { createApp } from 'vue'
import Store from './vuex/main'
import Router from './router/main'
import App from './App.vue'

const app = createApp(App)

app.use(Router);
app.use(Store);
app.mount('#app')
