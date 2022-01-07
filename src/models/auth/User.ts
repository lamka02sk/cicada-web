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

    public static async get_authenticated() : Promise<User | null> {

        const response = await axios.get(`/user/auth`);

        if(!response?.data?.data?.user) {
            return null;
        }

        const user = new User();
        user.fromJSON(response.data.data.user);

        return user;

    }

    public async update() {

        this._buttonStatus.display('loading', 'Saving user data');

        if(!this.uuid) {
            this._buttonStatus.display('error', 'UUID is not defined for this user');
            return;
        }

        try {
            await axios.put(`/user/update`, this.asObject());
        } catch(e: any) {
            this._buttonStatus.display('error', `Error while saving user data: ${e}`);
            return;
        }

        this._buttonStatus.display('success', `Saved`);

    }

}