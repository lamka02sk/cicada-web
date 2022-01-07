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

}