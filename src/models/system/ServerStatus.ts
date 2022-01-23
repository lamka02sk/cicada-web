import Model from "../Model";
import axios from "axios";

export default class ServerStatus extends Model {

    public ready: boolean = false;

    public static async getStatus() : Promise<ServerStatus|null> {

        let response = null;

        try {
            response = await axios.get(`/status`);
        } catch(e) {}

        if(!response?.data?.data) {
            return null;
        }

        const status = new ServerStatus();
        status.fromJSON(response?.data?.data || {});

        return status;

    }

}