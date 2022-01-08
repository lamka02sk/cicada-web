import Model from "./../Model";
import axios from "axios";

export default class Config extends Model {

    protected _configured: boolean = true;

    protected readonly _resource_url: string = '';
    protected readonly _ls_key: string = '';

    constructor() {
        super();
        this.load().then(() => {});
    }

    public async load() {

        if(!this._resource_url || !this._configured) {
            return;
        }

        if(this._ls_key) {

            let configuration = localStorage.getItem(this._ls_key);

            try {

                configuration = configuration ? JSON.parse(configuration) : null;

                if(configuration) {

                    Object.keys(configuration).forEach(prop => {
                        if(prop.charAt(0) === '_') return;
                        this[prop] = configuration?.[prop]
                    });

                    this._configured = true;
                    this._loaded = true;

                    return;

                }

            } catch(_) {}

        }

        try {

            let response = null;

            try {
                response = await axios.get(this._resource_url);
            } catch(e) {}

            if(response && response.data) {

                Object.entries(response.data).forEach((key: any, value: any) => {
                    // @ts-ignore
                    this[key] = value;
                });

                this._configured = true;
                this._loaded = true;

                return;

            }

        } catch(_) {}

        this._configured = false;

    }

    save() : boolean {

        if(!this._ls_key) {
            return false;
        }

        const serialize = {};
        Object.keys(this).forEach(prop => {
            if(prop.charAt(0) === '_') return;
            serialize[prop] = this[prop]
        });

        localStorage.setItem(this._ls_key, JSON.stringify(serialize));
        return true;

    }

}