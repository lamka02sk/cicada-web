import Model from "../Model";
import axios from "axios";

export default class AuthLogin extends Model {

    public uuid: string = '';
    public user_agent: string = '';
    public ip_address: string = '';
    public active: boolean = false;
    public created_at: string = '';
    public updated_at: string = '';

    public _serialize = ['uuid'];

    public static async getAll() : Promise<Array<AuthLogin>|null> {

        try {
            const response = await axios.get(`/user/logins`);
            return Model.multipleFromJSON(() => new AuthLogin(), response.data?.data?.logins ?? []);
        } catch(e) {
            return null;
        }

    }

    public async disable() {
        try {
            await axios.put(`/user/login/disable`, this.asObject());
        } catch(e) {}
    }

}