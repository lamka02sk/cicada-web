function getYear(date: Date) : string {
    return date.getFullYear().toString();
}

function getMonth(date: Date) : string {
    return (date.getMonth() + 1).toString().padStart(2, '0');
}

function getDate(date: Date) : string {
    return date.getDate().toString().padStart(2, '0');
}

function getHours(date: Date) : string {
    return date.getHours().toString().padStart(2, '0');
}

function getMinutes(date: Date) : string {
    return date.getMinutes().toString().padStart(2, '0');
}

function formatDateTime(datetime: string) {
    const date = new Date(datetime);
    return `${getYear(date)}-${getMonth(date)}-${getDate(date)} ${getHours(date)}:${getMinutes(date)}`;
}

export { formatDateTime };