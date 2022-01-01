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
        setSession(state: VuexAuth, session: Session) {
            state.session = session;
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
                return null;
            }

            const session = Session.restore();
            const loginForm = context.getters.getLoginForm;

            if(session) {
                context.commit('setSession', session);
                return true;
            } else if(loginForm.isEmpty()) {
                Session.logout();
            }

            const response = await loginForm.login();

            if(response?.data?.success && response.data?.data?.token) {

                const session = new Session(response.data.data.token);

                if(await session.checkSession()) {
                    context.commit('setSession', session);
                } else {
                    return false;
                }

            }

            return response;

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
            return state.session !== null && state.session.isActive();
        }
    }
}