import Validator from "./Validator";

export default class Password extends Validator {

    private readonly uppercase: boolean = true;
    private readonly lowercase: boolean = true;
    private readonly number: boolean = true;
    private readonly special: boolean = true;

    public isValid(value: any) : boolean {



        this.message = `This doesn't seem to be a valid e-mail address`;
        return false;

    }

}