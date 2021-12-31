import {RouteRecordRaw} from "vue-router";

import Config from "../views/setup/Config.vue";
import Login from "../views/auth/Login.vue";

export default [
    <RouteRecordRaw> {
        name: 'configure_connection',
        path: '/configure',
        component: Config
    },
    <RouteRecordRaw> {
        name: 'auth_login',
        path: '/login',
        component: Login
    }
]