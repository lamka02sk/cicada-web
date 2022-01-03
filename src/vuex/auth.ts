import Account from "../models/auth/Account";
import Login from "../models/auth/Login";
import Session from "../models/auth/Session";

interface VuexAuth {
    register: Account,
    login: Login,
    session: Session|null
}

export default {
    namespaced: true,
    state: () => (<VuexAuth> {
        register: new Account,
        login: new Login,
        session: null
    }),
    mutations: {
        setSession(state: VuexAuth, session: Session|null) {
            state.session = session;
        },
        setSessionActive(state: VuexAuth, active: boolean) {
            if(state.session) {
                state.session.active = active;
            }
        }
    },
    actions: {
        async createAccount(context: any) {

            const response = await context.getters.getRegisterForm.create();

            if(response?.data?.success) {
                context.commit('system/setStatusReady', null, { root: true })
            }

            return response;

        },
        async signIn(context: any) {

            if(context.getters.hasSession) {
                return true;
            }

            const session = Session.restore();
            const loginForm = context.getters.getLoginForm;

            if(session) {

                context.commit('setSession', session);

                if(await session.checkSession(context.commit)) {
                    return true;
                } else {
                    context.commit('setSession', null);
                    Session.forceLogout();
                    return false;
                }

            } else if(loginForm.isEmpty()) {
                context.commit('setSession', null);
                Session.forceLogout();
                return false;
            }

            const response = await loginForm.login();

            if(response?.data?.success && response.data?.data?.token) {

                const session = new Session(response.data.data.token);
                context.commit('setSession', session);

                if(!(await session.checkSession(context.commit))) {
                    context.commit('setSession', null);
                    return false;
                }

            }

            return response;

        },
        async logout(context: any) {

            const session = context.getters.getSession;

            if(!session) {
                return true;
            }

            context.commit('setSession', null);
            return await session.logout();

        }
    },
    getters: {
        getRegisterForm(state: VuexAuth) : Account {
            return state.register;
        },
        getLoginForm(state: VuexAuth) : Login {
            return state.login;
        },
        hasSession(state: VuexAuth) : boolean {
            return state.session !== null && state.session.active;
        },
        getSession(state: VuexAuth) : Session|null {
            return state.session;
        }
    }
}