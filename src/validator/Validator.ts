export default class Validator {

    protected readonly definition : any = null;
    protected message: string = '';

    public messages: any = {};

    constructor(definition: any = null) {
        this.definition = definition;
    }

    public async validate(object: any) : Promise<boolean> {

        if(typeof object.validator !== 'object') {
            return true;
        }

        let isValid = true;

        for(const property in object.validator) {
            for(const validator in object.validator[property]) {

                // @ts-ignore
                const vClass = await import('./' + validator.replace(/(^|\s)\S/g, c => c.toUpperCase()));
                const v: any = new (vClass.default)(object.validator[property][validator]);

                if(!v.isValid(object[property])) {
                    this.messages[property] = v.getMessage();
                    isValid = false;
                    break;
                }

            }
        }

        return isValid;

    }

    protected getMessage() {
        return this.message;
    }

}