export class Model {
    constructor() { }

    getUserIds() {
        return ["1", "2", "3", "4", "5"];
    }

    getData(userId) {
        return JSON.parse(localStorage.getItem(`stored-data-user-${userId}`));
    }

    addData(userId, data) {
        const key = `stored-data-user-${userId}`;

        const existingData = getData(userId) || [];
        const newData = existingData.concat(data);

        localStorage.setItem(key, JSON.stringify(newData));
    }

    clearData(userId) {
        localStorage.removeItem(`stored-data-user-${userId}`);
    }
}