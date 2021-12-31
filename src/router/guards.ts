import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import store from './../vuex/main'
import Connection from "../models/config/Connection";

export function registerGuards(router: Router) {

    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

        // Check configuration availability
        const configuration: Connection = await store.dispatch('config/getConnectionConfig');

        // Force configuration route
        if(!(await configuration.test()) && (!to.name || to.name !== 'configure_connection')) {
            return next({
                name: 'configure_connection'
            });
        }

        return next();

    });

}