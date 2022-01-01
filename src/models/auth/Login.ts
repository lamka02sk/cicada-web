import Auth from "./Auth";
import axios from "axios";

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

    public login() {
        return axios.post(`/auth/login`, this.asObject());
    }

    public isEmpty() {
        return !this.email || !this.password;
    }

}