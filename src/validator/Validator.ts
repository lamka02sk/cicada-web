export default class Validator {

    protected readonly definition : any = null;
    protected message: string = '';

    public messages: any = {};

    constructor(definition: any) {
        this.definition = definition;
    }

    public async validate() : Promise<boolean> {

        if(typeof this.definition._validator !== 'object') {
            return true;
        }

        let isValid = true;

        for(const property in this.definition._validator) {
            isValid = await this.validateProperty(property, isValid);
            Reflect.set(this.definition._validator[property], '_listener', this.definition._validator[property]._listener + 1);
        }

        return isValid;

    }

    public async validateProperty(property: string, isValid = true) {

        for(const validator in this.definition._validator[property]) {

            if(validator === '_listener') {
                continue;
            }

            // @ts-ignore
            const vClass = await import('./functions/' + validator.replace(/(^|\s)\S/g, c => c.toUpperCase()) + '.ts');
            const v: any = new (vClass.default)(this.definition._validator[property][validator]);

            if(!v.isValid(this.definition[property], this.definition)) {
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