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

    generateAgendaList(usrId, getRevisionDates) {
        const agendaList = [];
        const agenda = this.getData(usrId);
        if (!agenda) {
            return agendaList;
        }
        agenda.forEach(item => {
            const revisionDates = getRevisionDates(item.startDate);
            revisionDates.forEach(date => {
                agendaList.push(
                    {
                        topic: item.topic,
                        date: date
                    }
                )
            });
        });
        agendaList.sort((a, b) => {
            return a.date - b.date;
        })
        return agendaList;
    }
}