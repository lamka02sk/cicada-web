import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
import {useAuthStore} from "../store/auth";
import {useConfigStore} from "../store/config";

export function registerGuards(router: Router) {

    router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {

        // Check configuration availability
        const configuration = useConfigStore().connection;

        if(!configuration.isLoaded()) {

            await configuration.load();
            const validConfiguration = await configuration.test();

            if(validConfiguration) {

                // Redirect to login from configuration
                if (to.name === 'configure_connection') {
                    return next({name: 'auth_login'});
                }

                // Force configuration route
            } else if(to.name !== 'configure_connection') {
                return next({name: 'configure_connection'});
            }

        } else {

            // Redirect to login from configuration
            if(to.name === 'configure_connection') {
                return next({name: 'auth_login'});
            }

        }

        const auth = useAuthStore();

        // Logout
        if(to.name === 'auth_logout') {
            await auth.logout();
            return next({ name: 'auth_login' });
        }

        // Authenticate
        if(to.meta?.auth && !(await auth.isSignedIn())) {
            return next({ name: 'auth_login' });
        } else if(!to.meta?.auth && await auth.isSignedIn() && !from.meta?.auth) {
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