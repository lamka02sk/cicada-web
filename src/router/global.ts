import {RouteRecordRaw} from "vue-router";

import Config from "../views/setup/Config.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

export default [
    <RouteRecordRaw> {
        name: 'configure_connection',
        path: '/server-connection',
        component: Config,
        meta: {
            title: 'Server connection'
        }
    },
    <RouteRecordRaw> {
        name: 'auth_login',
        path: '/',
        component: Login,
        alias: '/login',
        meta: {
            title: 'Login'
        }
    },
    <RouteRecordRaw> {
        name: 'auth_register',
        path: '/create-admin-account',
        component: Register,
        meta: {
            title: 'Create admin account'
        }
    }
]