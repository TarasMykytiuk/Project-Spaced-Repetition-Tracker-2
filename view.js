export class View {
    #elements;
    constructor() {
        this.#elements = {
            usrSelect: document.getElementById("user_select")
        }
    }

    bindSomething(handler) {
        handler();
    }

    displaySomething(something) {
        alert(something);
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
}