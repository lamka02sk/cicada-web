import {nanoid} from 'nanoid'
import axios from "axios";

export default class Model {

    protected _loaded: boolean = false;
    protected _events: any = {};

    public uuid: string|null = null;

    public async registerEvent(name: string, callback: any) {
        this._events[name] = callback;
    }

    public async dispatchEvent(name: string) {
        if(this._events[name]) {
            this._events[name](this.uuid);
        }
    }

    fromJSON(json: any) {

        for(const param of Object.getOwnPropertyNames(this)) {
            if(param.charAt(0) === '_' || !json.hasOwnProperty(param)) continue;
            this[param] = json[param];
        }

    }

    public asObject() : any {

        const data = {};

        for(const key in this) {
            if(key.charAt(0) !== '_') {
                // @ts-ignore
                data[key] = this[key];
            }
        }

        return data;

    }

}