import Model from "../Model";
import axios from "axios";

export default class UserNotifications extends Model {

    public auth_login: boolean = true;
    public auth_password_change: boolean = true;
    public auth_attempt: boolean = true;
    public deploy_start: boolean = true;
    public deploy_finish: boolean = true;
    public deploy_fail: boolean = true;

    public static async getNotifications() {

        let response = null;

        try {
            response = await axios.get(`/user/notifications`);
        } catch(e) {}

        if(!response?.data?.data?.user_notifications) {
            return null;
        }

        const notifications = new UserNotifications();
        notifications.fromJSON(response?.data?.data?.user_notifications || {});

        return notifications;

    }

    public async update() {

        this._buttonStatus.display('loading', 'Saving notification settings');

        try {
            await axios.put(`/user/notifications`, this.asObject());
        } catch(e: any) {
            this._buttonStatus.display('error', `Error: ${e}`);
            return;
        }

        this._buttonStatus.display('success', `Saved`);

    }

}