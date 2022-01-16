import AuthLogin from "../models/auth/AuthLogin";
import User from "../models/user/User";
import UserSecurity from "../models/user/UserSecurity";
import PasswordChange from "../models/user/PasswordChange";
import UserNotifications from "../models/user/UserNotifications";

interface VuexUser {
    user: User|null,
    logins: Array<AuthLogin>|null,
    security: UserSecurity|null,
    passwordChange: PasswordChange,
    notifications: UserNotifications|null
}

export default {
    namespaced: true,
    state: () => (<VuexUser> {
        user: null,
        logins: null,
        security: null,
        passwordChange: new PasswordChange(),
        notifications: null
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
        },
        setPasswordChange(state: VuexUser, passwordChange: PasswordChange) {
            state.passwordChange = passwordChange;
        },
        setNotifications(state: VuexUser, notifications: UserNotifications|null) {
            state.notifications = notifications;
        }
    },
    actions: {
        async loadUser(context: any, force: boolean = false) {

            let user: User|null = context.getters.getUser;

            if(!user || force) {
                user = await User.getAuthenticated();
            }

            context.commit('setUser', user);

        },
        async loadLogins(context: any, force: boolean = false) {

            let logins: Array<AuthLogin>|null = context.getters.getLogins;

            if(!logins || force) {
                logins = await AuthLogin.getAll();
            }

            context.commit('setLogins', logins);

        },
        async loadSecurity(context: any, force: boolean = false) {

            let security: UserSecurity|null = context.getters.getSecurity;

            if(!security || force) {
                security = await UserSecurity.getSecurity();
            }

            context.commit('setSecurity', security);

        },
        async loadNotifications(context: any, force: boolean = false) {

            let notifications: UserNotifications|null = context.getters.getNotifications;

            if(!notifications || force) {
                notifications = await UserNotifications.getNotifications();
            }

            context.commit('setNotifications', notifications);

        }
    },
    getters: {
        getUser(state: VuexUser) : User|null {
            return state.user;
        },
        getPasswordChange(state: VuexUser) : PasswordChange {
            return state.passwordChange;
        },
        getLogins(state: VuexUser) : Array<AuthLogin>|null {
            return state.logins;
        },
        getSecurity(state: VuexUser) : UserSecurity|null {
            return state.security;
        },
        getNotifications(state: VuexUser) : UserNotifications|null {
            return state.notifications;
        }
    }
}