export class View {
    #elements;
    constructor() {
        this.#elements = {
            usrSelect: document.getElementById("user_select"),
            agendaForm: document.getElementById("agenda_form"),
            datePicker: document.getElementById("date_picker"),
            agendaInput: document.getElementById("agenda_text"),
            agendaDisplay: document.getElementById("agenda_display")
        }
    }

    addOptions(values) {
        const select = this.#elements.usrSelect;
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.innerText = value;
            select.appendChild(option);
        });
    }

    bindUsrSelection(handler) {
        this.#elements.usrSelect.addEventListener("change", () => {
            this.#elements.usrSelect.options[0].disabled = true;
            this.#elements.usrSelect.options[0].hidden = true;
            const usrId = this.#elements.usrSelect.value;
            handler(usrId);
        });
    }

    displayAgendaForm() {
        this.#elements.agendaForm.style.display = "flex";
    }

    clearAgendaForm(date) {
        this.datePickerSetDate(date);
        this.#elements.agendaInput.value = "";

    }

    datePickerSetDate(date) {
        this.#elements.datePicker.value = date;
    }

    displayAgendaList(agendaList, getFormattedDate) {
        if (agendaList.length == 0) {
            this.#elements.agendaDisplay.textContent = "This user has no agenda to display.";
            return
        }
        this.#elements.agendaDisplay.innerHTML = "";
        agendaList.forEach(item => {
            const p = document.createElement("p");
            p.textContent = item.topic + ", " + getFormattedDate(item.date);
            this.#elements.agendaDisplay.appendChild(p);
        });
    }

    bindAgendaSubmit(handler) {
        this.#elements.agendaForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const agendaItem = {
                startDate: this.#elements.datePicker.value,
                topic: this.#elements.agendaInput.value
            }
            handler(agendaItem);
        })
    }
}