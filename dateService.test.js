import { DateService } from "./dateService.js";
const dateService = new DateService();

test("formatted date for agenda list", () => {
    expect(dateService.formateDateForAgendaList(new Date("2026-01-01"))).toEqual("1st january 2026");
    expect(dateService.formateDateForAgendaList(new Date("2026-02-02"))).toEqual("2nd february 2026");
    expect(dateService.formateDateForAgendaList(new Date("2026-04-03"))).toEqual("3rd april 2026");

    expect(dateService.formateDateForAgendaList(new Date("2026-05-04"))).toEqual("4th may 2026");

    expect(dateService.formateDateForAgendaList(new Date("2025-12-11"))).toEqual("11th december 2025");
    expect(dateService.formateDateForAgendaList(new Date("2025-12-21"))).toEqual("21st december 2025");
    expect(dateService.formateDateForAgendaList(new Date("2025-12-12"))).toEqual("12th december 2025");
    expect(dateService.formateDateForAgendaList(new Date("2025-12-22"))).toEqual("22nd december 2025");
    expect(dateService.formateDateForAgendaList(new Date("2025-12-13"))).toEqual("13th december 2025");
    expect(dateService.formateDateForAgendaList(new Date("2025-12-23"))).toEqual("23rd december 2025");

    expect(dateService.formateDateForAgendaList(new Date("2026-08-28"))).toEqual("28th august 2026");
    expect(dateService.formateDateForAgendaList(new Date("2025-12-31"))).toEqual("31st december 2025");
});

test('revision dates generation', () => {
    let revisionDates = dateService.getRevisionDates("2026-07-19");
    //cut hours, for test only dates important
    revisionDates = revisionDates.map((date) => {
        date = date.toISOString();
        return date.substring(0, date.indexOf("T"));
    });
    const expectedRevisionDates = [
        "2026-07-26",
        "2026-08-19",
        "2026-10-19",
        "2027-01-19",
        "2027-07-19"
    ]
    expect(revisionDates).toEqual(expectedRevisionDates);
});