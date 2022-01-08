import Auth from "./Auth";
import axios from "axios";
import {Commit} from "vuex";

export default class Session extends Auth {

    private static _ls_key: string = 'session_token';

    active: boolean = false;
    private readonly token: string|null = null;

    public constructor(token: string) {

        super();

        this.active = false;
        this.token = token;

    }

    public async checkSession(commit: Commit) : Promise<boolean> {

        let response = null;

        try {
            response = await axios.get(`/auth/check`);
        } catch(e) {}

        if(!response?.data?.success || !this.token) {
            commit('setSessionActive', false);
            return false;
        }

        commit('setSessionActive', true);
        localStorage.setItem(Session._ls_key, this.token);

        return true;

    }

    public async logout() {
        try {
            const result = await axios.get(`/auth/logout`);
            Session.forceLogout();
            return result;
        } catch(e) {
            return null;
        }
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