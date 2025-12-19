export class Controller {
    constructor(view, model, dateService) {
        this.view = view;
        this.model = model;
        this.dateService = dateService;
    }

    init() {
        this.view.addOptions(this.model.getUserIds());
        this.view.bindUsrSelection((usrId) => this.handleUsrSelection(usrId));
        this.view.bindAgendaSubmit((agendaItem) => this.handleAgendaSubmit(agendaItem));
    }

    handleUsrSelection(usrId) {
        //this.model.clearData(usrId);
        const getCurrentDate = this.dateService.getCurrentDate();
        this.view.datePickerSetDate(getCurrentDate);
        this.view.displayAgendaForm();
        this.model.setCurrentUsrId(usrId);

        const agendaList = this.model.generateAgendaList(usrId, (startDate) => this.dateService.getRevisionDates(startDate));
        this.view.displayAgendaList(agendaList, (date) => this.dateService.getFormattedDate(date));

    }

    handleAgendaSubmit(agendaItem) {
        const usrId = this.model.getCurrentUsrId();
        this.model.addData(usrId, agendaItem);
        const getCurrentDate = this.dateService.getCurrentDate();
        this.view.clearAgendaForm(getCurrentDate);

        const agendaList = this.model.generateAgendaList(usrId, (startDate) => this.dateService.getRevisionDates(startDate));
        this.view.displayAgendaList(agendaList, (date) => this.dateService.getFormattedDate(date));
    }
}