import AuthLogin from "../models/auth/AuthLogin";
import User from "../models/user/User";
import UserSecurity from "../models/user/UserSecurity";

interface VuexUser {
    user: User|null,
    logins: Array<AuthLogin>|null,
    security: UserSecurity|null
}

export default {
    namespaced: true,
    state: () => (<VuexUser> {
        user: null,
        logins: null,
        security: null
    }),
    mutations: {
        setUser(state: VuexUser, user: User|null) {
            state.user = user;
        },
        setLogins(state: VuexUser, logins: Array<AuthLogin>|null) {
            state.logins = logins;
        },
        setSecurity(state: VuexUser, security: UserSecurity|null) {
            state.security = security;
        }
    },
    actions: {
        async loadUser(context: any, force = false) {

            let user: User|null = context.getters.getUser;

            if(!user || force) {
                user = await User.getAuthenticated();
            }

            context.commit('setUser', user);

        },
        async loadLogins(context: any, force = false) {

            let logins: Array<AuthLogin>|null = context.getters.getLogins;

            if(!logins || force) {
                logins = await AuthLogin.getAll();
            }

            context.commit('setLogins', logins);

        },
        async loadSecurity(context: any, force = false) {

            let security: UserSecurity|null = context.getters.getSecurity;

            if(!security || force) {
                security = await UserSecurity.getSecurity();
            }

            context.commit('setSecurity', security);

        }
    },
    getters: {
        getUser(state: VuexUser) : User|null {
            return state.user;
        },
        getLogins(state: VuexUser) : Array<AuthLogin>|null {
            return state.logins;
        },
        getSecurity(state: VuexUser) : UserSecurity|null {
            return state.security;
        }
    }
}