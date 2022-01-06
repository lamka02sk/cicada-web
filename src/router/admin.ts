import {RouteRecordRaw} from "vue-router";

import Dashboard from './../views/dashboard/Main.vue';
import Content from "../views/content/Main.vue";
import SubMenu from "../views/content/SubMenu.vue";

import MyAccountGeneral from './../views/account/General.vue';
import MyAccountLogins from './../views/account/Logins.vue';
import MyAccountSecurity from './../views/account/Security.vue';

export default [
    <RouteRecordRaw> {
        name: '',
        path: '/',
        component: Content,
        meta: {
            auth: true
        },
        children: [
            <RouteRecordRaw> {
                name: 'my_account',
                path: 'my-account',
                component: SubMenu,
                meta: {
                    title: 'My Account'
                },
                children: [
                    <RouteRecordRaw> {
                        name: 'general',
                        path: '',
                        component: MyAccountGeneral,
                        meta: {
                            title: 'General'
                        }
                    },
                    <RouteRecordRaw> {
                        name: 'logins',
                        path: 'logins',
                        component: MyAccountLogins,
                        meta: {
                            title: 'Logins'
                        }
                    },
                    <RouteRecordRaw> {
                        name: 'security',
                        path: 'security',
                        component: MyAccountSecurity,
                        meta: {
                            title: 'Security'
                        }
                    }
                ]
            },
            <RouteRecordRaw> {
                name: 'dashboard',
                path: '/dashboard',
                component: Dashboard,
                meta: {
                    title: 'Dashboard'
                }
            }
        ]
    }
]