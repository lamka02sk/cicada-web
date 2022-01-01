import Account from "../models/auth/Account";

interface VuexAuth {
    register: Account
}

export default {
    namespaced: true,
    state: () => (<VuexAuth> {
        register: new Account
    }),
    mutations: {

    },
    actions: {
        async createAccount(context: any) {

            const response = await context.getters.getRegisterForm.create();

            if(response?.data?.success) {
                context.commit('system/setStatusReady', null, { root: true })
            }

            return response;

        }
    },
    getters: {
        getRegisterForm(state: VuexAuth) : Account {
            return state.register;
        }
    }
}