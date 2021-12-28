import Model from "./../Model";

export default class Config extends Model {

    constructor() {
        super();
        this.load().then(() => {});
    }

}