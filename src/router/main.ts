import {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import {registerGuards} from "./guards";

import globalRoutes from './global'
import adminRoutes from "./admin";
import Main from "../views/Main.vue";

const router = createRouter(<RouterOptions> {
    history: createWebHistory(),
    routes: [
        <any> {
            name: '',
            path: '',
            component: Main,
            meta: {
                title: 'Cicada'
            },
            children: [
                ...globalRoutes,
                ...adminRoutes,
            ]
        }
    ]
});

registerGuards(router);

export default router;