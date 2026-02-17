export class Model {
    #currentUsrId
    constructor() {
        this.#currentUsrId = ""
    }

    setCurrentUsrId(usrId) {
        this.#currentUsrId = usrId;
    }

    getCurrentUsrId() {
        return this.#currentUsrId;
    }

    getUserIds() {
        return ["1", "2", "3", "4", "5"];
    }

    getData(userId) {
        return JSON.parse(localStorage.getItem(`stored-data-user-${userId}`));
    }

    addData(userId, data) {
        const key = `stored-data-user-${userId}`;
        const existingData = this.getData(userId) || [];
        const newData = existingData.concat(data);
        localStorage.setItem(key, JSON.stringify(newData));
    }

    clearData(userId) {
        localStorage.removeItem(`stored-data-user-${userId}`);
    }

    generateAgendaList(usrId, getRevisionDates, currentDate) {
        const agenda = this.getData(usrId) || [];
        return agenda.flatMap((item) => {
            const revisionDates = getRevisionDates(item.startDate);
            return revisionDates.map(date => {
                if (this.compareDates(date, currentDate)) {
                    return { topic: item.topic, date: date };
                }
            }).filter((item) => item);
        }).sort((a, b) => { return a.date - b.date; });
    }

    compareDates(dateOne, dateTwo) {
        let dateOneIso = dateOne.toISOString();
        dateOneIso = dateOneIso.substring(0, dateOneIso.indexOf("T"));
        let dateTwoIso = dateTwo.toISOString();
        dateTwoIso = dateTwoIso.substring(0, dateTwoIso.indexOf("T"));
        return dateOneIso >= dateTwoIso;
    }
}