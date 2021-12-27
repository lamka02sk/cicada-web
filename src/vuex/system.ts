import Notification from "../models/system/Notification";

interface VuexSystem {
    notifications: Array<Notification>
}

export default {
    namespaced: true,
    state: () => (<VuexSystem> {
        notifications: []
    }),
    mutations: {
        pushNotification(state: VuexSystem, notification: Notification) {
            state.notifications.push(notification);
        },
        popNotification(state: VuexSystem, notificationID: string) {
            const index = state.notifications.findIndex((notification: Notification) => notification.uuid === notificationID);
            state.notifications.splice(index, 1);
        }
    },
    actions: {
        pushNotification(context: any, notification: Notification) {
            context.commit('pushNotification', notification);
            notification.registerEvent('dismiss', (id: string) => context.commit('popNotification', id));
        }
    },
    getters: {

    }
}