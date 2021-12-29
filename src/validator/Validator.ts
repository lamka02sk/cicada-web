export default class Validator {

    protected readonly definition : any = null;
    protected message: string = '';

    public messages: any = {};

    constructor(definition: any) {
        this.definition = definition;
    }

    public async validate() : Promise<boolean> {

        if(typeof this.definition.validator !== 'object') {
            return true;
        }

        let isValid = true;

        for(const property in this.definition.validator) {
            isValid = await this.validateProperty(property, isValid);
            Reflect.set(this.definition.validator[property], '_listener', this.definition.validator[property]._listener + 1);
        }

        return isValid;

    }

    public async validateProperty(property: string, isValid = true) {

        for(const validator in this.definition.validator[property]) {

            if(validator === '_listener') {
                continue;
            }

            // @ts-ignore
            const vClass = await import('./' + validator.replace(/(^|\s)\S/g, c => c.toUpperCase()));
            const v: any = new (vClass.default)(this.definition.validator[property][validator]);

            if(!v.isValid(this.definition[property])) {
                this.messages[property] = v.getMessage();
                isValid = false;
                break;
            }

        }

        return isValid;

    }

    protected getMessage() {
        return this.message;
    }

}