import Model from "../Model";
import axios from "axios";

export default class User extends Model {

    public uuid: string = '';
    public firstname: string = '';
    public lastname: string = '';
    public email: string = '';
    public admin: boolean = false;
    public enabled: boolean = true;
    public created_at: string = '';
    public updated_at: string = '';

    public _validator = {
        firstname: {
            required: true,
            type: 'string',
            max: 60
        },
        lastname: {
            required: true,
            type: 'string',
            max: 60
        }
    };

    public _serialize = [
        'firstname', 'lastname', 'uuid'
    ];

    public static async getAuthenticated() : Promise<User | null> {

        let response = null;

        try {
            response = await axios.get(`/user/auth`);
        } catch(e) {}

        if(!response?.data?.data?.user) {
            return null;
        }

        const user = new User();
        user.fromJSON(response?.data?.data?.user || {});

        return user;

    }

    public async update() {

        this._buttonStatus.display('loading', 'Saving user data');

        if(!this.uuid) {
            this._buttonStatus.display('error', 'UUID is not defined for this user');
            return;
        }

        try {
            await axios.put(`/user/update/self`, this.asObject());
        } catch(e: any) {
            this._buttonStatus.display('error', `Error while saving user data: ${e}`);
            return;
        }

        this._buttonStatus.display('success', `Saved`);

    }

}