export class DateService {
    constructor() { }

    getFormattedDate(date) {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + (month) + "-" + (day);
    }

    getRevisionDates(startDate) {
        const date = new Date(startDate);
        const revisionDates = [
            new Date(new Date().setDate(date.getDate() + 7)),           // + one week
            new Date(new Date().setMonth(date.getMonth() + 1)),         // + one month
            new Date(new Date().setMonth(date.getMonth() + 3)),         // + three month
            new Date(new Date().setMonth(date.getMonth() + 6)),         // + six month
            new Date(new Date().setFullYear(date.getFullYear() + 1))    // + one year
        ]
        return revisionDates;
    }
}