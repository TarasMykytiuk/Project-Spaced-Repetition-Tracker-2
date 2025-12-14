export class View {
    constructor() {

    }

    bindSomething(handler) {
        handler();
    }

    displaySomething(something) {
        alert(something);
    }
}