import Config from "./Config";
import axios from "axios";
import rules from "../../validator/Rules";

export default class Connection extends Config {

    protected readonly _resource_url: string = '/config/connection.json';
    protected readonly _ls_key: string = 'config_connection';

    public readonly _validator = rules({
        domain: {
            type: 'string',
            required: true,
            min: 3
        },
        port: {
            type: 'number',
            min: 1,
            max: 65535
        }
    });

    public protocol: string = 'http';
    public domain: string = '';
    public port: number = 80;
    public path: string = '/';

    public _valid: boolean = false;

    getUrl() {

        if(!this.domain) {
            return false;
        }

        return `${this.protocol}://${this.domain}:${this.port}${this.path || ''}`.replace(/(\/)$/, '');

    }

    async test() : Promise<boolean> {

        if(this._valid) {
            return true;
        }

        const url = this.getUrl();

        if(!url) {
            return false;
        }

        try {
            const response = await axios.get(url + '/ping');
            return this._valid = !!response.data?.success;
        } catch(e) {
            return this._valid = false;
        }

    }

}