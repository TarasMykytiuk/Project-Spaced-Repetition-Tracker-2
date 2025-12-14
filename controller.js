export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }
    init() {
        this.view.addOptions(this.model.getUserIds());
        this.view.bindSomething(() => this.handleSomething());
    }

    handleSomething() {
        this.view.displaySomething(this.model);
    }
}