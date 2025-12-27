export class Controller {
    constructor(view, model, dateService) {
        this.view = view;
        this.model = model;
        this.dateService = dateService;
    }

    init() {
        this.view.addOptions(this.model.getUserIds());
        this.view.bindUsrSelection((usrId) => this.handleUsrSelection(usrId));
        this.view.bindDeleteAgenda(() => this.handleDeleteAgenda());
        this.view.bindAgendaSubmit((agendaItem) => this.handleAgendaSubmit(agendaItem));
    }

    handleUsrSelection(usrId) {
        const currentDate = this.dateService.formatDateForDatePicker(new Date());
        this.view.datePickerSetDate(currentDate);
        this.view.displayDeleteAgenda();
        this.view.displayAgendaForm();
        this.model.setCurrentUsrId(usrId);
        this.displayUserAgenda(usrId);
    }

    handleDeleteAgenda() {
        const usrId = this.model.getCurrentUsrId();
        this.model.clearData(usrId);
        this.displayUserAgenda(usrId);
    }

    handleAgendaSubmit(agendaItem) {
        const usrId = this.model.getCurrentUsrId();
        this.model.addData(usrId, agendaItem);
        const currentDate = this.dateService.formatDateForDatePicker(new Date());
        this.view.clearAgendaForm(currentDate);
        this.displayUserAgenda(usrId);
    }

    displayUserAgenda(usrId) {
        const agendaList = this.model.generateAgendaList(usrId, (startDate) => this.dateService.getRevisionDates(startDate), new Date());
        this.view.displayAgendaList(agendaList, (date) => this.dateService.formateDateForAgendaList(date));
    }
}