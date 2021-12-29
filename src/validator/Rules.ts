export default function rules(rules: any) {
    return Object.entries(rules).reduce((acc: any, [prop, value] : any) => {
        acc[prop] = value;
        acc[prop]._listener = 0;
        return acc;
    }, {})
}