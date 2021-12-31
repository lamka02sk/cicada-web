import Notification from "../models/system/Notification";
import Alert from "../models/system/Alert";
import axios from "axios";

interface Status {
    ready: boolean
}

interface VuexSystem {
    notifications: Array<Notification>,
    alerts: Array<Alert>,
    status: Status|null
}

export default {
    namespaced: true,
    state: () => (<VuexSystem> {
        notifications: [],
        alerts: [],
        status: null
    }),
    mutations: {
        pushNotification(state: VuexSystem, notification: Notification) {
            state.notifications.push(notification);
        },
        popNotification(state: VuexSystem, notificationID: string) {
            const index = state.notifications.findIndex((notification: Notification) => notification.uuid === notificationID);
            state.notifications.splice(index, 1);
        },
        setStatus(state: VuexSystem, value: Status) {
            state.status = value;
        }
    },
    actions: {
        pushNotification(context: any, notification: Notification) {
            context.commit('pushNotification', notification);
            notification.registerEvent('dismiss', (id: string) => context.commit('popNotification', id));
        },
        async getStatus(context: any) {

            if(!context.getters.getStatus) {
                const response = await axios.get(`/status`);
                context.commit('setStatus', response.data.data ?? null);
            }

            return context.getters.getStatus;

        },
        async isReady(context: any) {
            const status: Status|null = await context.dispatch('getStatus');
            return status && status.ready;
        }
    },
    getters: {
        getStatus(state: VuexSystem) {
            return state.status;
        }
    }
}