import Config from "./Config";
import axios from "axios";
import rules from "../../validator/Rules";

export default class Connection extends Config {

    protected readonly resource_url: string = '/config/connection.json';
    public readonly validator = rules({
        domain: {
            type: 'string',
            required: true,
            min: 3
        },
        port: {
            type: 'number',
            required: true,
            min: 1,
            max: 65535
        }
    });

    public protocol: string = 'http';
    public domain: string = '';
    public port: number = 80;
    public path: string = '/';

    getUrl() {
        return `${this.protocol}://${this.domain}:${this.port}${this.path || ''}`.replace(/(\/)$/, '');
    }

    async test() {
        const response = await axios.get(this.getUrl() + '/ping');
        return !!response?.data?.success;
    }

}