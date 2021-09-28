import {nanoid} from 'nanoid'
import axios from "axios";

export default class Model {

    protected loaded: boolean = false;
    protected configured: boolean = true;
    protected readonly resource_url: string = '';

    public uuid: string|null = null;
    protected events: any = {};

    public constructor() {
        this.uuid = nanoid(10);
    }

    public async load() {

        if(!this.resource_url || !this.configured) {
            return;
        }

        try {

            const response = await axios.get(this.resource_url);

            if(response && response.data) {

                Object.entries(response.data).forEach((key: any, value: any) => {
                    // @ts-ignore
                    this[key] = value;
                });

                this.configured = true;
                this.loaded = true;

                return;

            }

        } catch(_) {}

        this.configured = false;

    }

    public async registerEvent(name: string, callback: any) {
        this.events[name] = callback;
    }

    public async dispatchEvent(name: string) {
        if(this.events[name]) {
            this.events[name](this.uuid);
        }
    }

}