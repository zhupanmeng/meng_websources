import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/normalize.css'
import axios from 'axios'
import router from './router/index.ts'

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (!token && to.path == '/home') {
        next({
            path: '/login'
        })
    }
    next()
})
axios.defaults.baseURL = 'http://127.0.0.1'

const app = createApp(App)
app.use(ElementPlus).use(router).mount('#app')
