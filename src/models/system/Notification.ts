import Model from "../Model";

export default class Notification extends Model {

    public type: string = 'info';
    public title: string = '';
    public message: string = '';
    public timeout: number = 5;
    public dismissible: boolean = true;

    public constructor(type: string, title: string, message: string = '', timeout: number = 0, dismissible: boolean = true) {

        super();

        this.type = type;
        this.title = title;
        this.message = message;
        this.timeout = timeout < 0 ? this.timeout : timeout;
        this.dismissible = dismissible;

        if(this.timeout > 0) {
            this.dismiss();
        }

    }

    private dismiss() {
        setTimeout(() => this.dispatchEvent('dismiss'), this.timeout);
    }

}