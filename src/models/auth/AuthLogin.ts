import Model from "../Model";
import axios from "axios";

export default class AuthLogin extends Model {

    public uuid: string = '';
    public user_agent: string = '';
    public ip_address: string = '';
    public active: boolean = false;
    public created_at: string = '';
    public updated_at: string = '';

    public static async getAll() : Promise<Array<AuthLogin>|null> {

        try {
            const response = await axios.get(`/user/logins`);
            return response.data?.data?.logins ?? [];
        } catch(e) {
            return null;
        }

    }

}