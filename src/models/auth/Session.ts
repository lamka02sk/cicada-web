import Auth from "./Auth";
import axios from "axios";
import {useAuthStore} from "../../store/auth";

export default class Session extends Auth {

    private static _ls_key: string = 'session_token';
    public readonly token: string|null = null;

    public constructor(token: string|null = null) {
        super();
        this.token = token;
    }

    public async check() : Promise<boolean> {

        try {
            await axios.get(`/auth/check`);
            localStorage.setItem(Session._ls_key, this.token ?? '');
            return true;
        } catch(e) {}

        await this.logout();
        return false;

    }

    public async logout() : Promise<boolean> {
        try {
            await axios.get(`/auth/logout`);
            Session.forceLogout();
            return true;
        } catch(e) {
            return false;
        }
    }

    public static forceLogout() {
        localStorage.removeItem(Session._ls_key);
    }

    public static async restore() {

        const token = localStorage.getItem(Session._ls_key);

        if(!token) {
            return null;
        }

        const session = new Session(token);

        const auth = useAuthStore();
        auth.session = session;
        auth.authenticated = true;

        return await session.check() ? session : null;

    }

}