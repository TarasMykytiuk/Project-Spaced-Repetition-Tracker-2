import { Model } from "./model.js";
import { DateService } from "./dateService.js";

const model = new Model();
const dateService = new DateService();
const dateFormatTime = "T00:00:00.000Z";

// Source - https://stackoverflow.com/a
// Posted by Chiedo, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-25, License - CC BY-SA 4.0
// Modified by Taras Mykytiuk 
global.window = {};
global.window.localStorage = (function () {
    let store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();
// Modified by Taras Mykytiuk

Object.defineProperty(window, 'localStorage', { value: localStorage });

test("model saves data in local storage, and generates agenda from it", () => {
    const mockData = [{ "startDate": "2025-12-25", "topic": "test topic" }];
    model.addData("6", mockData);
    const retrievedData = model.getData("6");
    expect(retrievedData).toEqual(mockData);
    model.clearData("6");
});

test("model saves and retrieves data in from local storage", () => {
    const mockData1 = [{ "startDate": "2025-12-25" + dateFormatTime, "topic": "test topic" }];
    const mockData2 = [{ "startDate": "2026-01-30" + dateFormatTime, "topic": "test topic 2" }];

    model.addData("6", mockData1);
    model.addData("6", mockData2);

    const expectedAgendaList = [
        { "topic": "test topic", "date": new Date("2026-01-01" + dateFormatTime) },
        { "topic": "test topic", "date": new Date("2026-01-25" + dateFormatTime) },
        { "topic": "test topic 2", "date": new Date("2026-02-06" + dateFormatTime) },
        { "topic": "test topic 2", "date": new Date("2026-03-02" + dateFormatTime) },
        { "topic": "test topic", "date": new Date("2026-03-25" + dateFormatTime) },
        { "topic": "test topic 2", "date": new Date("2026-04-29" + dateFormatTime) },
        { "topic": "test topic", "date": new Date("2026-06-24" + dateFormatTime) },
        { "topic": "test topic 2", "date": new Date("2026-07-29" + dateFormatTime) },
        { "topic": "test topic", "date": new Date("2026-12-25" + dateFormatTime) },
        { "topic": "test topic 2", "date": new Date("2027-01-30" + dateFormatTime) }
    ]
    const retrievedData = model.generateAgendaList("6", (startDate) => dateService.getRevisionDates(startDate));
    expect(retrievedData).toEqual(expectedAgendaList);
});
