import {defineStore} from "pinia";
import ServerStatus from "../models/system/ServerStatus";
import Notification from "../models/system/Notification";
import Alert from "../models/system/Alert";

export const useGeneralStore = defineStore('general', {

    state: () => ({
        server_status: new ServerStatus(),
        notifications: <Array<Notification>>[],
        alerts: <Array<Alert>>[]
    }),

    actions: {

        async isServerReady() {

            if(!this.server_status.isLoaded()) {
                this.server_status = await ServerStatus.getStatus() ?? new ServerStatus();
            }

            return this.server_status.ready;

        },

        resetServerStatus() {
            this.server_status = new ServerStatus();
        },

        popNotification(id: string) {
            const index = this.notifications.findIndex(notification => notification.uuid === id);
            this.notifications.splice(index, 1);
        },

        pushNotification(notification: Notification) {
            notification.registerEvent('dismiss', (id: string) => this.popNotification(id));
            this.notifications.push(notification);
        },

        popAlert() {
            this.alerts.pop();
        },

        pushAlert(alert: Alert) {
            alert.registerEvent('destroy', () => this.popAlert());
            this.alerts.push(alert);
        }

    }

})