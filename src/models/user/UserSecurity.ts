import axios from "axios";
import Model from "../Model";
import Alert from "../system/Alert";

export default class UserSecurity extends Model {

    public login_duration: number = 7;
    public two_factor: boolean = false;

    public _validator = {
        login_duration: {
            required: true,
            type: 'number',
            min: 1,
            max: 365
        }
    }

    public static async getSecurity() : Promise<UserSecurity | null> {

        let response = null;

        try {
            response = await axios.get(`/user/security`);
        } catch(e) {}

        if(!response?.data?.data?.user_security) {
            return null;
        }

        const security = new UserSecurity();
        security.fromJSON(response?.data?.data?.user_security || {});

        return security;

    }

    public async update() {

        const valid = await this.validate();

        if(!valid) {
            console.log('invalid');
            Alert.formValidation();
            return;
        }

        this._buttonStatus.display('loading', 'Saving security settings');

        try {
            await axios.put(`/user/security`, this.asObject());
        } catch(e: any) {
            this._buttonStatus.display('error', `Error while saving security settings: ${e}`);
            return;
        }

        this._buttonStatus.display('success', `Saved`);

    }

}