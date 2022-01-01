import Validator from "./Validator";

export default class Equals extends Validator {

    public isValid(value: any, formData: any) : boolean {

        if(!this.definition) {
            return true;
        }

        if(!formData[this.definition] || value !== formData[this.definition]) {
            this.message = `Fields does not match`;
            return false;
        }

        return true;

    }

}