import Validator from "./../Validator";

export default class Min extends Validator {

    public isValid(value: any) : boolean {

        if(typeof value === 'number' && value >= this.definition) {
            return true;
        } else if(typeof value === 'string' && value.length >= this.definition) {
            return true;
        }

        if(typeof value === 'number') {
            this.message = `Number cannot be lower than ${this.definition}`;
        } else if(typeof value === 'string') {
            this.message = `Field must be at least ${this.definition} characters long`;
        }

        return false;

    }

}