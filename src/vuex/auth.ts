import Register from "../models/auth/Register";

interface VuexAuth {
    register: Register
}

export default {
    namespaced: true,
    state: () => (<VuexAuth> {
        register: new Register
    }),
    mutations: {

    },
    actions: {

    },
    getters: {
        getRegisterForm(state: VuexAuth) : Register {
            return state.register;
        }
    }
}