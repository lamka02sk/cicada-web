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

}