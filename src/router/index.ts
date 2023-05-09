import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    // {
    //     path: '/',
    //     component: () => import('../App.vue')
    // }, 
    {
        path: '/login',
        component: () => import('../components/Login.vue')
    }, {
        path: '/home',
        component: () => import('../components/Home.vue')
    }, {
        path: '/register',
        component: () => import('../components/Register.vue')
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router