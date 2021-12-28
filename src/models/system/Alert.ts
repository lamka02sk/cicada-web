import Model from "../Model";

const defaultConfirmText = 'OK';

export default class Alert extends Model {

    public title: string = '';
    public dismissible: boolean = true;
    public confirmText: string = '';
    public actionConfirm: Function|null = null;
    public actionClose: Function|null = null;

    public constructor(title: string, dismissible: boolean = true, confirmText: string = defaultConfirmText, actionConfirm: Function|null = null, actionClose: Function|null = null) {

        super();

        this.title = title;
        this.dismissible = dismissible;
        this.confirmText = confirmText;
        this.actionConfirm = actionConfirm;
        this.actionClose = actionClose;

    }

}