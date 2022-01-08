import ButtonStatus from "./system/ButtonStatus";

export default class Model {

    protected _loaded: boolean = false;
    protected _events: any = {};
    public _buttonStatus: ButtonStatus = new ButtonStatus();
    public _serialize: Array<string> = [];

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

        for(const key in this) {
            if(key.charAt(0) === '_' || !json.hasOwnProperty(key)) continue;
            this[key] = json[key];
        }

    }

    public asObject() : any {

        const data = {};
        const keyPool = this._serialize.length ? this._serialize : Object.keys(this);

        for(const key of keyPool) {
            if(key.charAt(0) !== '_') {
                // @ts-ignore
                data[key] = this[key];
            }
        }

        return data;

    }

}