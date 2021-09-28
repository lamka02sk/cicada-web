import Model from "./../Model";

export default class Config extends Model {

    public constructor() {
        super();
        this.load().then(() => {});
    }

}