import {RouteRecordRaw} from "vue-router";

import Config from "../views/setup/Config.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

export default [
    <RouteRecordRaw> {
        name: 'configure_connection',
        path: '/configure',
        component: Config
    },
    <RouteRecordRaw> {
        name: 'auth_login',
        path: '/',
        component: Login
    },
    <RouteRecordRaw> {
        name: 'auth_register',
        path: '/register',
        component: Register
    }
]