import Model from "./../Model";
import axios from "axios";

export default class Config extends Model {

    protected readonly _resource_url: string = '';
    protected readonly _ls_key: string = '';

    constructor() {
        super();
    }

    public async load() {

        if(!this._resource_url && !this._loaded) {
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

                    this._loaded = true;
                    return;

                }

            } catch(_) {}

        }

        if(this._resource_url) {

            try {

                let response = null;

                try {
                    response = await axios.get(this._resource_url);
                } catch (e) {
                }

                if (response && response.data) {

                    Object.entries(response.data).forEach((key: any, value: any) => {
                        // @ts-ignore
                        this[key] = value;
                    });

                    this._loaded = true;
                    return;

                }

            } catch (_) {}

        }

        this._loaded = false;

    }

    public save() : boolean {

        if(!this._ls_key) {
            return false;
        }

        localStorage.setItem(this._ls_key, JSON.stringify(this.asObject()));
        return true;

    }

}