import Validator from "./Validator";

export default class Required extends Validator {

    public isValid(value: any) : boolean {

        if(this.definition === true && value !== null && value !== '' && value !== false) {
            return true;
        }

        this.message = `This field is required`;
        return false;

    }

}