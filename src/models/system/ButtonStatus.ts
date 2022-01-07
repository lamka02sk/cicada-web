export default class ButtonStatus {

    public type: string = 'none';
    public show: boolean = false;
    public label: string = '';

    public setType(type = 'none') {
        this.type = type;
    }

    public setShow(show = true) {
        this.show = show;
    }

    public setLabel(label = '') {
        this.label = label;
    }

    public hide() : Promise<boolean> {

        this.setShow(false);

        return new Promise((resolve) => {

            this.setType();
            this.setLabel();

            resolve(true);

        });

    }

    public display(type: string, label: string) {
        this.setType(type);
        this.setLabel(label);
        this.setShow();
    }

}