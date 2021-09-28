import axios from 'axios'
import Connection from "../models/config/Connection"

interface VuexConfig {
    system: Connection
}

export default {
    namespaced: true,
    state: () => (<VuexConfig> {
        system: new Connection
    }),
    mutations: {

    },
    actions: {
        async getConnectionConfig(context: any) : Promise<Connection> {
            await context.getters.connectionConfig.load();
            return context.getters.connectionConfig;
        }
    },
    getters: {
        connectionConfig(state: VuexConfig) {
            return state.system;
        }
    }
}