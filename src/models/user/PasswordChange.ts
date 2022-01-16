import Model from "../Model";
import axios from "axios";

export default class PasswordChange extends Model {

    public old_password: string = '';
    public password: string = '';
    public password_repeat: string = '';

    public _validator = {
        old_password: {
            required: true,
            type: 'string'
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
    }

    public async change() {

        this._buttonStatus.display('loading', 'Changing password');

        try {
            await axios.put(`/user/password/change`, this.asObject());
        } catch(e: any) {
            this._buttonStatus.display('error', `Error: ${e}`);
            return;
        }

        this._buttonStatus.display('success', `Password changed`);

    }

}