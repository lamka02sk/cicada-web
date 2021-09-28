import Config from "./Config";

export default class Connection extends Config {

    protected readonly resource_url: string = '/config/connection.json';

    public protocol: string = 'http';
    public domain: string = '';
    public port: number = 80;
    public path: string = '/';

}