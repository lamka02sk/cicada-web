import Auth from "./Auth";
import axios from "axios";
import {useAuthStore} from "../../store/auth";
import Alert from "../system/Alert";

export default class Login extends Auth {

    public email: string = '';
    public password: string = '';

    public _validator = {
        email: {
            required: true,
            email: true,
            type: 'string',
            max: 120
        },
        password: {
            required: true,
            type: 'string'
        }
    }

    public async authenticate() : Promise<boolean> {

        const valid = await this.validate();

        if(!valid) {
            return false;
        }

        let login = null;
        this._buttonStatus.display('loading',  'Signing in');

        try {
            login = await this.login();
        } catch(e) {
            this._buttonStatus.display('error',  `${e}`);
            return false;
        }

        this._buttonStatus.display('success',  'Success!');

        // Login
        if(!login.data?.data?.token) {
            this._buttonStatus.display('error',  `Invalid response`);
            return false;
        }

        const store = useAuthStore();
        return await store.signIn(login.data.data.token);

    }

    private login() {
        return axios.post(`/auth/login`, this.asObject());
    }

    public isEmpty() {
        return !this.email || !this.password;
    }

}