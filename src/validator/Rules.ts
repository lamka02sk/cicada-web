export default function rules(rules: any) {
    return Object.entries(rules).reduce((acc: any, [prop, value] : any) => {
        acc[prop] = value;
        acc[prop]._listener = new Proxy({ value: 0 }, {
            set(target: any, p: string) : boolean {
                target[p]++;
                return true;
            }
        });
        return acc;
    }, {})
}