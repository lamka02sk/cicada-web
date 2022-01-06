import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import store from './../vuex/main'
import Connection from "../models/config/Connection";

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

        // Logout
        if(to.name === 'auth_logout') {
            await store.dispatch('auth/logout');
            return next({ name: 'auth_login' });
        }

        // Authenticate
        if(to.meta?.auth && !(await store.dispatch('auth/signIn'))) {
            return next({ name: 'auth_login' });
        } else if(!to.meta?.auth && await store.dispatch('auth/signIn') && !from.meta?.auth) {
            return next({ name: 'dashboard' });
        }

        // Set route title
        const title: Array<string> = [];
        to.matched.forEach(r => {
            if(r.meta.title) {
                title.push(<string>r.meta.title);
            }
        });

        document.title = title.reverse().join(' | ');

        return next();

    });

}