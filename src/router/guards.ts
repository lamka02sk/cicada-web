import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import store from './../vuex/main'
import Connection from "../models/config/Connection";

const BASE_TITLE = 'Cicada';
document.title = BASE_TITLE;

export function registerGuards(router: Router) {

    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

        // Check configuration availability
        const configuration: Connection = await store.dispatch('config/getConnectionConfig');
        const validConfiguration = await configuration.test();

        if(validConfiguration) {

            // Redirect to login from configuration
            if(to.name === 'configure_connection') {
                return next({name: 'auth_login'});
            }

        // Force configuration route
        } else if(to.name !== 'configure_connection') {
            return next({ name: 'configure_connection' });
        }

        // Set route title
        document.title = `${to.meta.title ?? ''}${to.meta.title ? ' | ' : ''}${BASE_TITLE}`;

        return next();

    });

}