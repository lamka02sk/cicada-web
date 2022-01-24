import Model from "../Model";
import {useGeneralStore} from "../../store/general";

const defaultConfirmText = 'OK';

export default class Alert extends Model {

    private _destroyDelay: number = 300;

    public show: boolean = false;
    public type: string = '';
    public title: string = '';
    public description: string = '';

    public showCloseButton: boolean = false;
    public closeOverlay: boolean = false;

    public cancelText: string|null = null;
    public confirmText: string = defaultConfirmText;

    public actionConfirm: Function|null = null;
    public actionClose: Function|null = null;
    public actionCancel: Function|null = null;

    public constructor(
        type: string,
        title: string = '',
        description: string = ''
    ) {

        super();

        this.type = type;
        this.title = title;
        this.description = description;

    }

    public render() {
        useGeneralStore().pushAlert(this);
    }

    public confirm(alert: Alert) {

        alert.show = false;

        if(alert.actionConfirm) {
            alert.actionConfirm(alert);
        }

        alert.dispatchEvent('confirm');
        setTimeout(() => alert.dispatchEvent('destroy'), alert._destroyDelay);

    }

    public close(alert: Alert) {

        alert.show = false;

        if(alert.actionClose) {
            alert.actionClose(alert);
        }

        alert.dispatchEvent('close');
        setTimeout(() => alert.dispatchEvent('destroy'), alert._destroyDelay);

    }

    public cancel(alert: Alert) {

        alert.show = false;

        if(alert.actionCancel) {
            alert.actionCancel(alert);
        }

        alert.dispatchEvent('cancel');
        setTimeout(() => alert.dispatchEvent('destroy'), alert._destroyDelay);

    }

    public static formValidation() {
        const alert = new Alert('danger', 'Invalid form data', 'Please check if all fields in the form are properly filled');
        alert.render();
    }

}