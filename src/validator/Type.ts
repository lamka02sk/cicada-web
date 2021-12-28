import Validator from "./Validator";

export default class Type extends Validator {

    public isValid(value: any) : boolean {

        if(this.definition === null || this.definition === 'any' || typeof value === this.definition) {
            return true;
        }

        this.message = `Value must be of type ${this.definition}`;
        return false;

    }

}