import Config from "./Config";
import axios from "axios";
import rules from "../../validator/Rules";
import Validator from "../../validator/Validator";
import Alert from "../system/Alert";

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

    public getUrl() {

        if(!this.domain) {
            return;
        }

        return `${this.protocol}://${this.domain}:${this.port}${this.path || ''}`.replace(/(\/)$/, '');

    }

    public async test() : Promise<boolean> {

        const valid = await this.validate();

        if(!valid) {
            return false;
        }

        this._buttonStatus.display('loading',  'Checking');

        try {
            await this.ping();
        } catch(e) {
            this._buttonStatus.display('error',  `${e}`);
            return false;
        }

        this._buttonStatus.display('success',  'Success!');
        return true;

    }

    private ping() {
        return axios.get(this.getUrl() + '/ping')
    }

}