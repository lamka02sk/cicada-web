import Validator from "./Validator";

export default class Email extends Validator {

    public isValid(value: any) : boolean {

        if(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value)) {
            return true;
        }

        this.message = `This doesn't seem to be a valid e-mail address`;
        return false;

    }

}