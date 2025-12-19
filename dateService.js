export class DateService {
    constructor() { }

    getFormattedDate(date) {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + (month) + "-" + (day);
    }

    getCurrentDate() {
        const date = new Date();
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + (month) + "-" + (day);

    }

    getRevisionDates(startDate) {
        const date = new Date(startDate);
        const oneWeek = new Date();
        const oneMonth = new Date();
        const threeMonth = new Date();
        const sixMonth = new Date();
        const oneYear = new Date();
        const revisionDates = [
            new Date(oneWeek.setDate(date.getDate() + 7)),       // one week
            new Date(oneMonth.setMonth(date.getMonth() + 1)),      // one month
            new Date(threeMonth.setMonth(date.getMonth() + 3)),      // three month
            new Date(sixMonth.setMonth(date.getMonth() + 6)),      // six month
            new Date(oneYear.setFullYear(date.getFullYear() + 1)),   // one year
        ]
        return revisionDates;
    }
}