import Auth from "./Auth";

export default class Register extends Auth {

    public email: string = '';
    public firstname: string = '';
    public lastname: string = '';
    public password: string = '';
    public password_repeat: string = '';

    public _validator = {
        email: {
            required: true,
            email: true,
            type: 'string',
            max: 120
        },
        firstname: {
            required: true,
            type: 'string',
            max: 60
        },
        lastname: {
            required: true,
            type: 'string',
            max: 60
        },
        password: {
            required: true,
            password: {
                special: false
            },
            type: 'string',
            min: 8,
            max: 120
        },
        password_repeat: {
            required: true,
            equals: 'password',
            type: 'string',
            max: 120
        }
    };

}