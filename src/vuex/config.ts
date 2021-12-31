import axios from 'axios'
import Connection from "../models/config/Connection"

interface VuexConfig {
    connection: Connection
}

export default {
    namespaced: true,
    state: () => (<VuexConfig> {
        connection: new Connection
    }),
    mutations: {
        setConnectionValidity(state: any, valid: boolean) {
            state.connection._valid = valid;
        }
    },
    actions: {
        async getConnectionConfig(context: any) : Promise<Connection> {
            await context.getters.connectionConfig.load();
            return context.getters.connectionConfig;
        },
        async saveConnectionConfig(context: any) {
            if(await context.getters.connectionConfig.test()) {
                context.getters.connectionConfig.save();
            }
        }
    },
    getters: {
        connectionConfig(state: VuexConfig) : Connection {
            return state.connection;
        }
    }
}