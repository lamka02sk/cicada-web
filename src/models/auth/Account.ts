import Auth from "./Auth";
import axios from "axios";
import {useGeneralStore} from "../../store/general";
import Alert from "../system/Alert";

export default class Account extends Auth {

    public email: string = '';
    public firstname: string = '';
    public lastname: string = '';
    public password: string = '';
    public password_repeat: string = '';
    protected token: string = '';
    protected admin: boolean = false;
    protected enabled: boolean = false;

    public _validator = {
        email: {
            required: true,
            email: true,
            type: 'string',
            max: 120
        },
        firstname: {
            required: true,
            type: 'string',
            max: 60
        },
        lastname: {
            required: true,
            type: 'string',
            max: 60
        },
        password: {
            required: true,
            password: {
                special: false
            },
            type: 'string',
            min: 8,
            max: 120
        },
        password_repeat: {
            required: true,
            equals: 'password',
            type: 'string',
            max: 120
        }
    };

    public async create() : Promise<boolean> {

        const valid = await this.validate();

        if(!valid) {
            return false;
        }

        this._buttonStatus.display('loading',  'Creating account');

        try {
            await this.createAccount();
        } catch(e) {
            this._buttonStatus.display('error',  `${e}`);
            return false;
        }

        this._buttonStatus.display('success',  'Success!');

        useGeneralStore().resetServerStatus();
        return true;

    }

    private createAccount() {
        return axios.post(`/setup/create-admin-account`, this.asObject());
    }

}