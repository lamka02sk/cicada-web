import {RouteRecordRaw} from "vue-router";

import Dashboard from './../views/dashboard/Main.vue';

export default [
    <RouteRecordRaw> {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: {
            auth: true,
            title: 'Dashboard'
        }
    }
]