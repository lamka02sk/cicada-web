import Auth from "./Auth";
import axios from "axios";

export default class Session extends Auth {

    private static _ls_key: string = 'session_token';

    private active: boolean = false;
    private readonly token: string|null = null;

    public constructor(token: string) {

        super();

        this.active = false;
        this.token = token;

    }

    public async checkSession() : Promise<boolean> {

        const response = await axios.get(`/auth/check`);

        if(!response?.data?.success || !this.token) {
            this.active = false;
            return false;
        }

        this.active = true;
        localStorage.setItem(Session._ls_key, this.token);

        return true;

    }

    public isActive() {
        return this.active;
    }

    public async logout() {
        Session.forceLogout();
        return axios.post(`/auth/logout`, this.asObject());
    }

    public static forceLogout() {
        localStorage.removeItem(Session._ls_key);
    }

    public static restore() {

        const token = localStorage.getItem(Session._ls_key);

        if(!token) {
            return null;
        }

        return new Session(token);

    }

}