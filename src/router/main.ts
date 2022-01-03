import {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import {registerGuards} from "./guards";

import globalRoutes from './global'
import adminRoutes from "./admin";

const router = createRouter(<RouterOptions> {
    history: createWebHistory(),
    routes: [
        ...globalRoutes,
        ...adminRoutes,
    ]
});

registerGuards(router);

export default router;