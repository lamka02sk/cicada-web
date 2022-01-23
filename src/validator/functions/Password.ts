import Validator from "./../Validator";

export default class Password extends Validator {

    private readonly uppercase: boolean = true;
    private readonly lowercase: boolean = true;
    private readonly number: boolean = true;
    private readonly special: boolean = true;

    public isValid(value: any) : boolean {

        const uppercase = this.definition.uppercase ?? this.uppercase;
        const lowercase = this.definition.lowercase ?? this.lowercase;
        const number = this.definition.number ?? this.number;
        const special = this.definition.special ?? this.special;

        if(uppercase && !/([A-Z])/.test(value)) {
            this.message = `Password must contain an uppercase character`;
            return false;
        }

        if(lowercase && !/([a-z])/.test(value)) {
            this.message = `Password must contain a lowercase character`;
            return false;
        }

        if(number && !/([0-9])/.test(value)) {
            this.message = `Password must contain a number`;
            return false;
        }

        if(special && !/([^0-9A-z])/.test(value)) {
            this.message = `Password must contain a special character`;
            return false;
        }

        return true;

    }

}