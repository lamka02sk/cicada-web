import Validator from "./../Validator";

export default class Max extends Validator {

    public isValid(value: any) : boolean {

        if(typeof value === 'number' && value <= this.definition) {
            return true;
        } else if(typeof value === 'string' && value.length <= this.definition) {
            return true;
        }

        if(typeof value === 'number') {
            this.message = `Number cannot be higher than ${this.definition}`;
        } else if(typeof value === 'string') {
            this.message = `Field must be less than ${this.definition} characters long`;
        }

        return false;

    }

}