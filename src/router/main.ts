import {createRouter, createWebHistory, RouterOptions} from 'vue-router'
import globalRoutes from './global'
import {registerGuards} from "./guards";

const router = createRouter(<RouterOptions> {
    history: createWebHistory(),
    routes: [
        ...globalRoutes
    ]
});

registerGuards(router);

export default router;