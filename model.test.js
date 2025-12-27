import { Model } from "./model.js";
import { DateService } from "./dateService.js";

const model = new Model();
const dateService = new DateService();
const mockCurrentDate = new Date("2025-12-21T00:00:00.000Z");

// Source - https://stackoverflow.com/a
// Posted by Chiedo, modified by community.
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

test("model saves and retrieves data from local storage", () => {
    const mockData = [{ "startDate": "2025-12-25", "topic": "test topic" }];
    model.addData("6", mockData);
    const retrievedData = model.getData("6");
    expect(retrievedData).toEqual(mockData);
    model.clearData("6");
});

test("correct agenda list generated from local storage data of user", () => {
    const mockData1 = [{ "startDate": "2025-12-25T00:00:00.000Z", "topic": "test topic" }];
    const mockData2 = [{ "startDate": "2026-01-30T00:00:00.000Z", "topic": "test topic 2" }];
    model.addData("6", mockData1);
    model.addData("6", mockData2);

    const expectedAgendaTopicsOrder = ["test topic", "test topic", "test topic 2", "test topic 2", "test topic", "test topic 2", "test topic", "test topic 2", "test topic", "test topic 2"];
    const expectedAgendaDates = ["2026-01-01", "2026-01-25", "2026-02-06", "2026-03-02", "2026-03-25", "2026-04-29", "2026-06-24", "2026-07-29", "2026-12-25", "2027-01-30"];
    const retrievedData = model.generateAgendaList("6", (startDate) => dateService.getRevisionDates(startDate), mockCurrentDate);
    const retrievedTopicsOrder = retrievedData.map((item) => {
        const topic = item.topic;
        return topic;
    });
    const retrievedDatesOrder = retrievedData.map((item) => {
        let date = item.date.toISOString();
        return date.substring(0, date.indexOf("T"));
    });
    expect(retrievedTopicsOrder).toEqual(expectedAgendaTopicsOrder);
    expect(retrievedDatesOrder).toEqual(expectedAgendaDates);
    model.clearData("6");
});

test("correct agenda list dates and list items if start date in past", () => {
    const mockData = [{ "startDate": new Date("2025-10-26T00:00:00.000Z"), "topic": "test topic" }];
    model.addData("6", mockData);
    const expectedAgendaListDates = ["2026-01-26", "2026-04-26", "2026-10-26"]
    const retrievedData = model.generateAgendaList("6", (startDate) => dateService.getRevisionDates(startDate), mockCurrentDate);
    expect(retrievedData.length).toEqual(3);
    const retrievedDates = retrievedData.map((item) => {
        let date = item.date.toISOString();
        return date.substring(0, date.indexOf("T"));
    });
    expect(retrievedDates).toEqual(expectedAgendaListDates);
    model.clearData("6");
});
