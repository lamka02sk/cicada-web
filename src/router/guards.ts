import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import store from './../vuex/main'

export function registerGuards(router: Router) {

    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

        // Check configuration availability
        const configuration = await store.dispatch('config/getConnectionConfig');

        // Force configuration route
        if(!configuration.configured && !to.name || to.name !== 'configure_connection') {
            return next({
                name: 'configure_connection'
            });
        }

        return next();

    });

}