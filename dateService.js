export class DateService {
    #monthNames;
    constructor() {
        this.#monthNames = [
            "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"
        ];
    }

    getOrdinalNumber(num) {
        const lastDigit = num % 10;
        const uniqueAbbreviationsDigits = [1, 2, 3];
        const uniqueSuffixes = ['st', 'nd', 'rd'];
        const lastTwoDigits = num % 100;
        const exceptions = [11, 12, 13];
        if (exceptions.includes(lastTwoDigits) || !uniqueAbbreviationsDigits.includes(lastDigit)) {
            return num + 'th';
        } else {
            return num + uniqueSuffixes[lastDigit - 1];
        }
    }

    formatDateForDatePicker(date) {
        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        return date.getFullYear() + "-" + (month) + "-" + (day);
    }

    formateDateForAgendaList(date) {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const ordinal = this.getOrdinalNumber(Number(day));
        const result = ordinal + " " + this.#monthNames[month] + " " + year;
        return result;
    }

    getRevisionDates(startDate) {
        const date = new Date(startDate);
        const oneWeek = new Date(startDate);
        oneWeek.setDate(date.getDate() + 7);
        const oneMonth = new Date(startDate);
        oneMonth.setMonth(date.getMonth() + 1);
        const threeMonth = new Date(startDate);
        threeMonth.setMonth(date.getMonth() + 3);
        const halfYear = new Date(startDate);
        halfYear.setMonth(date.getMonth() + 6);
        const oneYear = new Date(startDate);
        oneYear.setFullYear(date.getFullYear() + 1);
        return [oneWeek, oneMonth, threeMonth, halfYear, oneYear];
    }
}